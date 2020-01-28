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
      modifiedSlot: { type: Object }
    };
  }

  _getHtml() {
    if (this._wasFilled()) {
      return this._getSlotHtml(this.modifiedSlot, true, false);
    }
    if (this._wasModified()) {
      return this._getSlotHtml(this.modifiedSlot, false, true);
    }
    return this._getSlotHtml(this.slot, false, false);
  }

  _getHtml() {
    if (this._hasAbility()) {
      return html`
        <sc-card-ability-value
          .ability=${this.slot ? this.slot.ability : null}
          .modifiedAbility=${this.modifiedSlot ? this.modifiedSlot.ability : null}></sc-card-ability-value>
      `;
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

  _hasAbility() {
    if (this.slot && this.slot.isFilled()) {
      return true;
    }
    if (this.modifiedSlot && this.modifiedSlot.isFilled()) {
      return true;
    }
    return false;
  }
}
