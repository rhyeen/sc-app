import { html, LitElement } from 'lit-element';
import { CardConditionsKey } from '@shardedcards/sc-types/dist/card/enums/card-conditions.js';

export class ScCardConditions extends LitElement {
  render() {
    return html`${this._getConditionsHtml()}`;
  }

  static get properties() { 
    return {
      card: { type: Object }
    }
  }

  _getConditionsHtml() {
    if (!this.card.conditions) {
      return html``;
    }
    const conditionsHtml = [];
    if (this.card.conditions.exhausted) {
      conditionsHtml.push(this._getExhaustedConditionHtml());
    }
    return html`${conditionsHtml}`;
  }

  _getExhaustedConditionHtml() {
    return html`
      <sc-card-condition-value .condition=${CardConditionsKey.Exhausted}></sc-card-condition-value>`;
  }
}

