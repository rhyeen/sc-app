import firebase from 'firebase/app'; // eslint-disable-line import/extensions
// Required for side-effects
import 'firebase/functions'; // eslint-disable-line import/extensions
import { firebaseAPIKey } from '../../_secrets.js';

firebase.initializeApp({
  apiKey: firebaseAPIKey,
  authDomain: 'sharded-cards.firebaseapp.com',
  projectId: 'sharded-cards',
  databaseURL: 'https://sharded-cards.firebaseio.com',
});

// Initialize Cloud Functions through Firebase
export const firebaseFunctions = firebase.functions();
