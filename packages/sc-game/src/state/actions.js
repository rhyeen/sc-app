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
  request: () => ReduxAction.action(RESET_GAME.REQUEST, {}),
  success: () => ReduxAction.action(RESET_GAME.SUCCESS, {}),
};

export const END_TURN = ra.createRequestTypes('END_TURN');
export const endTurn = {
  request: () => ReduxAction.action(END_TURN.REQUEST, {}),
  success: () => ReduxAction.action(END_TURN.SUCCESS, {}),
};

export const BEGIN_TURN = ra.createRequestTypes('BEGIN_TURN');
export const beginTurn = {
  request: () => ReduxAction.action(BEGIN_TURN.REQUEST, {}),
  success: () => ReduxAction.action(BEGIN_TURN.SUCCESS, {}),
};

export const BEGIN_CRAFTING = ra.createRequestTypes('BEGIN_CRAFTING');
export const beginCrafting = {
  request: () => ReduxAction.action(BEGIN_CRAFTING.REQUEST, {}),
  success: () => ReduxAction.action(BEGIN_CRAFTING.SUCCESS, {}),
};

export const END_CRAFTING = ra.createRequestTypes('END_CRAFTING');
export const endCrafting = {
  request: () => ReduxAction.action(END_CRAFTING.REQUEST, {}),
  success: opponentTurn => ReduxAction.action(END_CRAFTING.SUCCESS, { opponentTurn }),
};

export const WIN_GAME = ra.createRequestTypes('WIN_GAME');
export const winGame = {
  request: () => ReduxAction.action(WIN_GAME.REQUEST, {}),
  success: () => ReduxAction.action(WIN_GAME.SUCCESS, {}),
};

export const LOSE_GAME = ra.createRequestTypes('LOSE_GAME');
export const loseGame = {
  request: () => ReduxAction.action(LOSE_GAME.REQUEST, {}),
  success: () => ReduxAction.action(LOSE_GAME.SUCCESS, {}),
};

export const FULFILL_TURN_ACTION = ra.createRequestTypes('FULFILL_TURN_ACTION');
export const fulfillTurnAction = {
  request: (turnAction) => ReduxAction.action(FULFILL_TURN_ACTION.REQUEST, {turnAction}),
  success: () => ReduxAction.action(FULFILL_TURN_ACTION.SUCCESS, {}),
};
