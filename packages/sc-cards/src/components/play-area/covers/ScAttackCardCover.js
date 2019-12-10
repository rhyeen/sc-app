import { LitElement, css, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { PlayMinionAttackAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action/play-minion-attack-action.js';
import { CARDS } from '../../../../sc-cards-styles.js';
import { ScIconsStyles, DeadIcon, HealthIcon } from '../../../../../sc-app/src/components/shared/ScIcons.js';
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
      ${this._getAttackResultHtml()}
    `;
  }

  static get properties() { 
    return {
      game: { type: Game },
      playMinionAttackAction: { type: PlayMinionAttackAction },
      actionTargetIndex: { type: Number }
    }
  }

  _getAttackResultHtml() {
    const result = this.playMinionAttackAction.execute(this.game);
    return html`
      <div minion-cover-top>${this._getAttackedResultHtml(result)}</div>
      <div minion-cover-separator></div>
      <div minion-cover-bottom>${this._getAttackerResultHtml(result)}</div>
    `;
  }

  _getAttackedResultHtml(result) {
    const oldCard = this._getTargetCard(this.game);
    const newCard = result.game.getCard(oldCard.hash, oldCard.id);
    const isDiscarded = !ScAttackCardCover._sameCard(oldCard, this._getTargetCard(result.game));
    return this._getHealthResultHtml(oldCard.health, newCard.health, isDiscarded);
  }

  _getTargetCard(game) {
    const fieldIndex = this.playMinionAttackAction.targets[this.actionTargetIndex].targetOpponentFieldIndex;
    return game.dungeon.field[fieldIndex].card;
  }

  _getAttackerResultHtml(result) {
    const oldCard = this._getSourceCard(this.game);
    const newCard = result.game.getCard(oldCard.hash, oldCard.id);
    const isDiscarded = !ScAttackCardCover._sameCard(oldCard, this._getTargetCard(result.game));
    return this._getHealthResultHtml(oldCard.health, newCard.health, isDiscarded);
  }

  _getSourceCard(game) {
    const fieldIndex = this.playMinionAttackAction.playerSourceFieldIndex;
    return game.player.field[fieldIndex].card;
  }

  static _sameCard(cardA, cardB) {
    if (!cardA || !cardB) {
      return false;
    }
    return cardA.id === cardB.id;
  }

  _getHealthResultHtml(oldHealth, newHealth, isDiscarded) {
    if (isDiscarded) {
      return DeadIcon();
    }
    return html`${ScAttackCardCover._getModification(newHealth - oldHealth)} ${HealthIcon()}`;
  }

  static _getModification(modifier) {
    if (modifier > 0) {
      return `+${modifier}`;
    }
    return modifier;
  }
}
