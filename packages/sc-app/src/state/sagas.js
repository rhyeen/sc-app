import { call, put, all, takeLatest } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import { Route } from '../entities/route.js';
import * as Actions from './actions.js';
import { localStore } from './store.js';

function* _updateActivePage({ activePage, activePageId }) {
  const _activePage = yield call(Route.importPage, activePage);
  yield call(Route.setActivePageUrl, activePage, activePageId);
  yield put(Actions.updateActivePage.success(_activePage, activePageId));
}

function* _navigate({ path }) {
  yield _updateActivePage({
    activePage: Route.getPageFromPath(path),
    activePageId: Route.getPageIdFromPath(path),
  });
}

function* saga() {
  yield all([
    takeLatest(Actions.UPDATE_ACTIVE_PAGE.REQUEST, _updateActivePage),
    takeLatest(Actions.NAVIGATE, _navigate),
  ]);
}

localStore.runSaga(saga);
