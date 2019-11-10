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
  let newState = state;
  switch (action.type) {
    case Actions.SHOW_IN_GAME_MENU:
      return _toggleMenuState(newState, true);
    case Actions.HIDE_IN_GAME_MENU:
      return _toggleMenuState(newState, false);
    case Actions.RESET_GAME.SUCCESS:
      newState = _toggleMenuState(newState, false);
      return _updateGameState(newState, GAME_STATES.PLAYING);
    case Actions.BEGIN_CRAFTING.SUCCESS:
      return _updateGameState(newState, GAME_STATES.CRAFTING);
    case Actions.END_CRAFTING.SUCCESS:
      newState = _updateGameState(newState, GAME_STATES.PLAYING);
      newState = _endTurn(newState);
      return _addOpponentTurn(newState, action.opponentTurn);
    case Actions.WIN_GAME.SUCCESS:
      return _updateGameState(newState, GAME_STATES.WIN);
    case Actions.LOSE_GAME.SUCCESS:
      return _updateGameState(newState, GAME_STATES.LOSE);
    case Actions.RECORD_ACTION:
      return _updatePendingTurn(newState, action.action);
    case Actions.END_TURN.SUCCESS:
      return _endTurn(newState);
    default:
      return newState;
  }
};

localStore.addReducers({ scGame: reducer });