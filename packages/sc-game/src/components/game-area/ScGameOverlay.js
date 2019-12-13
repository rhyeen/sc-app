import { LitElement, css, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { NAV } from '../../../sc-game-styles.js';
import { localStore } from '../../state/store.js';

import * as Selectors from '../../state/selectors.js';
import * as CardSelectors from '../../../../sc-cards/src/state/selectors';
import { APP_COLORS } from '../../../../sc-app/sc-app-styles.js';

export class ScGameOverlay extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        .overlay {
          display: flex;
          justify-content: center;
          position: fixed;
          top: 0;
          width: 100vw;
          height: calc(100vh - ${NAV.HEADER.HEIGHT} - ${NAV.FOOTER.HEIGHT});
          background-color: ${APP_COLORS.OVERLAY_WHITE};
          z-index: 1;
          padding: ${NAV.HEADER.HEIGHT} 0 ${NAV.FOOTER.HEIGHT} 0;
        }
      `,
    ];
  }

  render() {
    return html`
      ${this._getOverlayHtml()}
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      _showGameMenu: { type: Boolean },
      _selectedCard: { type: Object },
    };
  }

  _getOverlayHtml() {
    const overlayInnerHtml = this._getOverlayInnerHtml();
    if (overlayInnerHtml) {
      return html`
        <div class="overlay">${overlayInnerHtml}</div>
      `;
    }
    return html``;
  }

  get _showSelectHandCard() {
    return this._selectedCard.handCardIndex || this._selectedCard.handCardIndex === 0;
  }

  _getOverlayInnerHtml() {
    if (this._showGameMenu) {
      return html`
        <sc-game-menu-overlay></sc-game-menu-overlay>
      `;
    }
    if (this._showSelectHandCard) {
      return html`
        <sc-select-hand-card-overlay
          .selectedCard=${this._selectedCard}></sc-select-hand-card-overlay>
      `;
    }
    return null;
  }

  stateChanged(state) {
    this._showGameMenu = Selectors.isGameMenuOpen(state);
    this._selectedCard = CardSelectors.getSelectedCard(state);
  }
}
