export const ROUTES = {
  PAGES: {
    GAME: 'ROUTE_PAGE_GAME',
    NOT_FOUND: 'ROUTE_PAGE_404',
  },
  ENDPOINTS: {
    GAME: 'game',
  },
  FILE_ROUTES: {
    GAME: '../../../sc-game/sc-game.js',
  },
};

export const DEFAULT_PATH = ROUTES.ENDPOINTS.GAME;

export class Route {
  static importPage(page) {
    switch (page) {
      case ROUTES.PAGES.GAME:
        import(ROUTES.FILE_ROUTES.GAME);
        return page;
      default:
        // @NOTE: don't need to import 404 page, ScApp already does that.
        return ROUTES.PAGES.NOT_FOUND;
    }
  }

  static setActivePageUrl(activePage, activePageId) {
    const endpoint = Route._getEndpointFromPage(activePage);
    if (!endpoint) {
      return;
    }
    let url = `/${endpoint}`;
    if (activePageId) {
      url += `/${activePageId}`;
    }
    window.history.pushState({}, document.title, url);
  }

  static getPageFromPath(path) {
    const pathElements = this._getPathElements(path);
    return this._getPageFromEndpoint(pathElements[0].page);
  }

  static getPageIdFromPath(path) {
    const pathElements = this._getPathElements(path);
    return pathElements[0].id;
  }

  static _getPathElements(path) {
    if (!path || path === '/') {
      return [Route._createPathElement(DEFAULT_PATH, null)];
    }
    const pathParts = path.split('/');
    if (!pathParts.length) {
      return [Route._createPathElement(DEFAULT_PATH, null)];
    }
    let isPagePart = true;
    const pathElements = [];
    for (let i = 0; i < pathParts.length; i += 1) {
      if (!pathParts[i]) {
        continue;
      }
      const isLastElement = i === pathParts.length - 1;
      if (isPagePart && isLastElement) {
        pathElements.push(Route._createPathElement(pathParts[i], null));
      } else if (!isPagePart) {
        pathElements.push(Route._createPathElement(pathParts[i - 1], pathParts[i]));
      }
      isPagePart = !isPagePart;
    }
    return pathElements;
  }

  static _createPathElement(page, pageId) {
    return {
      page,
      id: pageId,
    };
  }

  static _getEndpointFromPage(page) {
    switch (page) {
      case ROUTES.PAGES.GAME:
        return ROUTES.ENDPOINTS.GAME;
      default:
        return null;
    }
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
