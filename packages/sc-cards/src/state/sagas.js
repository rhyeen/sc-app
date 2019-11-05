import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';  // eslint-disable-line import/extensions
import { ActionTargetType } from '@shardedcards/sc-types/dist/turn/enums/action-type.js';
// import { PlaceMinionAction, PlayMinionAttackAction, PlayMinionAbilityAction, PlaySpellAbilityAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action.js';
import { PlaceMinionAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action/place-minion-action.js';
import { OpponentMinionActionTarget, PlayerMinionActionTarget, PlayerActionTarget } from '@shardedcards/sc-types/dist/turn/entities/action-target.js';
import { CardType } from '@shardedcards/sc-types/dist/card/enums/card-type.js';
import { AbilityRetriever } from '@shardedcards/sc-types/dist/card/services/ability-targets.js';
import { Log } from 'interface-handler/src/logger.js';
import { localStore } from './store.js';
import * as Selectors from './selectors.js';
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

function _getSummonMinionAction(playAreaIndex) {
  const state = localStore.getState();
  const selectedCard = Selectors.getSelectedCard(state);
  return new PlaceMinionAction(selectedCard.handIndex, playAreaIndex);
}

function* _summonMinion({playAreaIndex}) {
  const action = yield _getSummonMinionAction(playAreaIndex);
  yield put(GameActions.fulfillTurnAction(action));
  yield put(Actions.summonMinion.success());
}

function _getAttackMinionAction(playAreaIndex) {
  const state = localStore.getState();
  const selectedCard = Selectors.getSelectedCard(state);
  const target = new OpponentMinionActionTarget(playAreaIndex);
  return new PlayMinionAttackAction(selectedCard.playAreaIndex, [target]);
}

function* _attackMinion({playAreaIndex}) {
  const action = yield _getAttackMinionAction(playAreaIndex);
  yield put(GameActions.fulfillTurnAction(action));
  yield put(Actions.attackMinion.success());
}


function* _setPlayingField() {
  try {
    const { opponent, player } = yield call(CardsInterface.getPlayingField);
    yield put(Actions.setPlayingField.success(opponent.slots, opponent.backlog, player.slots));
  } catch (e) {
    yield Log.error(`@TODO: unable to getPlayingField(): ${e}`);
  }
}

function _prepareClearHand() {
  const state = localStore.getState();
  return Selectors.getHandCards(state);
}

function* _clearHand() {
  const addedToDiscardPile = yield _prepareClearHand();
  yield put(Actions.clearHand.success(addedToDiscardPile));
}

function _prepareRefreshPlayerCards() {
  const state = localStore.getState();
  const handCards = Selectors.getHandCards(state);
  const playerFieldSlots = Selectors.getPlayerFieldSlots(state);
  const refreshReadyCards = [...handCards, ...playerFieldSlots];
  return CardTurnActions.refreshCards(refreshReadyCards);
}

function* _refreshPlayerCards() {
  const updatedCards = yield _prepareRefreshPlayerCards();
  yield put(Actions.refreshPlayerCards.success(updatedCards));
}

function _getActionFromSelectedAbility(selectedAbility, actionTargets) {
  const state = localStore.getState();
  const selectedCard = Selectors.getSelectedCard(state);
  switch(selectedAbility.card.type) {
    case CardType.Minion:
      return new PlayMinionAbilityAction(selectedCard.playAreaIndex, actionTargets);
    case CardType.Spell:
      return new PlaySpellAbilityAction(selectedCard.handIndex, actionTargets);
    default:
      Log.error(`Unexpected card type: ${selectedAbility.card.type}`);
      return null;
  }
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

function _getUseCardAbilityAction(playAreaIndex) {
  const state = localStore.getState();
  const selectedAbility = Selectors.getSelectedAbility(state);
  const target = _getActionTargetFromSelectedAbility(selectedAbility, playAreaIndex);
  return _getActionFromSelectedAbility(selectedAbility, [target]);
}

function* _useCardAbility({playAreaIndex}) {
  const action = yield _getUseCardAbilityAction(playAreaIndex);
  yield put(GameActions.fulfillTurnAction(action));
  yield put(Actions.useCardAbility.success());
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

function isOpponentTargetedAbilitySelected() {
  const state = localStore.getState();
  const selectedAbility = Selectors.getSelectedAbility(state);
  return selectedAbility.targets === ActionTargetType.TargetOpponentMinion;
}

function* _cancelSelectMinionTargetedAbility() {
  if (isOpponentTargetedAbilitySelected()) {
    yield put(Actions.cancelSelectOpponentMinionTargetedAbility());
  } else {
    yield put(Actions.cancelSelectPlayerMinionTargetedAbility());
  }
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
