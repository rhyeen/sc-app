import { store } from '../../../utils/store.js';
import root from './reducers.js';
import rootSaga from './sagas.js';

store.addReducers({ root });

store.runSaga(rootSaga);

export const localStore = store;
