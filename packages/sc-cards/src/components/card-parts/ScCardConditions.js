import { html, LitElement } from 'lit-element';
import { CardConditionsKey } from '@shardedcards/sc-types/dist/card/enums/card-conditions.js';

export class ScCardConditions extends LitElement {
  render() {
    return html`
      ${this._getConditionsHtml()}
    `;
  }

  static get properties() {
    return {
      conditions: { type: Array },
    };
  }

  _getConditionsHtml() {
    if (!this.conditions) {
      return html``;
    }
    const conditionsHtml = [];
    if (this.conditions.exhausted) {
      conditionsHtml.push(ScCardConditions._getExhaustedConditionHtml());
    }
    return html`
      ${conditionsHtml}
    `;
  }

  static _getExhaustedConditionHtml() {
    return html`
      <sc-card-condition-value .condition=${CardConditionsKey.Exhausted}></sc-card-condition-value>
    `;
  }
}
