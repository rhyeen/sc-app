import { html, LitElement } from 'lit-element';

import { ScOverlayStyles } from './sc-overlay-styles.js';
import { Localize } from '../../../../utils/localizer.js';

export class ScLoadingOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles];
  }

  render() {
    return html`
      <sc-loading .text=${Localize.localeMap.SC_GAME.LOADING}></sc-loading>
    `;
  }
}
