import { html, css, LitElement } from 'lit-element';
import { CardType } from '@shardedcards/sc-types/dist/card/enums/card-type.js';
import { CARDS, CardRarityColor } from '../../../../../sc-cards/sc-cards-styles.js';
import { VALUE_TYPES } from '../../../../../sc-cards/src/components/card-parts/ScCardValue.js';

export class ScReducedDraftCard extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          width: calc(${CARDS.MINION.WIDTH} - 2 * ${CARDS.MINION.PADDING});
          height: calc(${CARDS.MINION.HEIGHT} - 2 * ${CARDS.MINION.PADDING});
          box-shadow: ${CARDS.MINION.ELEVATION};
          border-radius: ${CARDS.MINION.BORDER_RADIUS};
          padding: ${CARDS.MINION.PADDING};
        }

        header,
        footer {
          display: flex;
          align-items: center;
        }

        footer {
          justify-content: center;
        }

        sc-card-value:first-child {
          margin-left: 0px;
        }

        sc-card-value {
          margin-left: 5px;
        }
      `,
    ];
  }

  render() {
    return html`
      <style>
        :host {
          background-color: ${CardRarityColor(this.card.rarity)};
        }
      </style>

      <header>
        <sc-card-value valueType=${VALUE_TYPES.COST} .card=${this.card} reduced></sc-card-value>
      </header>
      <sc-reduced-draft-card-ability-slots
        .slots=${this.card.slots}
      ></sc-reduced-draft-card-ability-slots>
      <footer>
        ${this._getFooterHtml()}
      </footer>
    `;
  }

  static get properties() {
    return {
      card: { type: Object },
    };
  }

  _getFooterHtml() {
    if (this.card.type === CardType.Minion) {
      return html`
        <sc-card-value
          valueType=${VALUE_TYPES.RANGE}
          .card=${this.card}
          stack
          reduced
        ></sc-card-value>
        <sc-card-value
          valueType=${VALUE_TYPES.ATTACK}
          .card=${this.card}
          stack
          reduced
        ></sc-card-value>
        <sc-card-value
          valueType=${VALUE_TYPES.HEALTH}
          .card=${this.card}
          stack
          reduced
        ></sc-card-value>
      `;
    }
    return html``;
  }
}
