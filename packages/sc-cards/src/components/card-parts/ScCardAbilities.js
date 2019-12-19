import { html, LitElement } from 'lit-element';

export class ScCardAbilities extends LitElement {
  render() {
    return html`
      ${this._getAbilitiesHtml()}
    `;
  }

  static get properties() {
    return {
      card: { type: Object },
    };
  }

  _getAbilitiesHtml() {
    if (!this.card.abilities) {
      return html``;
    }
    return html`
      ${this.card.abilities.map(ability => ScCardAbilities._getAbilityHtml(ability))}
    `;
  }

  static _getAbilityHtml(ability) {
    return html`
      <sc-card-ability-value .ability=${ability}></sc-card-ability-value>
    `;
  }
}
