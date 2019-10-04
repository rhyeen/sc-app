import { firebaseFunctions } from '../../../../../utils/firebase.js';

export const beginGame = () => firebaseFunctions.httpsCallable('beginGame')();

export const endCrafting = turn => firebaseFunctions.httpsCallable('endCrafting')({ turn });

export const endTurn = turn => firebaseFunctions.httpsCallable('endTurn')({ turn });
