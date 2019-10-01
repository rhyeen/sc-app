import { call, put, all, takeLatest } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import { Route } from '../entities/route.js';
import * as Actions from './actions.js';

function* _updateActivePage({ activePage }) {
  const _activePage = yield call(Route.importPage, activePage);
  yield put(Actions.updateActivePage.success(_activePage));
}

function* _navigate({ path }) {
  yield _updateActivePage({ activePage: Route.getPageFromPath(path) });
}

export default function* root() {
  yield all([
    takeLatest(Actions.UPDATE_ACTIVE_PAGE.REQUEST, _updateActivePage),
    takeLatest(Actions.NAVIGATE, _navigate),
  ]);
}
