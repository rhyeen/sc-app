import { html, css, LitElement } from 'lit-element';
import { CardType } from '@shardedcards/sc-types/dist/card/enums/card-type.js';
import { CardRarityColor } from '../../../../sc-cards/sc-cards-styles.js';
import { VALUE_TYPES } from '../../../../sc-cards/src/components/card-parts/ScCardValue.js';
import { ScFullCardStyles } from '../../../../sc-cards/src/components/selected-card/ScFullCard.js';

export class ScFullDraftCard extends LitElement {
  static get styles() {
    return [
      ScFullCardStyles
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
        <sc-card-value valueType=${VALUE_TYPES.COST} .card=${this.card} .modifiedCard=${this.modifiedCard}></sc-card-value>
        <div card-name>${this.card.name}</div>
      </header>
      <section>
        <sc-full-draft-card-ability-slots .slots=${this.card.slots} .modifiedSlots=${this.modifiedCardSlots}></sc-full-draft-card-ability-slots>
      </section>
      <footer>
        ${this._getFooterHtml()}
      </footer>
    `;
  }

  static get properties() {
    return {
      card: { type: Object },
      modifiedCard: { type: Object }
    };
  }

  get modifiedCardSlots() {
    return this.modifiedCard ? this.modifiedCard.slots : null;
  }

  _getFooterHtml() {
    if (this.card.type === CardType.Minion) {
      return html`
        <div class="footer-left">
          <sc-card-value valueType=${VALUE_TYPES.RANGE} .card=${this.card} .modifiedCard=${this.modifiedCard}></sc-card-value>
          <sc-card-value valueType=${VALUE_TYPES.ATTACK} .card=${this.card} .modifiedCard=${this.modifiedCard}></sc-card-value>
        </div>
        <div class="footer-right">
          <sc-card-value valueType=${VALUE_TYPES.HEALTH} .card=${this.card} .modifiedCard=${this.modifiedCard}></sc-card-value>
        </div>
      `;
    }
    return html``;
  }
}
