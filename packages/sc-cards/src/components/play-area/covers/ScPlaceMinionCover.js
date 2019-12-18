import { LitElement, css, html } from 'lit-element';
import { Log } from 'interface-handler/src/logger.js';
import { ScIconsStyles, DeadIcon, ShieldIcon } from '../../../../../sc-app/src/components/shared/ScIcons.js';
import { ScCoverFieldCardStyles } from './sc-cover-field-card-styles.js';
import { CARDS } from '../../../../sc-cards-styles.js';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game';
import { PLAY_FIELD_OWNER } from '../ScPlayField.js';

export class ScPlaceMinionCover extends LitElement {
  static get styles() {
    return [
      ScIconsStyles,
      ScCoverFieldCardStyles,
      css`
        :host {
          border: ${CARDS.MINION_COVER.PLACE_MINION_BORDER};
        }
        [minion-cover-separator] {
          border-bottom: ${CARDS.MINION_COVER.PLACE_MINION_BORDER};
        }
      `
    ]
  }

  render() {
    return html`
      <style>
        [minion-cover-separator] {
          opacity: ${this._getCardSeparatorOpacity()};
        }
      </style>
      <div minion-cover-top>${this._getReplacedResultHtml()}</div>
      <div minion-cover-separator></div>
      <div minion-cover-bottom>${this._getReplacerResultHtml()}</div>
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      selectedCard: { type: Object },
      fieldSlotIndex: { type: Number },
    }
  }

  _getFieldSlotCard() {
    return this.game.player.field[this.fieldSlotIndex].card;
  }

  _getCardSeparatorOpacity() {
    return this._noCardToReplace() ? css`0` : css`1`;
  }

  _noCardToReplace() {
    return !this._getFieldSlotCard();
  }

  _getReplacedResultHtml() {
    return this._noCardToReplace() ? html`` : DeadIcon();
  }

  _getReplacerResultHtml() {
    if (this._noCardToReplace()) {
      return this._getShieldResultHtml(0);
    }
    // @TODO: handle processing of sheild gain.
    return this._getShieldResultHtml(42);
  }

  _getShieldResultHtml(gainedShield) {
    return gainedShield <= 0 ? html`` : html`+${gainedShield} ${ShieldIcon()}`;
  }
}
