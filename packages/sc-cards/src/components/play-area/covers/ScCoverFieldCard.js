import { LitElement, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { AttackTargets } from '@shardedcards/sc-types/dist/turn/services/attack-targets.js';

import { localStore } from '../../../state/store.js';
import { 
  attackMinion,
  playPlayerMinion,
  placeMinion,
  useCardAbility } from '../../../state/actions.js';
import { CARD_TARGETS, CARD_SOURCES } from '../../../state/state-specifiers.js';
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
      fieldSlot: { type: Object },
      selectedCardWithAbility: { type: Object },
      owner: { type: String }
    }
  }

  _getCardHtml() {
    if (this._showAttackCardCover()) {
      return this._attackCardCover();
    }
    if (this._showSelectedPlayerMinion()) {
      return this._selectedPlayerMinion();
    }
    if (this._showPlaceCardCover()) {
      return this._placeMinionCover();
    }
    if (this._showTargetOpponentMinionAbilityCover()) {
      return this._targetOpponentMinionAbilityCover();
    }
    if (this._showTargetPlayerMinionAbilityCover()) {
      return this._targetPlayerMinionAbilityCover();
    }
    return html``;
  }

  _fieldSlotHasCard() {
    return !!this.fieldSlot.card;
  }

  _targetedCardInRange() {
    return AttackTargets.canAttackFieldSlotCard(this.selectedCardWithAbility.card, this.selectedCardWithAbility.playAreaIndex, this.fieldSlot.card, this.fieldSlot.playAreaIndex);
  }

  _selectedCardExhausted() {
    return this.selectedCardWithAbility.card.isExhausted();
  }

  _selectedCardInThisFieldSlot() {
    return this.selectedCardWithAbility.playAreaIndex === this.fieldSlot.playAreaIndex;
  }

  _usingAbilityOnOpponentMinion() {
    return (
      this._usingAbility()
      && this.selectedCardWithAbility.targets === CARD_TARGETS.OPPONENT_MINION
    );
  }

  _usingAbilityOnPlayerMinion() {
    return (
      this._usingAbility()
      && this.selectedCardWithAbility.targets === CARD_TARGETS.PLAYER_MINION
    );
  }

  _usingAbility() {
    return (
      this.selectedCardWithAbility.source === CARD_SOURCES.CAST_PLAYER_SPELL
      || this.selectedCardWithAbility.source === CARD_SOURCES.PLAY_PLAYER_MINION
    );
  }

  _showAttackCardCover() {
    return (
      this.selectedCardWithAbility.source == CARD_SOURCES.SELECT_PLAYER_MINION
      && this.owner == PLAY_FIELD_OWNER.OPPONENT
      && this._fieldSlotHasCard()
      && this._targetedCardInRange()
      && !this._selectedCardExhausted()
    );
  }

  _showSelectedPlayerMinion() {
    return (
      this.selectedCardWithAbility.source == CARD_SOURCES.SELECT_PLAYER_MINION
      && this.owner == PLAY_FIELD_OWNER.PLAYER
      && this._selectedCardInThisFieldSlot()
    );
  }

  _showPlaceCardCover() {
    return (
      this.selectedCardWithAbility.source == CARD_SOURCES.SUMMON_PLAYER_MINION
      && this.owner == PLAY_FIELD_OWNER.PLAYER
    );
  }

  _showTargetOpponentMinionAbilityCover() {
    return (
      this._fieldSlotHasCard()
      && this._usingAbilityOnOpponentMinion()
      && this.owner == PLAY_FIELD_OWNER.OPPONENT
    );
  }

  _showTargetPlayerMinionAbilityCover() {
    return (
      this._fieldSlotHasCard()
      && this._usingAbilityOnPlayerMinion()
      && this.owner == PLAY_FIELD_OWNER.PLAYER
    );
  }

  _attackCardCover() {
    return html`
      <sc-attack-card-cover
          .game=${this.game}
          .attacker=${this.selectedCardWithAbility}
          .attacked=${this.fieldSlot}
          @click=${this._attackCardCoverClicked}></sc-attack-card-cover>
    `;
  }

  _attackCardCoverClicked() {
    localStore.dispatch(attackMinion.request(this.fieldSlot.playAreaIndex));
  }

  _selectedPlayerMinion() {
    return html`
      <sc-minion-card
          .game=${this.game}
          .card=${this.selectedCardWithAbility.card}
          @click=${this._selectedPlayerMinionClicked}></sc-minion-card>
    `;
  }

  _selectedPlayerMinionClicked() {
    localStore.dispatch(playPlayerMinion());
  }

  _placeMinionCover() {
    return html`
      <sc-place-minion-cover
          .game=${this.game}
          .replacer=${this.selectedCardWithAbility}
          .replaced=${this.fieldSlot}
          @click=${this._placeMinionCoverClicked}></sc-place-minion-cover>
    `;
  }

  _placeMinionCoverClicked() {
    localStore.dispatch(placeMinion.request(this.fieldSlot.playAreaIndex));
  }

  _targetOpponentMinionAbilityCover() {
    return html`
      <sc-target-minion-ability-cover
          .game=${this.game}
          .caster=${this.selectedCardWithAbility}
          .target=${this.fieldSlot}
          @click=${this._targetOpponentMinionAbilityCoverClicked}></sc-target-minion-ability-cover>
    `;
  }

  _targetOpponentMinionAbilityCoverClicked() {
    localStore.dispatch(useCardAbility.request(this.fieldSlot.playAreaIndex));
  }

  _targetPlayerMinionAbilityCover() {
    return html`
      <sc-target-minion-ability-cover
          .game=${this.game}
          .caster=${this.selectedCardWithAbility}
          .target=${this.fieldSlot}
          @click=${this._targetPlayerMinionAbilityCoverClicked}></sc-target-minion-ability-cover>
    `;
  }

  _targetPlayerMinionAbilityCoverClicked() {
    localStore.dispatch(useCardAbility.request(this.fieldSlot.playAreaIndex));
  }
}
