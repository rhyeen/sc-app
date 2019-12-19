import { html, css, LitElement } from 'lit-element';
import { CARDS, CardRarityColor } from '../../../sc-cards-styles.js';
import { VALUE_TYPES } from '../card-parts/ScCardValue.js';

export class ScFullCard extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          width: ${CARDS.FULL.WIDTH};
          height: ${CARDS.FULL.HEIGHT};
          background-color: ${CARDS.FULL.BACKGROUND_COLOR};
          box-shadow: ${CARDS.FULL.ELEVATION};
          border-radius: ${CARDS.FULL.BORDER_RADIUS};
          border: ${CARDS.FULL.BORDER};
          padding: ${CARDS.FULL.PADDING};
        }

        header,
        footer {
          display: flex;
          align-items: center;
        }

        footer {
          justify-content: space-between;
        }

        .footer-left,
        .footer-right {
          display: flex;
          align-items: center;
        }

        sc-card-value:first-child {
          margin-left: 0px;
        }

        sc-card-value {
          margin-left: 10px;
        }

        [card-name] {
          text-align: center;
          margin-left: 10px;
        }

        sc-card-conditions {
          margin-top: 20px;
          display: block;
        }
      `,
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
        <div card-name>${this.card.name}</div>
      </header>
      <section>
        <sc-card-abilities .card="${this.card}"></sc-card-abilities>
        <sc-card-conditions .card="${this.card}"></sc-card-conditions>
      </section>
      <footer>
        <div class="footer-left">
          <sc-card-value valueType="${VALUE_TYPES.RANGE}" .card="${this.card}"></sc-card-value>
          <sc-card-value valueType="${VALUE_TYPES.ATTACK}" .card="${this.card}"></sc-card-value>
        </div>
        <div class="footer-right">
          <sc-card-value valueType="${VALUE_TYPES.HEALTH}" .card="${this.card}"></sc-card-value>
          <sc-card-value valueType="${VALUE_TYPES.SHIELD}" .card="${this.card}"></sc-card-value>
        </div>
      </footer>
    `;
  }

  static get properties() {
    return {
      card: { type: Object },
    };
  }
}
