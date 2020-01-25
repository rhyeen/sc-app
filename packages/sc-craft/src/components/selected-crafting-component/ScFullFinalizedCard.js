import { html, css, LitElement } from 'lit-element';
import { CardType } from '@shardedcards/sc-types/dist/card/enums/card-type.js';
import { CardOrigin } from '@shardedcards/sc-types/dist/card/entities/card-origin/card-origin.js';
import { CardRarityColor } from '../../../../sc-cards/sc-cards-styles';
import { VALUE_TYPES } from '../../../../sc-cards/src/components/card-parts/ScCardValue.js';
import { ScFullCardStyles } from '../../../../sc-cards/src/components/selected-card/ScFullCard.js';

export class ScFullFinalizedCard extends LitElement {
  static get styles() {
    return [
      ScFullCardStyles,
      css`
        sc-dropdown {
          flex: 1;
        }
      `
    ];
  }

  render() {
    return html`
      <style>
        :host {
          border-color: ${CardRarityColor(this.card.rarity)} !important;
        }
      </style>
      <header>
        <sc-card-value valueType="${VALUE_TYPES.COST}" .card="${this.card}"></sc-card-value>
        ${this._getNameContextHtml()}
      </header>
      <section>
        <sc-card-abilities .abilities="${this.card.abilities}"></sc-card-abilities>
        <sc-card-conditions .conditions="${this.card.conditions}"></sc-card-conditions>
      </section>
      <footer>
        ${this._getFooterHtml()}
      </footer>
    `;
  }

  static get properties() {
    return {
      card: { type: Object },
      possibleNames: { type: Array },
      cardOrigin: { type: CardOrigin },
    };
  }

  _getFooterHtml() {
    if (this.card.type === CardType.Minion) {
      return html`
        <div class="footer-left">
          <sc-card-value valueType="${VALUE_TYPES.RANGE}" .card="${this.card}"></sc-card-value>
          <sc-card-value valueType="${VALUE_TYPES.ATTACK}" .card="${this.card}"></sc-card-value>
        </div>
        <div class="footer-right">
          <sc-card-value valueType="${VALUE_TYPES.HEALTH}" .card="${this.card}"></sc-card-value>
        </div>
      `;
    }
    return html``;
  }

  _getNameContextHtml() {
    if (this.cardOrigin) {
      return html`<div card-name>${this.cardOrigin.name}</div>`;
    }
    return html`
      <sc-dropdown
        .items=${this.possibleNames}
        @select-item=${this._selectName}
        .loading=${!this.possibleNames || !this.possibleNames.length}
        itemLabelKey="name"
        wrapSelected></sc-dropdown>
    `;
  }

  _selectName(event) {
    const newEvent = new CustomEvent('select-name', {
      detail: {
        name: event.detail.item
      }
    });
    this.dispatchEvent(newEvent);
  }
}
