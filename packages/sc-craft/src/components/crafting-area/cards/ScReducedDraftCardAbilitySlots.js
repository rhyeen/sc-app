import { html, css, LitElement } from 'lit-element';
import { APP_COLORS } from '../../../../../sc-app/sc-app-styles.js';
import { Localize } from '../../../../../utils/localizer.js';
import { separateSlotsWithAbilities } from '../../../services/slot-separator.js';

export class ScReducedDraftCardAbilitySlots extends LitElement {
  static get styles() {
    return [
      css`
        .reduced-overview {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .abilities-slots-break {
          width: 100%;
          margin-top: 5px;
          border-bottom: 1px dashed ${APP_COLORS.HINT_GRAY};
          margin-bottom: 5px;
        }

        .abilities-overview {
          font-size: 16px;
        }

        .slots-overview {
          font-size: 13px;
        }
      `
    ];
  }

  render() {
    return html`
      ${this._getHtml()}
    `;
  }

  static get properties() { 
    return {
      slots: { type: Array }
    }
  }

  _getHtml() {
    const { slotsWithAbilities , slotsWithoutAbilities } = separateSlotsWithAbilities(this.slots);
    let abilitiesOverviewHtml = html``;
    let abilityAndSlotBreak = html``;
    let slotsOverviewHtml = html``;
    if (slotsWithAbilities.length) {
      abilitiesOverviewHtml = html`
        <div class="abilities-overview">${Localize.localeMap.SC_CRAFT.CRAFTING_CARD_SLOTS.ABILITY_COUNT(slotsWithAbilities.length)}</div>
      `;
    }
    if (slotsWithAbilities.length && slotsWithoutAbilities.length) {
      abilityAndSlotBreak = html`<div class="abilities-slots-break"></div>`;
    }
    if (slotsWithoutAbilities.length) {
      slotsOverviewHtml = html`
        <div class="slots-overview">${Localize.localeMap.SC_CRAFT.CRAFTING_CARD_SLOTS.SLOT_COUNT(slotsWithoutAbilities.length)}</div>
      `;
    }
    return html`
      <div class="reduced-overview">
        ${abilitiesOverviewHtml}
        ${abilityAndSlotBreak}
        ${slotsOverviewHtml}
      </div>
    `;
  }
}
