import { LitElement, css, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { PlayMinionAttackAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action/player-turn-actions/play-minion-attack-action.js';
import { OpponentMinionActionTarget } from '@shardedcards/sc-types/dist/turn/entities/action-target.js';
import { CARDS } from '../../../../sc-cards-styles.js';
import {
  ScIconsStyles,
  DeadIcon,
  HealthIcon,
} from '../../../../../sc-app/src/components/shared/ScIcons.js';
import { ScCoverFieldCardStyles } from './sc-cover-field-card-styles.js';

export class ScAttackedMinionCover extends LitElement {
  static get styles() {
    return [
      ScIconsStyles,
      ScCoverFieldCardStyles,
      css`
        :host {
          border: ${CARDS.MINION_COVER.ATTACK_MINION_BORDER};
        }
        [minion-cover-separator] {
          border-bottom: ${CARDS.MINION_COVER.ATTACK_MINION_BORDER};
        }
      `,
    ];
  }

  render() {
    return html`
      ${this._getAttackResultHtml()}
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      gameVersion: { type: Number },
      selectedCard: { type: Object },
      fieldSlotIndex: { type: Number },
    };
  }

  _getAttackResultHtml() {
    const targets = [new OpponentMinionActionTarget(this.fieldSlotIndex)];
    const playMinionAttackAction = new PlayMinionAttackAction(
      this.selectedCard.fieldSlotIndex,
      targets,
    );
    const result = playMinionAttackAction.execute(this.game);
    return html`
      <div minion-cover-top>${this._getAttackedResultHtml(result)}</div>
      <div minion-cover-separator></div>
      <div minion-cover-bottom>${this._getAttackerResultHtml(result)}</div>
    `;
  }

  _getAttackedResultHtml(result) {
    const oldCard = this._getTargetCard(this.game);
    const newCard = result.game.getCard(oldCard.hash, oldCard.id);
    const isDiscarded = !ScAttackedMinionCover._sameCard(oldCard, this._getTargetCard(result.game));
    return ScAttackedMinionCover._getHealthResultHtml(oldCard.remainingHealth, newCard.remainingHealth, isDiscarded);
  }

  _getTargetCard(game) {
    return game.dungeon.field[this.fieldSlotIndex].card;
  }

  _getAttackerResultHtml(result) {
    const oldCard = this._getSourceCard(this.game);
    const newCard = result.game.getCard(oldCard.hash, oldCard.id);
    const isDiscarded = !ScAttackedMinionCover._sameCard(oldCard, this._getTargetCard(result.game));
    return ScAttackedMinionCover._getHealthResultHtml(oldCard.remainingHealth, newCard.remainingHealth, isDiscarded);
  }

  _getSourceCard(game) {
    return game.player.field[this.selectedCard.fieldSlotIndex].card;
  }

  static _sameCard(cardA, cardB) {
    if (!cardA || !cardB) {
      return false;
    }
    return cardA.id === cardB.id;
  }

  static _getHealthResultHtml(oldHealth, newHealth, isDiscarded) {
    if (isDiscarded) {
      return DeadIcon();
    }
    return html`
      ${ScAttackedMinionCover._getModification(newHealth - oldHealth)} ${HealthIcon()}
    `;
  }

  static _getModification(modifier) {
    if (modifier > 0) {
      return `+${modifier}`;
    }
    return modifier;
  }
}
