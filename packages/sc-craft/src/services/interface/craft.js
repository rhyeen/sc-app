import { INTERFACE_STATE, InterfaceState } from 'interface-handler/src/interface-state.js';
import * as CallHttp from './firebase/craft.js';


export function getCardNames(cardHash) {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.getCardNames(cardHash);
    default:
      return InterfaceState.invalid();
  }
}

export function addCardToDeck(cardName, cardHash, playerId, gameId, forgeSlotIndex, numberOfInstances, turnUpToAddCardToDeckAction) {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.addCardToDeck(cardName, cardHash, playerId, gameId, forgeSlotIndex, numberOfInstances, turnUpToAddCardToDeckAction);
    default:
      return InterfaceState.invalid();
  }
}

