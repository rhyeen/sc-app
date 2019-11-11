import { LitElement, css, html } from 'lit-element';
import { ScIconsStyles, DeadIcon, ShieldIcon } from '../../../../../sc-app/src/components/shared/ScIcons';
import { ScCoverFieldCardStyles } from './sc-cover-field-card-styles';
import { CARDS } from '../../../../sc-cards-styles';

export class ScPlaceMinionCover extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          border: var(${CARDS.MINION_COVER.PLACE_MINION_BORDER});
        }
        [minion-cover-separator] {
          border-bottom: var(${CARDS.MINION_COVER.PLACE_MINION_BORDER});
        }
      `,
      ScIconsStyles,
      ScCoverFieldCardStyles
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
      replacer: { type: Object },
      replaced: { type: Object }
    }
  }

  _getCardSeparatorOpacity() {
    return this._noCardToReplace() ? css`0` : css`1`;
  }

  _noCardToReplace() {
    return !this.replaced || !this.replaced.card;
  }

  _getReplacedResultHtml() {
    return this._noCardToReplace() ? html`` : DeadIcon(); 
  }

  _getReplacerResultHtml() {
    if (this._noCardToReplace()) {
      return this._getShieldResultHtml(0);
    }
    let _replacer = this._deepCopy(this.replacer);
    let _replaced = this._deepCopy(this.replaced);
    let { updatedCards } = CardActions.placeMinion(_replacer, _replaced);
    _replacer = Cards.getUpdatedCard(_replacer, updatedCards);
    _replaced = Cards.getUpdatedCard(_replaced, updatedCards);
    let currentShield = 0;
    if (this.replacer.card.conditions.shield) {
      currentShield = this.replacer.card.conditions.shield;
    }
    let newShield = 0;
    if (_replacer.card.conditions.shield) {
      newShield = _replacer.card.conditions.shield;
    }
    return this._getShieldResultHtml(newShield - currentShield);
  }

  _deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  _getShieldResultHtml(gainedShield) {
    return gainedShield <= 0 ? html`` : html`+${gainedShield} ${ShieldIcon()}`;
  }
}
