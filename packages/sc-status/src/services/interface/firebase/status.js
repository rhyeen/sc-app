import { firebaseFunctions } from '../../../../../utils/firebase.js';

export function getPlayerStatus() {
  return firebaseFunctions.httpsCallable('getPlayerStatus')();
}
