import { INTERFACE_STATE, InterfaceState } from 'interface-handler/src/interface-state.js';
import * as CallHttp from './firebase/game.js';

export function newGame(playerId, playerDeckId, dungeonId) {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.newGame(playerId, playerDeckId, dungeonId);
    default:
      return InterfaceState.invalid();
  }
}

export function endCrafting(gameId, turn) {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.endCrafting(gameId, turn);
    default:
      return InterfaceState.invalid();
  }
}

export function endTurn(gameId, turn) {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.endTurn(gameId, turn);
    default:
      return InterfaceState.invalid();
  }
}
