import { createSelector } from 'reselect';

const _routeSelector = state => state.root.route;

export const getActivePage = createSelector(
  _routeSelector,
  route => route.activePage,
);
