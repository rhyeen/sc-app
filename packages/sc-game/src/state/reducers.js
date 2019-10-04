import * as Actions from './actions.js';

import { GAME_STATES } from '../entities/game-states.js';
import { localStore } from './store.js';

const INITIAL_STATE = {
  ui: {
    menu: {
      show: false,
    },
    game: {
      state: GAME_STATES.PLAYING,
    },
  },
  entities: {
    pendingTurn: [],
    turnHistory: [],
  },
};

function _toggleMenuState(state, showMenu) {
  return {
    ...state,
    ui: {
      ...state.ui,
      menu: {
        ...state.ui.menu,
        show: showMenu,
      },
    },
  };
}

function _updateGameState(state, gameState) {
  return {
    ...state,
    ui: {
      ...state.ui,
      game: {
        ...state.ui.game,
        state: gameState,
      },
    },
  };
}

function _updatePendingTurn(state, action) {
  return {
    ...state,
    entities: {
      ...state.entities,
      pendingTurn: [...state.entities.pendingTurn, action],
    },
  };
}

function _endTurn(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      turnHistory: [...state.entities.turnHistory, state.entities.pendingTurn],
      pendingTurn: [],
    },
  };
}

function _addOpponentTurn(state, opponentTurn) {
  return {
    ...state,
    entities: {
      ...state.entities,
      turnHistory: [...state.entities.turnHistory, opponentTurn],
    },
  };
}

const reducer = (state = INITIAL_STATE, action) => {
  let s = state;
  switch (action.type) {
    case Actions.SHOW_IN_GAME_MENU:
      return _toggleMenuState(s, true);
    case Actions.HIDE_IN_GAME_MENU:
      return _toggleMenuState(s, false);
    case Actions.RESET_GAME.SUCCESS:
      s = _toggleMenuState(s, false);
      return _updateGameState(s, GAME_STATES.PLAYING);
    case Actions.BEGIN_CRAFTING.SUCCESS:
      return _updateGameState(s, GAME_STATES.CRAFTING);
    case Actions.END_CRAFTING.SUCCESS:
      s = _updateGameState(s, GAME_STATES.PLAYING);
      s = _endTurn(s);
      return _addOpponentTurn(s, action.opponentTurn);
    case Actions.WIN_GAME.SUCCESS:
      return _updateGameState(s, GAME_STATES.WIN);
    case Actions.LOSE_GAME.SUCCESS:
      return _updateGameState(s, GAME_STATES.LOSE);
    case Actions.RECORD_ACTION:
      return _updatePendingTurn(s, action.action);
    case Actions.END_TURN.SUCCESS:
      return _endTurn(s);
    default:
      return s;
  }
};

localStore.addReducers({ scGame: reducer });
