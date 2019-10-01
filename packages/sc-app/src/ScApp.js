import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { Log } from 'interface-handler/src/logger.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { localStore } from './state/store.js';
import { Localize } from '../../utils/localizer.js';
import * as Actions from './state/actions.js';
import * as Selector from './state/selectors.js';
import { ROUTES } from './entities/route.js';

import { LOCALE_EN } from '../../locale/en.js';

export class ScApp extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  render() {
    return html`
      ${this._activePageHtml()}
    `;
  }

  constructor() {
    super();
    Localize.setLocale('EN', LOCALE_EN);
    Localize.useFallbackLocale('EN');
  }

  firstUpdated() {
    installRouter(location =>
      localStore.dispatch(Actions.navigate(decodeURIComponent(location.pathname))),
    );
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      updateMetadata({
        title: this._getPageTitle(this._page),
      });
    }
  }

  static get properties() {
    return {
      _page: { type: String },
    };
  }

  stateChanged(state) {
    this._page = Selector.getActivePage(state);
  }

  _activePageHtml() {
    switch (this._page) {
      case ROUTES.PAGES.GAME:
        return html`
          <sc-game></sc-game>
        `;
      default:
        return html`
          <sc-404></sc-404>
        `;
    }
  }

  static _getPageTitle(page) {
    const title = Localize.localeMap.SC_ROOT.TITLE.APP_NAME;
    switch (page) {
      case ROUTES.PAGES.GAME:
        return `${title} | ${Localize.localeMap.SC_ROOT.TITLE.PLAY}`;
      case ROUTES.PAGES.NOT_FOUND:
        return `${title} | ${Localize.localeMap.SC_ROOT.TITLE.NOT_FOUND}`;
      default:
        Log.error(`unexpected page: ${page}`);
        return title;
    }
  }
}
