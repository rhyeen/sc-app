import { html, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { Log } from 'interface-handler/src/logger.js';
import { selectDungeonFieldSlotCard, selectPlayerFieldSlotCard } from '../../../state/actions.js';
import { PLAY_FIELD_OWNER } from '../ScPlayField.js';
import { localStore } from '../../../state/store.js';

export class ScMinionFieldSlot extends LitElement {
  render() {
    return html`
      ${this._getCardHtml()}
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      fieldSlotIndex: { type: Number },
      owner: { type: String },
    };
  }

  _getCardHtml() {
    if (!this._getFieldSlotCard()) {
      return html``;
    }
    switch (this.owner) {
      case PLAY_FIELD_OWNER.DUNGEON:
        return this._opponentMinion();
      case PLAY_FIELD_OWNER.PLAYER:
        return this._playerMinion();
      default:
        Log.error(`unexpected owner: ${this.owner}`);
        return html``;
    }
  }

  _getFieldSlotCard() {
    switch (this.owner) {
      case PLAY_FIELD_OWNER.DUNGEON:
        return this.game.dungeon.field[this.fieldSlotIndex].card;
      case PLAY_FIELD_OWNER.PLAYER:
        return this.game.player.field[this.fieldSlotIndex].card;
      default:
        Log.error(`unexpected owner: ${this.owner}`);
        return html``;
    }
  }

  _opponentMinion() {
    return html`
      <sc-minion-card
        .card="${this._getFieldSlotCard()}"
        @click="${this._opponentMinionClicked}"
      ></sc-minion-card>
    `;
  }

  _opponentMinionClicked() {
    const card = this._getFieldSlotCard();
    localStore.dispatch(selectDungeonFieldSlotCard(this.fieldSlotIndex));
  }

  _playerMinion() {
    return html`
      <sc-minion-card
        .card="${this._getFieldSlotCard()}"
        @click="${this._playerMinionClicked}"
      ></sc-minion-card>
    `;
  }

  _playerMinionClicked() {
    const card = this._getFieldSlotCard();
    localStore.dispatch(selectPlayerFieldSlotCard(this.fieldSlotIndex));
  }
}
