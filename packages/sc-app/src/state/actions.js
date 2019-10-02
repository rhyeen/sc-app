import { ReduxAction } from '../../../utils/redux-action.js';

const ra = new ReduxAction('ROOT');

export const UPDATE_ACTIVE_PAGE = ra.createRequestTypes('UPDATE_ACTIVE_PAGE');
export const updateActivePage = {
  request: activePage => ReduxAction.action(UPDATE_ACTIVE_PAGE.REQUEST, { activePage }),
  success: activePage => ReduxAction.action(UPDATE_ACTIVE_PAGE.SUCCESS, { activePage }),
};

export const NAVIGATE = ra.createRequestRaw('NAVIGATE');
export const navigate = path => ReduxAction.action(NAVIGATE, { path });
