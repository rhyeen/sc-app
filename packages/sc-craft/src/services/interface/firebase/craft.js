import { firebaseFunctions } from '../../../../../utils/firebase.js';

export function getCardNames(cardHash) {
  return firebaseFunctions.httpsCallable('getCardNames')({ cardHash });
}

export function createCard(cardName, cardHash, playerId, gameId) {
  return firebaseFunctions.httpsCallable('createCard')({ cardName, cardHash, playerId, gameId });
}

export function getCraftingBaseCard() {
  return firebaseFunctions.httpsCallable('getCraftingBaseCard')();
}

export function getCraftingParts() {
  return firebaseFunctions.httpsCallable('getCraftingParts')();
}

export function getCardIdentifiers(card) {
  return firebaseFunctions.httpsCallable('getCardIdentifiers')({ card });
}
