import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { ScIconsStyles, EmptySlotIcon } from '../../../../sc-app/src/components/shared/ScIcons.js';

import { ScCardAbilityConditionStyles } from '../../../../sc-cards/src/components/card-parts/card-parts-styles.js';
import { Localize } from '../../../../utils/localizer.js';

export class ScDraftCardSlotValue extends LitElement {
  static get styles() {
    return [ScIconsStyles, ScCardAbilityConditionStyles];
  }

  render() {
    return html`
      ${this._getHtml()}
    `;
  }

  static get properties() {
    return {
      slot: { type: Object },
    };
  }

  _getHtml() {
    if (this.slot.isFilled()) {
      return html`<sc-card-abilitiy-value .ability=${this.slot.ability}></sc-card-abilitiy-value>`;
    }
    return html`
      <div card-ability>
        <div class="icon">${EmptySlotIcon()}</div>
        <div class="tooltip">
          <div class="tooltip-title">${Localize.localeMap.SC_CRAFT.CRAFTING_CARD_SLOT_VALUE.TITLE}</div>
          <div class="tooltip-description">${Localize.localeMap.SC_CRAFT.CRAFTING_CARD_SLOT_VALUE.DESCRIPTION}</div>
        </div>
      </div>
    `;
  }
}
