import { INTERFACE_STATE, InterfaceState } from 'interface-handler/src/interface-state.js';
import * as CallHttp from './firebase/game.js';

export function newGame() {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.newGame();
    default:
      return InterfaceState.invalid();
  }
}

export function endCrafting(turn) {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.endCrafting(turn);
    default:
      return InterfaceState.invalid();
  }
}

export function endTurn(turn) {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.endTurn(turn);
    default:
      return InterfaceState.invalid();
  }
}
