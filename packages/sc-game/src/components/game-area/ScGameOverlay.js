import { LitElement, css, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { CardType } from '@shardedcards/sc-types/dist/card/enums/card-type.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { NAV } from '../../../sc-game-styles.js';
import { localStore } from '../../state/store.js';

import * as Selectors from '../../state/selectors.js';
import * as CardSelectors from '../../../../sc-cards/src/state/selectors.js';
import { APP_COLORS } from '../../../../sc-app/sc-app-styles.js';
import {
  SELECTED_CARD_SOURCES,
  SELECTED_CARD_STATES,
} from '../../../../sc-cards/src/state/state-specifiers.js';

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
      gameVersion: { type: Number },
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

  static _validIndex(index) {
    return index || index === 0;
  }

  get _previewHandCard() {
    return (
      ScGameOverlay._validIndex(this._selectedCard.handCardIndex) &&
      this._selectedCard.source === SELECTED_CARD_SOURCES.SELECT_PLAYER_HAND_CARD &&
      this._selectedCard.state === SELECTED_CARD_STATES.PREVIEW
    );
  }

  get _previewPlayerMinion() {
    return (
      ScGameOverlay._validIndex(this._selectedCard.fieldSlotIndex) &&
      this._selectedCard.source === SELECTED_CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD &&
      this._selectedCard.state === SELECTED_CARD_STATES.PREVIEW
    );
  }

  get _previewDungeonMinion() {
    return (
      ScGameOverlay._validIndex(this._selectedCard.fieldSlotIndex) &&
      this._selectedCard.source === SELECTED_CARD_SOURCES.SELECT_DUNGEON_FIELD_SLOT_CARD &&
      this._selectedCard.state === SELECTED_CARD_STATES.PREVIEW
    );
  }

  get _previewCardAbilities() {
    return (
      (ScGameOverlay._validIndex(this._selectedCard.handCardIndex) ||
        ScGameOverlay._validIndex(this._selectedCard.fieldSlotIndex)) &&
      (this._selectedCard.source === SELECTED_CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD ||
        this._selectedCard.source === SELECTED_CARD_SOURCES.SELECT_PLAYER_HAND_CARD) &&
      this._selectedCard.state === SELECTED_CARD_STATES.USE_ABILITIES
    );
  }

  get _placeMinion() {
    return (
      ScGameOverlay._validIndex(this._selectedCard.handCardIndex) &&
      this._selectedCard.card.type === CardType.Minion &&
      this._selectedCard.source === SELECTED_CARD_SOURCES.SELECT_PLAYER_HAND_CARD &&
      this._selectedCard.state === SELECTED_CARD_STATES.TARGET_FIELD
    );
  }

  get _attackMinion() {
    return (
      ScGameOverlay._validIndex(this._selectedCard.fieldSlotIndex) &&
      this._selectedCard.source === SELECTED_CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD &&
      this._selectedCard.state === SELECTED_CARD_STATES.TARGET_FIELD
    );
  }

  _getOverlayInnerHtml() {
    if (this._showGameMenu) {
      return html`
        <sc-game-menu-overlay></sc-game-menu-overlay>
      `;
    }
    if (this._previewHandCard) {
      return html`
        <sc-preview-hand-card-overlay
          .selectedCard=${this._selectedCard}
        ></sc-preview-hand-card-overlay>
      `;
    }
    if (this._previewPlayerMinion) {
      return html`
        <sc-preview-player-minion-overlay
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .selectedCard=${this._selectedCard}
        ></sc-preview-player-minion-overlay>
      `;
    }
    if (this._previewDungeonMinion) {
      return html`
        <sc-preview-dungeon-minion-overlay
          .selectedCard=${this._selectedCard}
        ></sc-preview-dungeon-minion-overlay>
      `;
    }
    if (this._previewCardAbilities) {
      return html`
        <sc-preview-card-abilities-overlay
          .selectedCard="${this._selectedCard}"
        ></sc-preview-card-abilities-overlay>
      `;
    }
    if (this._placeMinion) {
      return html`
        <sc-place-minion-overlay
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .selectedCard=${this._selectedCard}
        ></sc-place-minion-overlay>
      `;
    }
    if (this._attackMinion) {
      return html`
        <sc-attack-minion-overlay
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .selectedCard=${this._selectedCard}
        ></sc-attack-minion-overlay>
      `;
    }
    return null;
  }

  stateChanged(state) {
    this._showGameMenu = Selectors.isGameMenuOpen(state);
    this._selectedCard = CardSelectors.getSelectedCard(state);
    // @NOTE: since update is not down on object property changes, we need to force the update.
    // If there is any state change, likely it is due to selectedCard being updated.
    if (this._selectedCard.source) {
      this.requestUpdate();
    }
  }
}
