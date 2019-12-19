import { html, css, LitElement } from 'lit-element';
import { VALUE_TYPES } from '../../card-parts/ScCardValue.js';
import { CARDS, CardRarityColor } from '../../../../sc-cards-styles.js';

export class ScMinionCard extends LitElement {
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

        [card-title] {
          text-align: center;
        }
      `,
    ];
  }

  render() {
    return html`
      <style>
        :host {
          opacity: ${this._getCardOpacity()};
          background-color: ${CardRarityColor(this.card.rarity)};
        }
      </style>

      <header>
        <div card-title>${this.card.name}</div>
      </header>
      <footer>
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
        <sc-card-value
          valueType=${VALUE_TYPES.SHIELD}
          .card=${this.card}
          stack
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

  _getCardOpacity() {
    return this.card.isExhausted() ? CARDS.MINION.EXHAUSTED_OPACITY_VALUE : css`1`;
  }
}
