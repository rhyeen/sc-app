import { LitElement, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { Log } from 'interface-handler/src/logger.js';

import { localStore } from '../../../state/store.js';
import { attackMinion, placeMinion, previewPlayerFieldSlotCard } from '../../../state/actions.js';
import { SELECTED_CARD_SOURCES, SELECTED_CARD_STATES } from '../../../state/state-specifiers.js';
import { PLAY_FIELD_OWNER } from '../ScPlayField.js';

export class ScCoverFieldCard extends LitElement {
  render() {
    return html`
      ${this._getCardHtml()}
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      gameVersion: { type: Number },
      selectedCard: { type: Object },
      fieldSlotIndex: { type: Number },
      owner: { type: String },
    };
  }

  _getCardHtml() {
    if (this._showSelectedPlayerMinionCover) {
      return this._selectedPlayerMinionCoverHtml();
    }
    if (this._showAttackedMinionCover) {
      return this._attackedMinionCoverHtml();
    }
    if (this._showPlaceMinionCover) {
      return this._placeMinionCoverHtml();
    }
    return html``;
  }

  _getFieldSlotCard() {
    switch (this.owner) {
      case PLAY_FIELD_OWNER.DUNGEON:
        return this.game.dungeon.field[this.fieldSlotIndex].card;
      case PLAY_FIELD_OWNER.PLAYER:
        return this.game.player.field[this.fieldSlotIndex].card;
      default:
        Log.error(`unexpected owner: ${this.owner}`);
        return null;
    }
  }

  _inRangeOfSelectedCard() {
    if (!this._getFieldSlotCard()) {
      return false;
    }
    const validTargetIndices = this.game.getValidPlayerMinionAttackTargets(this.selectedCard.fieldSlotIndex);
    return validTargetIndices.includes(this.fieldSlotIndex);
  }

  _selectedCardExhausted() {
    return this.selectedCard.card.isExhausted();
  }

  get _showPlaceMinionCover() {
    return (
      this.selectedCard.source === SELECTED_CARD_SOURCES.SELECT_PLAYER_HAND_CARD &&
      this.selectedCard.state === SELECTED_CARD_STATES.TARGET_FIELD &&
      this.owner === PLAY_FIELD_OWNER.PLAYER
    );
  }

  _placeMinionCoverHtml() {
    return html`
      <sc-place-minion-cover
        .game=${this.game}
        .gameVersion=${this.gameVersion}
        .selectedCard=${this.selectedCard}
        .fieldSlotIndex=${this.fieldSlotIndex}
        @click=${this._placeMinionCoverClicked}
      ></sc-place-minion-cover>
    `;
  }

  _placeMinionCoverClicked() {
    localStore.dispatch(placeMinion.request(this.fieldSlotIndex));
  }

  get _showAttackedMinionCover() {
    return (
      this.selectedCard.source === SELECTED_CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD &&
      this.selectedCard.state === SELECTED_CARD_STATES.TARGET_FIELD &&
      this.owner === PLAY_FIELD_OWNER.DUNGEON &&
      this._inRangeOfSelectedCard() &&
      !this._selectedCardExhausted()
    );
  }

  _attackedMinionCoverHtml() {
    return html`
      <sc-attacked-minion-cover
        .game=${this.game}
        .gameVersion=${this.gameVersion}
        .selectedCard=${this.selectedCard}
        .fieldSlotIndex=${this.fieldSlotIndex}
        @click=${this._attackedMinionCoverClicked}
      ></sc-attacked-minion-cover>
    `;
  }

  _attackedMinionCoverClicked() {
    localStore.dispatch(attackMinion.request(this.fieldSlotIndex));
  }

  get _showSelectedPlayerMinionCover() {
    return (
      this.selectedCard.source === SELECTED_CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD &&
      this.selectedCard.state === SELECTED_CARD_STATES.TARGET_FIELD &&
      this.owner === PLAY_FIELD_OWNER.PLAYER &&
      this.selectedCard.fieldSlotIndex === this.fieldSlotIndex
    );
  }

  _selectedPlayerMinionCoverHtml() {
    return html`
      <sc-minion-card
        .card=${this.selectedCard.card}
        @click=${ScCoverFieldCard._selectedPlayerMinionCoverClicked}
      ></sc-minion-card>
    `;
  }

  static _selectedPlayerMinionCoverClicked() {
    localStore.dispatch(previewPlayerFieldSlotCard());
  }
}
