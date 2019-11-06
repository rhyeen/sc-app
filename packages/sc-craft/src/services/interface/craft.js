import { INTERFACE_STATE, InterfaceState } from 'interface-handler/src/interface-state.js';
import * as CallHttp from './firebase/craft.js';

export function getCraftingBaseCard() {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.getCraftingBaseCard();
    default:
      return InterfaceState.invalid();
  }
}

export function getCraftingParts() {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.getCraftingParts();
    default:
      return InterfaceState.invalid();
  }
}

export function getCardIdentifiers(card) {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.getCardIdentifiers(card);
    default:
      return InterfaceState.invalid();
  }
}
