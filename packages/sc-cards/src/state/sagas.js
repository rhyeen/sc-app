import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';  // eslint-disable-line import/extensions
import { ActionTargetType } from '@shardedcards/sct-turn/dist/browser/enums/action-type.js';
import { PlaceMinionAction, PlayMinionAttackAction, PlayMinionAbilityAction, PlaySpellAbilityAction } from '@shardedcards/sct-turn/dist/browser/entities/turn-action.js';
import { OpponentMinionActionTarget, PlayerMinionActionTarget, PlayerActionTarget } from '@shardedcards/sct-turn/dist/browser/entities/action-target.js';
import { CardType } from '@shardedcards/sct-card/dist/browser/enums/sct-card-type.js';
import { AbilityRetriever } from '@shardedcards/sct-card/dist/browser/services/ability-retriever.js';
import { Log } from 'interface-handler/src/logger';
import { localStore } from './store.js';
import * as Selectors from './selectors.js';
import * as StatusActions from '../../../sc-status/src/state/actions.js';
import * as Actions from './actions.js';
import * as GameActions from '../../../sc-game/src/state/actions.js';
import * as CardsInterface from '../services/interface/cards.js';
import * as CardTurnActions from '../services/card-actions.js';

function* _setCards() {
  try {
    const cards = yield call(CardsInterface.getCards);
    yield put(Actions.setCards.success(cards));
  } catch (e) {
    yield Log.error(`@TODO: unable to getCards(): ${e}`);
  }
}

function* _setPlayerDecks() {
  try {
    const { hand, deck, discardPile, lostCards } = yield call(CardsInterface.getPlayerDecks);
    yield put(Actions.setPlayerDecks.success(hand.cards, hand.refillSize, discardPile.cards, lostCards.cards, deck.size));
  } catch (e) {
    yield Log.error(`@TODO: unable to getPlayerDecks(): ${e}`);
  }
}

function* _summonMinion({playAreaIndex}) {
  const { discardedCard, updatedCards, statusUpdates } = yield _prepareSummonMinion(playAreaIndex);
  const action = yield _getSummonMinionAction(playAreaIndex);
  yield put(GameActions.recordAction(action));
  yield put(Actions.summonMinion.success(playAreaIndex, updatedCards, discardedCard));
  yield _handleStatusUpdates(statusUpdates);
}

function _prepareSummonMinion(playAreaIndex) {
  const state = localStore.getState();
  const selectedCard = Selectors.getSelectedCard(state);
  const playerFieldCard = Selectors.getPlayerFieldSlots(state)[playAreaIndex];
  const discardedCard = {
    id: playerFieldCard.id,
    instance: playerFieldCard.instance,
  };
  const { updatedCards, statusUpdates } = CardTurnActions.summonMinion(selectedCard, playerFieldCard);
  return { discardedCard, updatedCards, statusUpdates };
}

function _getSummonMinionAction(playAreaIndex) {
  const state = localStore.getState();
  const selectedCard = Selectors.getSelectedCard(state);
  const action = new PlaceMinionAction(selectedCard.handIndex, playAreaIndex);
  return action.json();
}

function* _attackMinion({playAreaIndex}) {
  const { updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots } = _prepareAttackMinion(playAreaIndex);
  const action = yield _getAttackMinionAction(playAreaIndex);
  yield put(GameActions.recordAction(action));
  yield put(Actions.attackMinion.success(updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots));
}

function _prepareAttackMinion(playAreaIndex) {
  const state = localStore.getState();
  const selectedCard = Selectors.getSelectedCard(state);
  const playerFieldSlots = Selectors.getPlayerFieldSlots(state);
  const opponentFieldSlots = Selectors.getOpponentFieldSlots(state);
  const playerFieldCard = playerFieldSlots[selectedCard.playAreaIndex];
  const opponentFieldCard = opponentFieldSlots[playAreaIndex];
  const cards = Selectors.getCards(state);
  const addedToDiscardPile = [];
  const { updatedCards, attackerDiscarded, attackedDiscarded } = CardTurnActions.attackMinion(cards, playerFieldCard, opponentFieldCard);
  if (attackerDiscarded) {
    addedToDiscardPile.push({
      id: playerFieldSlots[selectedCard.playAreaIndex].id,
      instance: playerFieldSlots[selectedCard.playAreaIndex].instance
    });
    playerFieldSlots[selectedCard.playAreaIndex] = {
      id: null,
      instance: null
    };
  }
  if (attackedDiscarded) {
    opponentFieldSlots[playAreaIndex] = {
      id: null,
      instance: null
    };
  }
  return { updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots };
}

function _getAttackMinionAction(playAreaIndex) {
  const state = localStore.getState();
  const selectedCard = Selectors.getSelectedCard(state);
  const target = new OpponentMinionActionTarget(playAreaIndex);
  const action = new PlayMinionAttackAction(selectedCard.playAreaIndex, [target]);
  return action.json();
}

function* _setPlayingField() {
  try {
    const { opponent, player } = yield call(CardsInterface.getPlayingField);
    yield put(Actions.setPlayingField.success(opponent.slots, opponent.backlog, player.slots));
  } catch (e) {
    yield Log.error(`@TODO: unable to getPlayingField(): ${e}`);
  }
}

function* _clearHand() {
  const addedToDiscardPile = yield _prepareClearHand();
  yield put(Actions.clearHand.success(addedToDiscardPile));
}

