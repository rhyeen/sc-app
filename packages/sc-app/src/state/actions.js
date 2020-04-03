import { ReduxAction } from '../../../utils/redux-action.js';

const ra = new ReduxAction('ROOT');

export const UPDATE_ACTIVE_PAGE = ra.createRequestTypes('UPDATE_ACTIVE_PAGE');
export const updateActivePage = {
  request: (activePage, activePageId) =>
    ReduxAction.action(UPDATE_ACTIVE_PAGE.REQUEST, { activePage, activePageId }),
  success: (activePage, activePageId) =>
    ReduxAction.action(UPDATE_ACTIVE_PAGE.SUCCESS, { activePage, activePageId }),
};

export const NAVIGATE = ra.createRequestRaw('NAVIGATE');
export const navigate = path => ReduxAction.action(NAVIGATE, { path });
