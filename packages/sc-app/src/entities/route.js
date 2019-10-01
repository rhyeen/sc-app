import { Log } from 'interface-handler/src/logger.js';
import { firebaseFunctions } from '../../../utils/firebase-init.js';

export const ROUTES = {
  PAGES: {
    GAME: 'ROUTE_PAGE_GAME',
    NOT_FOUND: 'ROUTE_PAGE_404',
  },
  ENDPOINTS: {
    GAME: 'game',
  },
};

export const DEFAULT_PATH = ROUTES.ENDPOINTS.GAME;

export class Route {
  static importPage(page) {
    switch (page) {
      case ROUTES.PAGES.GAME:
        import('../../../sc-game/sc-game.js');
        return page;
      default:
        // @NOTE: don't need to import 404 page, ScApp already does that.
        return ROUTES.PAGES.NOT_FOUND;
    }
  }

  static getPageFromPath(path) {
    const endpoint = this._getEndpoint(path);
    firebaseFunctions
      .httpsCallable('helloWorld')({ text: 'hello' })
      .then(result => {
        Log.error(result);
      });
    return this._getPageFromEndpoint(endpoint);
  }

  static _getEndpoint(path) {
    return !path || path === '/' ? DEFAULT_PATH : path.slice(1);
  }

  static _getPageFromEndpoint(endpoint) {
    switch (endpoint) {
      case ROUTES.ENDPOINTS.GAME:
        return ROUTES.PAGES.GAME;
      default:
        return ROUTES.PAGES.NOT_FOUND;
    }
  }
}
