import { INTERFACE_STATE, InterfaceState } from 'interface-handler/src/interface-state.js';
import * as CallHttp from './firebase/cards.js';

export function getCards() {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.getCards();
    default:
      return InterfaceState.invalid();
  }
}

export function getPlayerDecks() {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.getPlayerDecks();
    default:
      return InterfaceState.invalid();
  }
}

export function getPlayingField(card) {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.getPlayingField(card);
    default:
      return InterfaceState.invalid();
  }
}
