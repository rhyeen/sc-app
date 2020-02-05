import { put, takeEvery, all } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import { ActionTargetType } from '@shardedcards/sc-types/dist/turn/enums/action-type.js';
import { PlaceMinionAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action/player-turn-actions/place-minion-action.js';
import { PlayMinionAttackAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action/player-turn-actions/play-minion-attack-action.js';
import { PlayMinionAbilityAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action/player-turn-actions/play-minion-ability-action.js';
import { PlaySpellAbilityAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action/player-turn-actions/play-spell-ability-action.js';
import {
  OpponentMinionActionTarget,
  PlayerMinionActionTarget,
  PlayerActionTarget,
} from '@shardedcards/sc-types/dist/turn/entities/action-target.js';
import { CardType } from '@shardedcards/sc-types/dist/card/enums/card-type.js';
import { AbilityRetriever } from '@shardedcards/sc-types/dist/card/services/ability-retriever.js';
import { Log } from 'interface-handler/src/logger.js';
import { localStore } from './store.js';
import * as Selectors from './selectors.js';
import * as Actions from './actions.js';
import * as GameActions from '../../../sc-game/src/state/actions.js';

function _getSummonMinionAction(fieldSlotIndex) {
  const state = localStore.getState();
  const selectedCard = Selectors.getSelectedCard(state);
  return new PlaceMinionAction(selectedCard.handCardIndex, fieldSlotIndex);
}

function* _placeMinion({ fieldSlotIndex }) {
  const action = yield _getSummonMinionAction(fieldSlotIndex);
  yield put(GameActions.fulfillTurnAction.request(action));
  yield put(Actions.placeMinion.success());
}

function _getAttackMinionAction(fieldSlotIndex) {
  const state = localStore.getState();
  const selectedCard = Selectors.getSelectedCard(state);
  const target = new OpponentMinionActionTarget(fieldSlotIndex);
  return new PlayMinionAttackAction(selectedCard.fieldSlotIndex, [target]);
}

function* _attackMinion({ fieldSlotIndex }) {
  const action = yield _getAttackMinionAction(fieldSlotIndex);
  yield put(GameActions.fulfillTurnAction.request(action));
  yield put(Actions.attackMinion.success());
}

function _getActionFromSelectedAbility(selectedAbility, actionTargets) {
  const state = localStore.getState();
  const selectedCard = Selectors.getSelectedCard(state);
  switch (selectedAbility.card.type) {
    case CardType.Minion:
      return new PlayMinionAbilityAction(selectedCard.fieldSlotIndex, actionTargets);
    case CardType.Spell:
      return new PlaySpellAbilityAction(selectedCard.handCardIndex, actionTargets);
    default:
      Log.error(`Unexpected card type: ${selectedAbility.card.type}`);
      return null;
  }
}

function _getActionTargetFromSelectedAbility(selectedAbility, fieldSlotIndex) {
  switch (selectedAbility.targets) {
    case ActionTargetType.TargetOpponentMinion:
      return new OpponentMinionActionTarget(fieldSlotIndex);
    case ActionTargetType.TargetPlayerMinion:
      return new PlayerMinionActionTarget(fieldSlotIndex);
    case ActionTargetType.TargetPlayer:
      return new PlayerActionTarget();
    default:
      Log.error(`Unexpected ability target: ${selectedAbility.targets}`);
      return null;
  }
}

function _getUseCardAbilityAction(fieldSlotIndex) {
  const state = localStore.getState();
  const selectedAbility = Selectors.getSelectedAbility(state);
  const target = _getActionTargetFromSelectedAbility(selectedAbility, fieldSlotIndex);
  return _getActionFromSelectedAbility(selectedAbility, [target]);
}

function* _useSelectedAbility({ fieldSlotIndex }) {
  const action = yield _getUseCardAbilityAction(fieldSlotIndex);
  yield put(GameActions.fulfillTurnAction.request(action));
  yield put(Actions.useSelectedAbility.success());
}

function* _selectAbility({ abilityId }) {
  const ability = AbilityRetriever.getDefaultedAbility(abilityId);
  if (ability.targetsOpponentMinion()) {
    yield put(Actions.selectAbility.success(abilityId, ActionTargetType.TargetOpponentMinion));
  } else if (ability.targetsPlayerMinion()) {
    yield put(Actions.selectAbility.success(abilityId, ActionTargetType.TargetPlayerMinion));
  } else if (ability.targetsPlayer()) {
    yield put(Actions.selectAbility.success(abilityId, ActionTargetType.TargetPlayer));
    yield put(Actions.useSelectedAbility.request());
  } else {
    Log.error(`unexpected ability targets for ability id: ${abilityId}`);
  }
}

function* saga() {
  yield all([
    takeEvery(Actions.PLACE_MINION.REQUEST, _placeMinion),
    takeEvery(Actions.ATTACK_MINION.REQUEST, _attackMinion),
    takeEvery(Actions.USE_SELECTED_ABILITY.REQUEST, _useSelectedAbility),
    takeEvery(Actions.SELECT_ABILITY.REQUEST, _selectAbility),
  ]);
}

localStore.runSaga(saga);
