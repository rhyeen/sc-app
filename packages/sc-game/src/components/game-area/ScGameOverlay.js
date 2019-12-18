import { LitElement, css, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { CardType } from '@shardedcards/sc-types/dist/card/enums/card-type.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { NAV } from '../../../sc-game-styles.js';
import { localStore } from '../../state/store.js';

import * as Selectors from '../../state/selectors.js';
import * as CardSelectors from '../../../../sc-cards/src/state/selectors';
import { APP_COLORS } from '../../../../sc-app/sc-app-styles.js';
import { CARD_SOURCES } from '../../../../sc-cards/src/state/state-specifiers.js';

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

  static _validIndex(index) {
    return index || index === 0;
  }

  get _showSelectHandCard() {
    return (
      ScGameOverlay._validIndex(this._selectedCard.handCardIndex) && 
      this._selectedCard.source === CARD_SOURCES.SELECT_PLAYER_HAND_CARD &&
      !this._selectedCard.inPlay
    );
  }

  get _showSelectPlayerFieldSlotCard() {
    return (
      ScGameOverlay._validIndex(this._selectedCard.fieldSlotIndex) && 
      this._selectedCard.source === CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD &&
      !this._selectedCard.inPlay
    );
  }

  get _showSelectDungeonFieldSlotCard() {
    return (
      ScGameOverlay._validIndex(this._selectedCard.fieldSlotIndex) && 
      this._selectedCard.source === CARD_SOURCES.SELECT_DUNGEON_FIELD_SLOT_CARD &&
      !this._selectedCard.inPlay
    );
  }

  get _showUseCardAbility() {
    return (
      (
        ScGameOverlay._validIndex(this._selectedCard.handCardIndex) || 
        ScGameOverlay._validIndex(this._selectedCard.fieldSlotIndex)
      ) && 
      (
        this._selectedCard.source === CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD || 
        (
          this._selectedCard.source === CARD_SOURCES.SELECT_PLAYER_HAND_CARD &&
          this._selectedCard.card.type === CardType.Spell
        )
      ) &&
      this._selectedCard.inPlay
    );
  }

  get _showPlaceMinion() {
    return (
      ScGameOverlay._validIndex(this._selectedCard.handCardIndex) && 
      this._selectedCard.card.type === CardType.Minion &&
      this._selectedCard.source === CARD_SOURCES.SELECT_PLAYER_HAND_CARD &&
      this._selectedCard.inPlay
    );
  }

  _shouldShowOverlay() {
    return this._showSelectHandCard || this._showSelectPlayerFieldSlotCard || this._showSelectDungeonFieldSlotCard || this._showUseCardAbility || this._showPlaceMinion;
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
    if (this._showSelectPlayerFieldSlotCard) {
      return html`
        <sc-select-player-field-slot-card-overlay
          .game=${this.game}
          .selectedCard=${this._selectedCard}></sc-select-player-field-slot-card-overlay>
      `;
    }
    if (this._showSelectDungeonFieldSlotCard) {
      return html`
        <sc-select-dungeon-field-slot-card-overlay
          .selectedCard=${this._selectedCard}></sc-select-dungeon-field-slot-card-overlay>
      `;
    }
    if (this._showUseCardAbility) {
      return html`
        <sc-use-card-ability-overlay
          .selectedCard="${this._selectedCard}"></sc-use-card-ability-overlay>
      `;
    }
    if (this._showPlaceMinion) {
      return html`
        <sc-place-minion-overlay
          .game=${this.game}
          .selectedCard=${this._selectedCard}></sc-place-minion-overlay>
      `;
    }
    return null;
  }

  stateChanged(state) {
    this._showGameMenu = Selectors.isGameMenuOpen(state);
    this._selectedCard = CardSelectors.getSelectedCard(state);
    if (this._shouldShowOverlay()) {
      this.requestUpdate();
    }
  }
}