function _prepareClearHand() {
  const state = localStore.getState();
  return Selectors.getHandCards(state);
}

function* _refreshPlayerCards() {
  const updatedCards = yield _prepareRefreshPlayerCards();
  yield put(Actions.refreshPlayerCards.success(updatedCards));
}

function _prepareRefreshPlayerCards() {
  const state = localStore.getState();
  const handCards = Selectors.getHandCards(state);
  const playerFieldSlots = Selectors.getPlayerFieldSlots(state);
  const refreshReadyCards = [...handCards, ...playerFieldSlots];
  return CardTurnActions.refreshCards(refreshReadyCards);
}

function* _useCardAbility({playAreaIndex}) {
  const { updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots, statusUpdates } = yield _prepareUseCardAbility(playAreaIndex);
  yield _handleStatusUpdates(statusUpdates);
  const action = yield _getUseCardAbilityAction(playAreaIndex);
  yield put(GameActions.recordAction(action));
  yield put(Actions.useCardAbility.success(updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots));
}

function _prepareUseCardAbility(playAreaIndex) {
  const state = localStore.getState();
  const selectedAbility = Selectors.getSelectedAbility(state);
  const playerFieldSlots = Selectors.getPlayerFieldSlots(state);
  const opponentFieldSlots = Selectors.getOpponentFieldSlots(state);
  const cards = Selectors.getCards(state);
  return CardTurnActions.useCardAbility(cards, playAreaIndex, selectedAbility, playerFieldSlots, opponentFieldSlots);
}

function _handleStatusUpdates(statusUpdates) {
  if (!statusUpdates) {
    return;
  }
  return put(StatusActions.updateStatus(statusUpdates));
}

function _getUseCardAbilityAction(playAreaIndex) {
  const state = localStore.getState();
  const selectedAbility = Selectors.getSelectedAbility(state);
  const target = _getActionTargetFromSelectedAbility(selectedAbility, playAreaIndex);
  const action = _getActionFromSelectedAbility(selectedAbility, [target]);
  return action.json();
}

function _getActionFromSelectedAbility(selectedAbility, actionTargets) {
  let action = null;
  switch(selectedAbility.card.type) {
    case CardType.Minion:
      action = new PlayMinionAbilityAction(selectedCard.playAreaIndex, actionTargets);
      break;
    case CardType.Spell:
      action = new PlaySpellAbilityAction(selectedCard.handIndex, actionTargets);
      break;
    default:
      Log.error(`Unexpected card type: ${selectedAbility.card.type}`);
      return null;
  }
  return action.json();
}

function _getActionTargetFromSelectedAbility(selectedAbility, playAreaIndex) {
  switch(selectedAbility.targets) {
    case ActionTargetType.TargetOpponentMinion:
      return new OpponentMinionActionTarget(playAreaIndex);
    case ActionTargetType.TargetPlayerMinion:
      return new PlayerMinionActionTarget(playAreaIndex);
    case ActionTargetType.TargetPlayer:
      return new PlayerActionTarget();
    default:
      Log.error(`Unexpected ability target: ${selectedAbility.targets}`);
      return null;
  }
}

function* _selectAbility({abilityId}) {
  const ability = AbilityRetriever.getDefaultedAbility(abilityId);
  if (ability.targetsOpponentMinion()) {
    yield put(Actions.selectOpponentMinionTargetedAbility(abilityId));
  } else if (ability.targetsPlayerMinion()) {
    yield put(Actions.selectPlayerMinionTargetedAbility(abilityId));
  } else if (ability.targetsPlayer()) {
    yield put(Actions.selectPlayerTargetedAbility(abilityId));
    yield put(Actions.useCardAbility.request());
  } else {
    Log.error(`unexpected ability targets for ability id: ${abilityId}`);
  }
}

function* _cancelSelectMinionTargetedAbility() {
  if (isOpponentTargetedAbilitySelected()) {
    yield put(Actions.cancelSelectOpponentMinionTargetedAbility());
  } else {
    yield put(Actions.cancelSelectPlayerMinionTargetedAbility());
  }
}

function isOpponentTargetedAbilitySelected() {
  const state = localStore.getState();
  const selectedAbility = Selectors.getSelectedAbility(state);
  return selectedAbility.targets === ActionTargetType.TargetOpponentMinion;
}

function* saga() {
  yield all([
    takeEvery(Actions.PlaceMinion.REQUEST, _summonMinion),
    takeEvery(Actions.AttackMinion.REQUEST, _attackMinion),
    takeLatest(Actions.SET_PLAYING_FIELD.REQUEST, _setPlayingField),
    takeLatest(Actions.CLEAR_HAND.REQUEST, _clearHand),
    takeEvery(Actions.REFRESH_PLAYER_CARDS.REQUEST, _refreshPlayerCards),
    takeEvery(Actions.USE_CARD_ABILITY.REQUEST, _useCardAbility),
    takeLatest(Actions.SET_PLAYER_DECKS.REQUEST, _setPlayerDecks),
    takeLatest(Actions.SET_CARDS.REQUEST, _setCards),
    takeEvery(Actions.SELECT_ABILITY, _selectAbility),
    takeEvery(Actions.CANCEL_SELECT_MINION_TARGETED_ABILITY, _cancelSelectMinionTargetedAbility),
  ]);
}

localStore.runSaga(saga);
