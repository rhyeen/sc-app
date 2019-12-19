import { html, LitElement } from 'lit-element';
import { Condition } from '../../entities/card-aspects.js';
import { ScIconsStyles } from '../../../../sc-app/src/components/shared/ScIcons.js';
import { ScCardAbilityConditionStyles } from './card-parts-styles.js';

export class ScCardConditionValue extends LitElement {
  static get styles() {
    return [ScIconsStyles, ScCardAbilityConditionStyles];
  }

  render() {
    return html`
      <div card-condition>
        <div class="icon">${this._cardConditionIcon()}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._cardConditionTooltip()}</div>
          <div class="tooltip-description">${this._cardConditionTooltipDescription()}</div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      condition: { type: String },
    };
  }

  _cardConditionTooltip() {
    return html`
      ${Condition.getName(this.condition)}
    `;
  }

  _cardConditionTooltipDescription() {
    return html`
      ${Condition.getDescription(this.condition)}
    `;
  }

  _cardConditionIcon() {
    return html`
      ${Condition.getIcon(this.condition)}
    `;
  }
}
