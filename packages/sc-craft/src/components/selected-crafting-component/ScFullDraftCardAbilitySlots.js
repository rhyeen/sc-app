import { html, LitElement } from 'lit-element';

export class ScFullDraftCardAbilitySlots extends LitElement {
  render() {
    return html`
      ${this._getSlotsHtml()}
    `;
  }

  static get properties() { 
    return {
      slots: { type: Object }
    }
  }

  _getSlotsHtml() {
    if (!this.slots) {
      return html``;
    }
    return html`
      ${this.slots.map(slot => ScFullDraftCardAbilitySlots._getSlotHtml(slot))}
    `;
  }

  static _getSlotHtml(slot) {
    return html`
      <sc-draft-card-slot-value .slot=${slot}></sc-draft-card-slot-value>
    `;
  }
}
