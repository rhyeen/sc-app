import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';
import * as Selectors from '../../state/selectors.js';
import { NAV } from '../../../sc-game-styles.js';

export class ScGameView extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          width: 100vw;
          margin-top: ${NAV.HEADER.HEIGHT};
          height: calc(100vh - ${NAV.HEADER.HEIGHT} - ${NAV.FOOTER.HEIGHT});
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      `,
    ];
  }

  render() {
    return html`
      ${this._getGameViewHtml()}
    `;
  }

  static get properties() {
    return {
      _isCrafting: { type: Boolean },
    };
  }

  _getGameViewHtml() {
    if (this._isCrafting) {
      return html`
        <sc-crafting-area></sc-crafting-area>
        <sc-crafting-parts></sc-crafting-parts>
      `;
    }
    return html`
      <sc-play-area></sc-play-area>
      <sc-player-hand></sc-player-hand>
    `;
  }

  stateChanged(state) {
    this._isCrafting = Selectors.isCrafting(state);
  }
}
