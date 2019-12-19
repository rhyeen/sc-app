import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { ScIconsStyles } from '../../../../sc-app/src/components/shared/ScIcons.js';

import { Ability } from '../../entities/card-aspects.js';
import { ScCardAbilityConditionStyles } from './card-parts-styles.js';

export class ScCardAbilityValue extends LitElement {
  static get styles() {
    return [ScIconsStyles, ScCardAbilityConditionStyles];
  }

  render() {
    return html`
      <div card-ability class=${this._getCardAbilityClasses()}>
        <div class="icon">${this._cardAbilityIcon()}</div>
        <div class="tooltip">
          <div class="tooltip-title">${this._cardAbilityTooltip()}</div>
          <div class="tooltip-description">${this._cardAbilityTooltipDescription()}</div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      ability: { type: Object },
      modifiedAbility: { type: Object },
    };
  }

  _getCardAbilityClasses() {
    if (!this.ability.id) {
      return classMap({ proposed: true });
    }
    return classMap();
  }

  _cardAbilityTooltip() {
    if (!this.ability.id) {
      return Ability.getName(this.modifiedAbility.id);
    }
    return Ability.getName(this.ability.id);
  }

  _cardAbilityTooltipDescription() {
    if (!this.ability.id) {
      return Ability.getDescription(this.modifiedAbility.id, this.modifiedAbility.amount);
    }
    if (
      this.modifiedAbility &&
      this.modifiedAbility.id &&
      this.modifiedAbility.amount !== this.ability.amount
    ) {
      return Ability.getModifiedDescription(
        this.ability.id,
        this.ability.amount,
        this.modifiedAbility.amount,
      );
    }
    return Ability.getDescription(this.ability.id, this.ability.amount);
  }

  _cardAbilityIcon() {
    if (!this.ability.id) {
      return Ability.getIcon(this.modifiedAbility.id);
    }
    return Ability.getIcon(this.ability.id);
  }
}
