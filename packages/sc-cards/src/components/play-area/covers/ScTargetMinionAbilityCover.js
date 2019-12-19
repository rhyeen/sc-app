import { LitElement, css, html } from 'lit-element';
import {
  ScIconsStyles,
  DeadIcon,
  HealthIcon,
  RangeIcon,
} from '../../../../../sc-app/src/components/shared/ScIcons.js';
import { ScCoverFieldCardStyles } from './sc-cover-field-card-styles.js';
import { CARDS } from '../../../../sc-cards-styles.js';
import { Ability } from '../../../entities/card-aspects.js';

export class ScTargetMinionAbilityCover extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          border: var(${CARDS.MINION_COVER.CAST_TARGET_MINION_BORDER});
        }

        [minion-cover-separator] {
          border-bottom: var(${CARDS.MINION_COVER.CAST_TARGET_MINION_BORDER});
        }
      `,
      ScIconsStyles,
      ScCoverFieldCardStyles,
    ];
  }

  render() {
    return html`
      <div minion-cover-top>${this._getTargetResultHtml()}</div>
      <div minion-cover-separator></div>
      <div minion-cover-bottom>${this._getCasterResultHtml()}</div>
    `;
  }

  static get properties() {
    return {
      caster: { type: Object },
      target: { type: Object },
    };
  }

  _getCasterResultHtml() {
    return Ability.getIcon(this.caster.abilityId);
  }

  _getTargetResultHtml() {
    return this.caster;
    // let _caster = this._deepCopy(this.caster);
    // let _target = this._deepCopy(this.target);
    // const state = localStore.getState();
    // const _playerFieldSlots = Selector.getPlayerFieldSlots(state);
    // const _opponentFieldSlots = Selector.getOpponentFieldSlots(state);
    // const cards = Selector.getCards(state);
    // const { updatedCards, opponentFieldSlots } = CardActions.useCardAbility(cards, _target.playAreaIndex, _caster, _playerFieldSlots, _opponentFieldSlots);
    // _caster = Cards.getUpdatedCard(_caster, updatedCards);
    // _target = Cards.getUpdatedCard(_target, updatedCards);
    // switch(this.caster.abilityId) {
    //   case CARD_ABILITIES.SPELLSHOT:
    //     return this.static (this.target.card.health, _target.card.health, opponentFieldSlots[this.target.playAreaIndex]);
    //   case CARD_ABILITIES.REACH:
    //     return this._getRangeResultHtml(this.target.card.range, _target.card.range);
    //   default:
    //     Log.error(`unexpected ability: ${this.caster.abilityId}`);
    //     return html``;
    // }
  }

  static _getHealthResultHtml(oldHealth, newHealth, playAreaSlot) {
    if (!playAreaSlot.id) {
      return DeadIcon();
    }
    return html`
      ${ScTargetMinionAbilityCover._getModification(newHealth - oldHealth)} ${HealthIcon()}
    `;
  }

  static _getRangeResultHtml(oldRange, newRange) {
    return html`
      ${ScTargetMinionAbilityCover._getModification(newRange - oldRange)} ${RangeIcon()}
    `;
  }

  static _getModification(modifier) {
    if (modifier > 0) {
      return `+${modifier}`;
    }
    return modifier;
  }
}
