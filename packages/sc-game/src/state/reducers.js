import * as Actions from './actions.js';

import { localStore } from './store.js';
import { GamePhase } from '@shardedcards/sc-types/dist/game/enums/game-phase';

const INITIAL_STATE = {
  ui: {
    menu: {
      show: false,
    },
    game: {
      version: 0,
    },
    loading: false
  },
  entities: {
    pendingTurn: [],
    flushedTurn: [],
    turnHistory: [],
    game: null,
    playerId: null,
    playerDeckId: null,
    dungeonId: null,
  },
};

function _setLoading(state, loading) {
  return  {
    ...state,
    ui: {
      ...state.ui,
      loading
    }
  };
}

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

function _updateGamePhase(state, gamePhase) {
  const game = state.entities.game.copy();
  game.phase = gamePhase;
  return _setGame(state, game);
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
  const fullTurn = [...state.entities.flushedTurn, ...state.entities.pendingTurn];
  return {
    ...state,
    entities: {
      ...state.entities,
      turnHistory: [...state.entities.turnHistory, fullTurn],
      pendingTurn: [],
      flushedTurn: [],
    },
  };
}

function _flushPendingTurn(state) {
  const fullTurn = [...state.entities.flushedTurn, ...state.entities.pendingTurn];
  return {
    ...state,
    entities: {
      ...state.entities,
      pendingTurn: [],
      flushedTurn: fullTurn,
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

function _setGame(state, game) {
  return {
    ...state,
    ui: {
      ...state.ui,
      game: {
        ...state.ui.game,
        version: state.ui.game.version + 1,
      },
    },
    entities: {
      ...state.entities,
      game,
    },
  };
}

function _setPlayerId(state, playerId) {
  return {
    ...state,
    entities: {
      ...state.entities,
      playerId,
    },
  };
}

function _setPlayerDeckId(state, playerDeckId) {
  return {
    ...state,
    entities: {
      ...state.entities,
      playerDeckId,
    },
  };
}

function _setDungeonId(state, dungeonId) {
  return {
    ...state,
    entities: {
      ...state.entities,
      dungeonId,
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
      return _updateGamePhase(newState, GamePhase.Battle);
    case Actions.END_CRAFTING.REQUEST:
      return _setLoading(newState, true);
    case Actions.END_CRAFTING.SUCCESS:
      newState = _updateGamePhase(newState, GamePhase.Battle);
      newState = _setLoading(newState, false);
      newState = _endTurn(newState);
      return _addOpponentTurn(newState, action.opponentTurn);
    case Actions.WIN_GAME.SUCCESS:
      return _updateGamePhase(newState, GamePhase.Win);
    case Actions.LOSE_GAME.SUCCESS:
      return _updateGamePhase(newState, GamePhase.Lose);
    case Actions.RECORD_ACTION:
      return _updatePendingTurn(newState, action.action);
    case Actions.END_TURN.REQUEST:
      return _setLoading(newState, true);
    case Actions.END_TURN.SUCCESS:
      newState = _updateGamePhase(newState, GamePhase.Draft);
      newState = _setLoading(newState, false);
      return _endTurn(newState);
    case Actions.SET_GAME:
      return _setGame(newState, action.game);
    case Actions.SET_PLAYER_ID:
      return _setPlayerId(newState, action.playerId);
    case Actions.SET_PLAYER_DECK_ID:
      return _setPlayerDeckId(newState, action.playerDeckId);
    case Actions.SET_DUNGEON_ID:
      return _setDungeonId(newState, action.dungeonId);
    case Actions.SET_LOADING:
      return _setLoading(newState, action.loading);
    case Actions.FLUSH_TURN_ACTIONS:
      return _flushPendingTurn(newState);
    default:
      return newState;
  }
};

localStore.addReducers({ scGame: reducer });
