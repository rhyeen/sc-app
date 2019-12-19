import { LitElement, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { Log } from 'interface-handler/src/logger.js';

import { localStore } from '../../../state/store.js';
import { attackMinion, placeMinion, previewPlayerFieldSlotCard } from '../../../state/actions.js';
import { CARD_SOURCES, SELECTED_CARD_STATES } from '../../../state/state-specifiers.js';
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
    // if (this._showTargetOpponentMinionAbilityCover()) {
    //   return this._targetOpponentMinionAbilityCover();
    // }
    // if (this._showTargetPlayerMinionAbilityCover()) {
    //   return this._targetPlayerMinionAbilityCover();
    // }
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
    return (
      this.fieldSlotIndex in
      this.game.getValidPlayerMinionAttackTargets(this.selectedCard.fieldSlotIndex)
    );
  }

  _selectedCardExhausted() {
    return this.selectedCard.card.isExhausted();
  }

  get _showPlaceMinionCover() {
    return (
      this.selectedCard.source === CARD_SOURCES.SELECT_PLAYER_HAND_CARD &&
      this.selectedCard.state &&
      SELECTED_CARD_STATES.TARGET_FIELD &&
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
      this.selectedCard.source === CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD &&
      this.selectedCard.state &&
      SELECTED_CARD_STATES.TARGET_FIELD &&
      this.owner === PLAY_FIELD_OWNER.OPPONENT &&
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
      this.selectedCard.source === CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD &&
      this.selectedCard.state &&
      SELECTED_CARD_STATES.TARGET_FIELD &&
      this.owner === PLAY_FIELD_OWNER.PLAYER &&
      this.selectedCard.fieldSlotIndex === this.fieldSlotIndex
    );
  }

  _selectedPlayerMinionCoverHtml() {
    return html`
      <sc-minion-card
        .card="${this.selectedCard.card}"
        @click="${ScCoverFieldCard._selectedPlayerMinionCoverClicked}"
      ></sc-minion-card>
    `;
  }

  static _selectedPlayerMinionCoverClicked() {
    localStore.dispatch(previewPlayerFieldSlotCard());
  }

  // _fieldSlotHasCard() {
  //   return !!this.fieldSlot.card;
  // }

  // _targetedCardInRange() {
  //   return AttackTargets.canAttackFieldSlotCard(this.selectedCard.card, this.selectedCard.playAreaIndex, this.fieldSlot.card, this.fieldSlot.playAreaIndex);
  // }

  // _selectedCardExhausted() {
  //   return this.selectedCard.card.isExhausted();
  // }

  // _selectedCardInThisFieldSlot() {
  //   return this.selectedCard.playAreaIndex === this.fieldSlot.playAreaIndex;
  // }

  // _usingAbilityOnOpponentMinion() {
  //   return (
  //     this._usingAbility()
  //     && this.selectedCard.targets === CARD_TARGETS.OPPONENT_MINION
  //   );
  // }

  // _usingAbilityOnPlayerMinion() {
  //   return (
  //     this._usingAbility()
  //     && this.selectedCard.targets === CARD_TARGETS.PLAYER_MINION
  //   );
  // }

  // _usingAbility() {
  //   return (
  //     this.selectedCard.source === CARD_SOURCES.CAST_PLAYER_SPELL
  //     || this.selectedCard.source === CARD_SOURCES.PLAY_PLAYER_MINION
  //   );
  // }

  // _showSelectedPlayerMinion() {
  //   return (
  //     this.selectedCard.source === CARD_SOURCES.SELECT_PLAYER_MINION
  //     && this.owner === PLAY_FIELD_OWNER.PLAYER
  //     && this._selectedCardInThisFieldSlot()
  //   );
  // }

  // _showTargetOpponentMinionAbilityCover() {
  //   return (
  //     this._fieldSlotHasCard()
  //     && this._usingAbilityOnOpponentMinion()
  //     && this.owner === PLAY_FIELD_OWNER.OPPONENT
  //   );
  // }

  // _showTargetPlayerMinionAbilityCover() {
  //   return (
  //     this._fieldSlotHasCard()
  //     && this._usingAbilityOnPlayerMinion()
  //     && this.owner === PLAY_FIELD_OWNER.PLAYER
  //   );
  // }

  // _attackCardCover() {
  //   return html`
  //     <sc-attack-card-cover
  //         .game=${this.game}
  //             .gameVersion=${this.gameVersion}
  //         .attacker=${this.selectedCard}
  //         .attacked=${this.fieldSlot}
  //         @click=${this._attackCardCoverClicked}></sc-attack-card-cover>
  //   `;
  // }

  // _attackCardCoverClicked() {
  //   localStore.dispatch(attackMinion.request(this.fieldSlot.playAreaIndex));
  // }

  // _selectedPlayerMinion() {
  //   return html`
  //     <sc-minion-card
  //         .game=${this.game}
  // .gameVersion=${this.gameVersion}
  //         .card=${this.selectedCard.card}
  //         @click=${ScCoverFieldCard._selectedPlayerMinionClicked}></sc-minion-card>
  //   `;
  // }

  // static _selectedPlayerMinionClicked() {
  //   localStore.dispatch(playPlayerMinion());
  // }

  // _placeMinionCover() {
  //   return html`
  //     <sc-attacked-minion-cover
  //         .game=${this.game}
  // .gameVersion=${this.gameVersion}
  //         .replacer=${this.selectedCard}
  //         .replaced=${this.fieldSlot}
  //         @click=${this._placeMinionCoverClicked}></sc-attacked-minion-cover>
  //   `;
  // }

  // _placeMinionCoverClicked() {
  //   localStore.dispatch(placeMinion.request(this.fieldSlot.playAreaIndex));
  // }

  // _targetOpponentMinionAbilityCover() {
  //   return html`
  //     <sc-target-minion-ability-cover
  //         .game=${this.game}
  // .gameVersion=${this.gameVersion}
  //         .caster=${this.selectedCard}
  //         .target=${this.fieldSlot}
  //         @click=${this._targetOpponentMinionAbilityCoverClicked}></sc-target-minion-ability-cover>
  //   `;
  // }

  // _targetOpponentMinionAbilityCoverClicked() {
  //   localStore.dispatch(useCardAbility.request(this.fieldSlot.playAreaIndex));
  // }

  // _targetPlayerMinionAbilityCover() {
  //   return html`
  //     <sc-target-minion-ability-cover
  //         .game=${this.game}
  // .gameVersion=${this.gameVersion}
  //         .caster=${this.selectedCard}
  //         .target=${this.fieldSlot}
  //         @click=${this._targetPlayerMinionAbilityCoverClicked}></sc-target-minion-ability-cover>
  //   `;
  // }

  // _targetPlayerMinionAbilityCoverClicked() {
  //   localStore.dispatch(useCardAbility.request(this.fieldSlot.playAreaIndex));
  // }
}
