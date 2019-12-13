import { html, LitElement, css } from 'lit-element';
import { CARDS, CardRarityColor } from '../../../sc-cards-styles.js';
import { VALUE_TYPES } from '../card-parts/ScCardValue.js';

export class ScPlayerHandCard extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          max-width: calc(${CARDS.HAND.WIDTH} - 2*${CARDS.HAND.PADDING});
          line-height: ${CARDS.HAND.HEIGHT};
          box-shadow: ${CARDS.HAND.ELEVATION};
          border-top-left-radius: ${CARDS.HAND.BORDER_RADIUS};
          border-top-right-radius: ${CARDS.HAND.BORDER_RADIUS};
          padding: 0 ${CARDS.HAND.PADDING};
        }

        header,
        footer {
          height: ${CARDS.HAND.HEIGHT});
          display: flex;
          align-items: center;
        }

        sc-card-value:first-child {
          margin-left: 0px;
        }

        sc-card-value {
          margin-left: 5px;
        }

        [card-name] {
          margin-left: 10px;
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
        <div card-name>${this.card.name}</div>
      </header>
      <footer>
        <sc-card-value
          valueType=${VALUE_TYPES.RANGE}
          .card=${this.card}
          reduced
        ></sc-card-value>
        <sc-card-value
          valueType=${VALUE_TYPES.ATTACK}
          .card=${this.card}
          reduced
        ></sc-card-value>
        <sc-card-value
          valueType=${VALUE_TYPES.HEALTH}
          .card=${this.card}
          reduced
        ></sc-card-value>
      </footer>
    `;
  }

  static get properties() {
    return {
      card: { type: Object },
    };
  }
}
