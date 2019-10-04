import * as Actions from './actions.js';

import { ROUTES } from '../entities/route.js';
import { localStore } from './store.js';

const INITIAL_STATE = {
  route: {
    activePage: ROUTES.PAGES.GAME,
  },
};

function _updateActivePage(state, activePage) {
  return {
    ...state,
    route: {
      ...state.route,
      activePage,
    },
  };
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.UPDATE_ACTIVE_PAGE.SUCCESS:
      return _updateActivePage(state, action.activePage);
    default:
      return state;
  }
};

localStore.addReducers({ root: reducer });
