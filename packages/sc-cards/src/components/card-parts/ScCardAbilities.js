import { html, LitElement } from 'lit-element';

export class ScCardAbilities extends LitElement {
  render() {
    return html`
      ${this._getAbilitiesHtml()}
    `;
  }

  static get properties() {
    return {
      abilities: { type: Array },
    };
  }

  _getAbilitiesHtml() {
    if (!this.abilities) {
      return html``;
    }
    return html`
      ${this.abilities.map(ability => ScCardAbilities._getAbilityHtml(ability))}
    `;
  }

  static _getAbilityHtml(ability) {
    return html`
      <sc-card-ability-value .ability=${ability}></sc-card-ability-value>
    `;
  }
}
