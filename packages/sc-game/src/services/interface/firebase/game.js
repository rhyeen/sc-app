import { firebaseFunctions } from '../../../../../utils/firebase.js';

export function beginGame() {
  return firebaseFunctions.httpsCallable('beginGame')();
}

export function endCrafting(turn) {
  return firebaseFunctions.httpsCallable('endCrafting')({ turn });
}

export function endTurn(turn) {
  return firebaseFunctions.httpsCallable('endTurn')({ turn });
}
