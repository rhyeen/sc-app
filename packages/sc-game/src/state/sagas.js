import { put, all, call, takeLatest } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import { Log } from 'interface-handler/src/logger.js';
import * as GameInterface from '../services/interface/game.js';
import * as Selectors from './selectors.js';
import { localStore } from './store.js';

import * as Actions from './actions.js';
import * as CardsActions from '../../../sc-cards/src/state/actions.js';
import * as StatusActions from '../../../sc-status/src/state/actions.js';
import * as CraftActions from '../../../sc-craft/src/state/actions.js';
import { GAME_STATES } from '../entities/game-states.js';
import { GameDefiner } from '../services/game-definer.js';

function* _beginTurn() {
  yield put(CardsActions.setPlayerDecks.request());
  yield put(CardsActions.setPlayingField.request());
  yield put(StatusActions.setPlayerStatus.request());
  yield put(Actions.beginTurn.success());
}

function _buildGame(gameData) {
  debugger;
  return gameData;
}

function* _resetGame({ playerId, playerDeckId, dungeonId }) {
  const { data } = yield call(GameInterface.newGame, playerId, playerDeckId, dungeonId);
  const game = yield call(_buildGame, data.game);
  yield put(Actions.setGame(game));
  // yield put(CardsActions.setCards.request());
  // yield put(Actions.beginTurn.request());
  yield put(Actions.resetGame.success());
}

function* _beginCrafting() {
  yield put(CraftActions.setCraftingBaseCard.request());
  yield put(CraftActions.setCraftingParts.request());
  yield put(Actions.beginCrafting.success());
}

function _callEndCrafting() {
  const state = localStore.getState();
  const turn = Selectors.getPendingTurn(state);
  return GameInterface.endCrafting(turn);
}

function* _setGameState(gameState) {
  switch (gameState) {
    case GAME_STATES.LOSE:
      yield put(Actions.loseGame.request());
      break;
    case GAME_STATES.WIN:
      yield put(Actions.winGame.request());
      break;
    default:
      break;
  }
}

function* _endCrafting() {
  try {
    const { opponentTurn, updatedCards, gameState, newCards } = yield call(_callEndCrafting);
    yield put(Actions.endCrafting.success(opponentTurn));
    yield put(CardsActions.setUpdatedCards(updatedCards));
    yield put(CardsActions.setNewCards(newCards));
    yield put(Actions.beginTurn.request());
    yield _setGameState(gameState);
  } catch (e) {
    yield Log.error(`@TODO: unable to endCrafting(): ${e}`);
  }
}

function* _winGame() {
  yield put(Actions.winGame.success());
}

function* _loseGame() {
  yield put(Actions.loseGame.success());
}

function _callEndTurn() {
  const state = localStore.getState();
  const turn = Selectors.getPendingTurn(state);
  return GameInterface.endTurn(turn);
}

function* _endTurn() {
  yield call(_callEndTurn);
  yield put(Actions.endTurn.success());
  yield put(Actions.beginCrafting.request());
}

function _executeTurnAction(turnAction) {
  const game = GameDefiner.getGame();
  const result = turnAction.execute(game);
  // debugger;
  Log.info('@TODO:');
  Log.info(result);
}

function* _fulfillTurnAction({ turnAction }) {
  yield call(_executeTurnAction, turnAction);
  yield put(Actions.recordAction(turnAction.json()));
  yield put(Actions.fulfillTurnAction.success());
}

function* saga() {
  yield all([
    takeLatest(Actions.RESET_GAME.REQUEST, _resetGame),
    takeLatest(Actions.BEGIN_CRAFTING.REQUEST, _beginCrafting),
    takeLatest(Actions.END_CRAFTING.REQUEST, _endCrafting),
    takeLatest(Actions.WIN_GAME.REQUEST, _winGame),
    takeLatest(Actions.LOSE_GAME.REQUEST, _loseGame),
    takeLatest(Actions.END_TURN.REQUEST, _endTurn),
    takeLatest(Actions.BEGIN_TURN.REQUEST, _beginTurn),
    takeLatest(Actions.FULFILL_TURN_ACTION.REQUEST, _fulfillTurnAction),
  ]);
}

localStore.runSaga(saga);
