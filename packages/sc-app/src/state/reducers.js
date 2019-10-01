import * as Actions from './actions.js';

import { ROUTES } from '../entities/route.js';

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

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.UPDATE_ACTIVE_PAGE.SUCCESS:
      return _updateActivePage(state, action.activePage);
    default:
      return state;
  }
};

export default app;
