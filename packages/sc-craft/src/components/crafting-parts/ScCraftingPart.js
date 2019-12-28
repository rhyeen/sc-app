import { html, css, LitElement } from 'lit-element';
import { ScIconsStyles} from '../../../../sc-app/src/components/shared/ScIcons.js';
import { ScBtnStyles, SC_BTN_STYLES, SC_BTN_COLORS } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { ScCardAbilityConditionStyles } from '../../../../sc-cards/src/components/card-parts/card-parts-styles.js';
import { Ability, CardStat } from '../../../../sc-cards/src/entities/card-aspects.js';
import { APP_COLORS } from '../../../../sc-app/sc-app-styles.js';

export class ScCraftingPart extends LitElement {
  static get styles() {
    return [
      ScIconsStyles,
      ScCardAbilityConditionStyles,
      ScBtnStyles,
      css`
        button[card-ability] {
          padding: ${SC_BTN_STYLES.BUTTON
            .PADDING}; /* @NOTE: ScCardAbilityConditionStyles resets the padding */
          text-align: left;
          text-transform: none;
          background-color: ${APP_COLORS.ABILITY_CAST};
          color: ${SC_BTN_COLORS.DARK_BTN_TEXT_COLOR};
        }

        [svg-icon] {
          fill: ${SC_BTN_COLORS.DARK_BTN_TEXT_COLOR};
        }

        [card-ability] .tooltip-title {
          font-weight: 500;
        }

        [card-ability] .tooltip-description {
          font-weight: 400;
          color: ${SC_BTN_COLORS.DARK_BTN_TEXT_COLOR};
        }

        [card-ability][disabled] .tooltip-description {
          color: ${SC_BTN_COLORS.DISABLED.TEXT_COLOR};
        }
      `,
    ];
  }

  render() {
    return html`
      <button card-ability ?disabled=${!!this.disabled}>
        <div class="icon">${this._craftingPartIcon()}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._craftingPartTooltip()}</div>
          <div class="tooltip-description">${this._craftingPartTooltipDescription()}</div>
        </div>
      </button>
    `;
  }

  static get properties() { 
    return {
      craftingPart: { type: Object },
      disabled: { type: Boolean },
    }
  }

  _craftingPartTooltip() {
    if (this._isStatCraftingPart()) {
      return html`${CardStat.getName(this.craftingPart.type)}`;
    }
    return html`
      ${Ability.getName(this.craftingPart.ability.id)}
    `;
  }

  _isStatCraftingPart() {
    return !!this.craftingPart.type;
  }

  _craftingPartTooltipDescription() {
    if (this._isStatCraftingPart()) {
      return html`${CardStat.getDescription(this.craftingPart.type, this.craftingPart.amount)}`;
    }
    return html`
      ${Ability.getDescription(this.craftingPart.ability.id, this.craftingPart.ability.amount)}
    `;
  }

  _craftingPartIcon() {
    if (this._isStatCraftingPart()) {
      return html`${CardStat.getIcon(this.craftingPart.type)}`;
    }
    return html`
      ${Ability.getIcon(this.craftingPart.ability.id)}
    `;
  }
}
