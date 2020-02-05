import { firebaseFunctions } from '../../../../../utils/firebase.js';

export function getCardNames(cardHash) {
  return firebaseFunctions.httpsCallable('getCardNames')({ cardHash });
}

export function addCardToDeck(cardName, cardHash, playerId, gameId, forgeSlotIndex, numberOfInstances, turn) {
  const body = { cardHash, playerId, gameId, forgeSlotIndex, numberOfInstances, turn };
  if (cardName.id) {
    body.cardName = cardName;
  }
  return firebaseFunctions.httpsCallable('addCardToDeck')(body);
}
