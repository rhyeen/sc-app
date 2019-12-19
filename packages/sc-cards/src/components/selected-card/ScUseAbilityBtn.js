import { html, css, LitElement } from 'lit-element';
import { ScIconsStyles } from '../../../../sc-app/src/components/shared/ScIcons.js';
import {
  SC_BTN_COLORS,
  ScBtnStyles,
  SC_BTN_STYLES,
} from '../../../../sc-app/src/components/shared/ScBtn.js';
import { APP_COLORS } from '../../../../sc-app/sc-app-styles.js';
import { Ability } from '../../entities/card-aspects.js';
import { ScCardAbilityConditionStyles } from '../card-parts/card-parts-styles.js';

export class ScUseAbilityBtn extends LitElement {
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
      <button card-ability ?disabled=${!!this.ability.used}>
        <div class="icon">${this._cardAbilityIcon()}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._cardAbilityTooltip()}</div>
          <div class="tooltip-description">${this._cardAbilityTooltipDescription()}</div>
        </div>
      </button>
    `;
  }

  static get properties() {
    return {
      ability: { type: Object },
    };
  }

  _cardAbilityTooltip() {
    return html`
      ${Ability.getName(this.ability.id)}
    `;
  }

  _cardAbilityTooltipDescription() {
    return html`
      ${Ability.getDescription(this.ability.id, this.ability.amount)}
    `;
  }

  _cardAbilityIcon() {
    return html`
      ${Ability.getIcon(this.ability.id)}
    `;
  }
}
