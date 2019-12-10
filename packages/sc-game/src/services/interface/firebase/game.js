import { firebaseFunctions } from '../../../../../utils/firebase.js';

export function newGame(playerId, playerDeckId, dungeonId) {
  return firebaseFunctions.httpsCallable('newGame')({ playerId, playerDeckId, dungeonId });
}

export function endCrafting(turn) {
  return firebaseFunctions.httpsCallable('endCrafting')({ turn });
}

export function endTurn(turn) {
  return firebaseFunctions.httpsCallable('endTurn')({ turn });
}
