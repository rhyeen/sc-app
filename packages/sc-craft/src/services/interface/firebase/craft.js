import { firebaseFunctions } from '../../../../../utils/firebase.js';

export function getCraftingBaseCard() {
  return firebaseFunctions.httpsCallable('getCraftingBaseCard')();
}

export function getCraftingParts() {
  return firebaseFunctions.httpsCallable('getCraftingParts')();
}

export function getCardIdentifiers(card) {
  return firebaseFunctions.httpsCallable('getCardIdentifiers')({ card });
}
