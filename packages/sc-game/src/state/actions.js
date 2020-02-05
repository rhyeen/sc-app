import { ReduxAction } from '../../../utils/redux-action.js';

const ra = new ReduxAction('SR_GAME');

export const RECORD_ACTION = ra.createRequestRaw('RECORD_ACTION');
export const recordAction = action => ReduxAction.action(RECORD_ACTION, { action });

export const SHOW_IN_GAME_MENU = ra.createRequestRaw('SHOW_IN_GAME_MENU');
export const showInGameMenu = () => ReduxAction.action(SHOW_IN_GAME_MENU, {});

export const HIDE_IN_GAME_MENU = ra.createRequestRaw('HIDE_IN_GAME_MENU');
export const hideInGameMenu = () => ReduxAction.action(HIDE_IN_GAME_MENU, {});

export const RESET_GAME = ra.createRequestTypes('RESET_GAME');
export const resetGame = {
  request: (playerId, playerDeckId, dungeonId) =>
    ReduxAction.action(RESET_GAME.REQUEST, { playerId, playerDeckId, dungeonId }),
  success: () => ReduxAction.action(RESET_GAME.SUCCESS, {}),
};

export const END_TURN = ra.createRequestTypes('END_TURN');
export const endTurn = {
  request: () => ReduxAction.action(END_TURN.REQUEST, {}),
  success: () => ReduxAction.action(END_TURN.SUCCESS, {}),
};

export const END_CRAFTING = ra.createRequestTypes('END_CRAFTING');
export const endCrafting = {
  request: () => ReduxAction.action(END_CRAFTING.REQUEST, {}),
  success: opponentTurn => ReduxAction.action(END_CRAFTING.SUCCESS, { opponentTurn }),
};

export const FULFILL_TURN_ACTION = ra.createRequestTypes('FULFILL_TURN_ACTION');
export const fulfillTurnAction = {
  request: turnAction => ReduxAction.action(FULFILL_TURN_ACTION.REQUEST, { turnAction }),
  success: () => ReduxAction.action(FULFILL_TURN_ACTION.SUCCESS, {}),
};

export const FLUSH_TURN_ACTIONS = ra.createRequestRaw('FLUSH_TURN_ACTIONS');
export const flushTurnActions = () => ReduxAction.action(FLUSH_TURN_ACTIONS, {});

export const SET_GAME = ra.createRequestRaw('SET_GAME');
export const setGame = game => ReduxAction.action(SET_GAME, { game });

export const SET_PLAYER_ID = ra.createRequestRaw('SET_PLAYER_ID');
export const setPlayerId = playerId => ReduxAction.action(SET_PLAYER_ID, { playerId });

export const SET_PLAYER_DECK_ID = ra.createRequestRaw('SET_PLAYER_DECK_ID');
export const setPlayerDeckId = playerDeckId =>
  ReduxAction.action(SET_PLAYER_DECK_ID, { playerDeckId });

export const SET_DUNGEON_ID = ra.createRequestRaw('SET_DUNGEON_ID');
export const setDungeonId = dungeonId => ReduxAction.action(SET_DUNGEON_ID, { dungeonId });

export const SET_LOADING = ra.createRequestRaw('SET_LOADING');
export const setLoading = loading => ReduxAction.action(SET_LOADING, { loading });
