import { firebaseFunctions } from '../../../../../utils/firebase.js';

export function getCardNames(cardHash) {
  return firebaseFunctions.httpsCallable('getCardNames')({ cardHash });
}

export function createCard(cardName, cardHash, playerId, gameId) {
  return firebaseFunctions.httpsCallable('createCard')({ cardName, cardHash, playerId, gameId });
}

export function addCardToDeck(cardName, cardHash, playerId, gameId, forgeSlotIndex, numberOfInstances, turn) {
  const body = { cardHash, playerId, gameId, forgeSlotIndex, numberOfInstances, turn };
  if (cardName.id) {
    body.cardName = cardName;
  }
  return firebaseFunctions.httpsCallable('addCardToDeck')(body);
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
