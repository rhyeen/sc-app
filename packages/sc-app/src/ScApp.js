import { LitElement, html, css } from 'lit-element';
// import { connect } from 'pwa-helpers/connect-mixin.js';
// import { localStore } from '../state/store.js';
// import { installRouter } from 'pwa-helpers/router.js';
// import { updateMetadata } from 'pwa-helpers/metadata.js';
// import * as Actions from '../state/actions.js';
// import * as Selector from '../state/selectors.js';

// import { ROUTES } from '../entities/root.js';
// import { LOCALE_EN } from '../../internal_comps/sc_locale/src/entities/en.js';
// import './Sc404.js';

export class ScApp extends LitElement {

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

  static get properties() {
    return {
      _page: { type: String },
    };
  }

  _activePageHtml() {
    switch (this._page) {
      // case ROUTES.PAGES.GAME:
      //   return html`<sc-game>HELLO WORLD</sc-game>`;
      default:
        return html`<sc-404>HELLO WORLD</sc-404>`;
    }
  }
}
