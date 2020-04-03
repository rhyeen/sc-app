import { put, all, call, takeLatest } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import { Log } from 'interface-handler/src/logger.js';
import { GameBuilder } from '@shardedcards/sc-types/dist/game/services/builders/game-builder.js';
import { CraftingTableBuilder } from '@shardedcards/sc-types/dist/game/services/builders/crafting-table-builder.js';
import * as GameInterface from '../services/interface/game.js';
import * as Selectors from './selectors.js';
import { localStore } from './store.js';

import * as Actions from './actions.js';
import * as AppActions from '../../../sc-app/src/state/actions.js';
import { ROUTES } from '../../../sc-app/src/entities/route.js';

function _buildGame(gameData) {
  const game = GameBuilder.buildGame(gameData);
  return game;
}

function* _resetGame({ playerId, playerDeckId, dungeonId }) {
  yield put(Actions.setGame(null));
  const { data } = yield call(GameInterface.newGame, playerId, playerDeckId, dungeonId);
  const game = yield call(_buildGame, data.game);
  yield put(AppActions.updateActivePage.request(ROUTES.PAGES.GAME, game.id));
  yield put(Actions.setGame(game));
  yield put(Actions.resetGame.success());
}

function* _loadGame({ gameId, playerId, playerDeckId, dungeonId }) {
  yield put(Actions.setGame(null));
  const { data } = yield call(GameInterface.getGame, gameId, playerId, playerDeckId, dungeonId);
  const game = yield call(_buildGame, data.game);
  yield put(Actions.showInGameMenu());
  yield put(Actions.setGame(game));
  yield put(Actions.loadGame.success());
}

function _callEndCrafting() {
  const state = localStore.getState();
  const turn = Selectors.getPendingTurn(state);
  const gameId = Selectors.getGameId(state);
  return GameInterface.endCrafting(gameId, turn);
}

function* _endCrafting() {
  try {
    const { data } = yield call(_callEndCrafting);
    const game = yield call(_buildGame, data.game);
    yield put(Actions.setGame(game));
    yield put(Actions.endCrafting.success(data.opponentTurn));
  } catch (e) {
    yield Log.error(`@TODO: unable to endCrafting(): ${e}`);
  }
}

function _callEndTurn() {
  const state = localStore.getState();
  const turn = Selectors.getPendingTurn(state);
  const gameId = Selectors.getGameId(state);
  return GameInterface.endTurn(gameId, turn);
}

function _setCraftingTable(craftingPartsData, baseCardsData) {
  const baseCards = CraftingTableBuilder.buildBaseCards(baseCardsData);
  const craftingParts = CraftingTableBuilder.buildCraftingParts(craftingPartsData);
  const state = localStore.getState();
  const game = Selectors.getGame(state);
  game.player.craftingTable.baseCards = baseCards;
  game.player.craftingTable.craftingParts = craftingParts;
  return game;
}

function* _endTurn() {
  const { data } = yield call(_callEndTurn);
  const game = yield call(_setCraftingTable, data.craftingParts, data.baseCards);
  yield put(Actions.setGame(game));
  yield put(Actions.endTurn.success());
}

function _executeTurnAction(turnAction) {
  const state = localStore.getState();
  const game = Selectors.getGame(state);
  return turnAction.execute(game);
}

function* _fulfillTurnAction({ turnAction }) {
  const result = yield call(_executeTurnAction, turnAction);
  yield put(Actions.recordAction(turnAction.json()));
  yield put(Actions.setGame(result.game));
  yield put(Actions.fulfillTurnAction.success());
}

function* saga() {
  yield all([
    takeLatest(Actions.RESET_GAME.REQUEST, _resetGame),
    takeLatest(Actions.LOAD_GAME.REQUEST, _loadGame),
    takeLatest(Actions.END_CRAFTING.REQUEST, _endCrafting),
    takeLatest(Actions.END_TURN.REQUEST, _endTurn),
    takeLatest(Actions.FULFILL_TURN_ACTION.REQUEST, _fulfillTurnAction),
  ]);
}

localStore.runSaga(saga);
