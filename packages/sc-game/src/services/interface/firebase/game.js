import { firebaseFunctions } from '../../../../../utils/firebase.js';

export function newGame(playerId, playerDeckId, dungeonId) {
  return firebaseFunctions.httpsCallable('newGame')({ playerId, playerDeckId, dungeonId });
}

export function endCrafting(gameId, turn) {
  return firebaseFunctions.httpsCallable('endCrafting')({ gameId, turn });
}

export function endTurn(gameId, turn) {
  return firebaseFunctions.httpsCallable('endTurn')({ gameId, turn });
}
