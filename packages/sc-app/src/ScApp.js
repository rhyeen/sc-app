import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { Log } from 'interface-handler/src/logger.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';
import { InterfaceState, INTERFACE_STATE } from 'interface-handler/src/interface-state.js';
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
    InterfaceState.set(INTERFACE_STATE.HTTP);
    this._page = '';
    this._pageId = '';
    // @TODO:
    this._playerId = 'US_1';
    this._playerDeckId = 'DD_2'; // DD_1
    this._dungeonId = 'test';
  }

  firstUpdated() {
    installRouter(location =>
      localStore.dispatch(Actions.navigate(decodeURIComponent(location.pathname))),
    );
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      updateMetadata({
        title: ScApp._getPageTitle(this._page),
      });
    }
  }

  stateChanged(state) {
    const oldPage = this._page;
    const oldPageId = this._pageId;
    this._page = Selector.getActivePage(state);
    this._pageId = Selector.getPageId(state);
    if (oldPage !== this._page || oldPageId !== this._pageId) {
      this.requestUpdate();
    }
  }

  _activePageHtml() {
    switch (this._page) {
      case ROUTES.PAGES.GAME:
        return html`
          <sc-game
            .playerId=${this._playerId}
            .playerDeckId=${this._playerDeckId}
            .dungeonId=${this._dungeonId}
            .gameId=${this._pageId}
          ></sc-game>
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
