import * as Actions from './actions.js';

import { localStore } from './store.js';

const INITIAL_STATE = {
  route: {
    activePage: null,
    activePageId: null,
  },
};

function _updateActivePage(state, activePage, activePageId) {
  return {
    ...state,
    route: {
      ...state.route,
      activePage,
      activePageId,
    },
  };
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.UPDATE_ACTIVE_PAGE.SUCCESS:
      return _updateActivePage(state, action.activePage, action.activePageId);
    default:
      return state;
  }
};

localStore.addReducers({ root: reducer });
