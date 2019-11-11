import { LitElement, css, html } from 'lit-element';
import * as Selector from '../../../state/selectors.js';
import { localStore } from '../../../state/store.js';
import { CARDS } from '../../../../sc-cards-styles.js';
import { ScIconsStyles, DeadIcon } from '../../../../../sc-app/src/components/shared/ScIcons.js';
import { ScCoverFieldCardStyles } from './sc-cover-field-card-styles.js';

export class ScAttackCardCover extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          border: ${CARDS.MINION_COVER.ATTACK_MINION_BORDER};
        }
        [minion-cover-separator] {
          border-bottom: ${CARDS.MINION_COVER.ATTACK_MINION_BORDER};
        }
      `,
      ScIconsStyles,
      ScCoverFieldCardStyles
    ]
  }
  render() {
    return html`
      <div minion-cover-top>${this._getAttackedResultHtml()}</div>
      <div minion-cover-separator></div>
      <div minion-cover-bottom>${this._getAttackerResultHtml()}</div>
    `;
  }

  static get properties() { 
    return {
      attacker: { type: Object },
      attacked: { type: Object }
    }
  }

  _getAttackedResultHtml() {
    let { updatedAttacked, attackedDiscarded } = this._getAttackResult();
    return this._getHealthResultHtml(this.attacked.card.health, updatedAttacked.card.health, attackedDiscarded);
  }

  _getAttackerResultHtml() {
    let { updatedAttacker, attackerDiscarded } = this._getAttackResult();
    return this._getHealthResultHtml(this.attacker.card.health, updatedAttacker.card.health, attackerDiscarded);
  }

  _getAttackResult() {
    let updatedAttacker = this._deepCopy(this.attacker);
    let updatedAttacked = this._deepCopy(this.attacked);
    const state = localStore.getState();
    let cards = Selector.getCards(state);
    let { updatedCards, attackedDiscarded, attackerDiscarded } = CardActions.attackMinion(cards, updatedAttacker, updatedAttacked);
    updatedAttacker = Cards.getUpdatedCard(updatedAttacker, updatedCards);
    updatedAttacked = Cards.getUpdatedCard(updatedAttacked, updatedCards);
    return { updatedAttacker, updatedAttacked, attackedDiscarded, attackerDiscarded };
  }

  _deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  
  _getHealthResultHtml(oldHealth, newHealth, isDiscarded) {
    if (isDiscarded) {
      return DeadIcon();
    }
    return html`${this._getModification(newHealth - oldHealth)} ${HealthIcon()}`;
  }

  _getModification(modifier) {
    if (modifier > 0) {
      return `+${modifier}`;
    }
    return modifier;
  }
}
