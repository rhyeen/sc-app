import { html, LitElement } from 'lit-element';

export class ScFullDraftCardAbilitySlots extends LitElement {
  render() {
    return html`
      ${this._getSlotsHtml()}
    `;
  }

  static get properties() {
    return {
      slots: { type: Array },
      modifiedSlots: { type: Array },
    };
  }

  _getSlotsHtml() {
    if (!this.slots) {
      return html``;
    }
    const result = [];
    for (let i = 0; i < this.slots.length; i += 1) {
      const modifiedSlot = this.modifiedSlots ? this.modifiedSlots[i] : null;
      result.push(ScFullDraftCardAbilitySlots._getSlotHtml(this.slots[i], modifiedSlot));
    }
    return result;
  }

  static _getSlotHtml(slot, modifiedSlot) {
    return html`
      <sc-draft-card-slot-value
        .slot=${slot}
        .modifiedSlot=${modifiedSlot}
      ></sc-draft-card-slot-value>
    `;
  }
}
