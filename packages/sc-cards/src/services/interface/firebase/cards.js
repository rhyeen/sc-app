import { firebaseFunctions } from '../../../../../utils/firebase.js';

export function getCards() {
  return firebaseFunctions.httpsCallable('getCards')();
}

export function getPlayerDecks() {
  return firebaseFunctions.httpsCallable('getPlayerDecks')();
}

export function getPlayingField(card) {
  return firebaseFunctions.httpsCallable('getPlayingField')({ card });
}
