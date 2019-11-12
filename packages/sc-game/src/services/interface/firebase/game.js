import { firebaseFunctions } from '../../../../../utils/firebase.js';

export function newGame() {
  debugger;
  return firebaseFunctions.httpsCallable('newGame')();
}

export function endCrafting(turn) {
  return firebaseFunctions.httpsCallable('endCrafting')({ turn });
}

export function endTurn(turn) {
  return firebaseFunctions.httpsCallable('endTurn')({ turn });
}
