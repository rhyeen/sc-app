import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { Log } from 'interface-handler/src/logger';
import { localStore } from '../../state/store.js';

import { ScOverlayStyles, ScBtnGroupStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';
import * as CraftSelectors from '../../../../sc-craft/src/state/selectors.js';

import { cancelSelectCraftingComponent, finalizeSelectedForgeDraftCard } from '../../../../sc-craft/src/state/actions.js';

export class ScFinalizeForgeDraftCardOverlay extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      ScOverlayStyles,
      ScBtnGroupStyles,
      css`
        .square-btn {
          display: block;
          width: 9px; /* @TODO: just an arbitrary number that makes the width + height both 41px.  Should instead use line-height + top/bottom padding of the btn */ 
        }
      `
    ];
  }

  render() {
    return html`
      <sc-full-finalized-card
        .card=${this._finalizedCard}
        .possibleNames=${this._possibleNames}
        @select-name=${this._selectName}></sc-full-finalized-card>
      <div btn-group-stack>
        <div btn-group class="btn-group-tight">
          <sc-btn
            .btntype="${SC_BTN_TYPES.GENERIC.PRIMARY}"
            @click="${() => this._decrementNumberOfInstances()}"
            ?disabled=${this._numberOfInstances <= 1}>
            <span class="square-btn">-</span>
          </sc-btn>
          <sc-btn
            .btntype="${SC_BTN_TYPES.GENERIC.PRIMARY}"
            @click="${() => this._addToDeck()}"
            ?disabled=${!this._selectedName}>
          ${Localize.localeMap.SC_BTN.OTHER.ADD_CARDS_TO_DECK(this._numberOfInstances)}</sc-btn>
          <sc-btn
            .btntype="${SC_BTN_TYPES.GENERIC.PRIMARY}"
            @click="${() => this._incrementNumberOfInstances()}"
            ?disabled=${this._numberOfInstances >= this.maxNumberOfInstances}>
            <span class="square-btn">+</span>
          </sc-btn>
        </div>
        <div btn-group>
          <sc-btn
            .btntype=${SC_BTN_TYPES.PRESET.CANCEL}
            @click=${() => ScFinalizeForgeDraftCardOverlay._cancel()}
          >
            ${Localize.localeMap.SC_BTN.PRESET.CANCEL}</sc-btn
          >
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      selectedCraftingComponent: { type: Object },
      game: { type: Game },
      _finalizedCard: { type: Object },
      _numberOfInstances: { type: Number },
      _possibleCards: { type: Array },
      _selectedName: { type: String }
    };
  }

  constructor() {
    super();
    this._numberOfInstances = -1;
  }

  get maxNumberOfInstances() {
    if (!this._finalizedCard) {
      return -1;
    }
    return this.game.player.craftingTable.getMaxNumberOfDraftedInstances(this._finalizedCard.rarity);
  }

  _decrementNumberOfInstances() {
    this._numberOfInstances -= 1;
  }

  _incrementNumberOfInstances() {
    this._numberOfInstances += 1;
  }

  static _cancel() {
    localStore.dispatch(cancelSelectCraftingComponent());
  }

  _addToDeck() {
    localStore.dispatch(addFinalizedCardToDeck.request());
  }

  _selectName(event) {
    debugger;
  }

  static _getFinalizedCard(state) {
    const finalizedCard = CraftSelectors.getFinalizedCard(state);
    if (!finalizedCard || !finalizedCard.card) {
      return null;
    }
    return finalizedCard.card;
  }

  static _getPossibleNames(state) {
    const finalizedCard = CraftSelectors.getFinalizedCard(state);
    if (!finalizedCard || !finalizedCard.possibleNames) {
      return null;
    }
    return finalizedCard.possibleNames;
  }

  stateChanged(state) {
    const finalizedCard = ScFinalizeForgeDraftCardOverlay._getFinalizedCard(state);
    // @NOTE: when finalizedCard is first set, set the number of instance to the max, based on the card's rarity.
    if (!this._finalizedCard && !!finalizedCard) {
      this._finalizedCard = finalizedCard;
      this._numberOfInstances = this.maxNumberOfInstances;
    }
    this._possibleNames = ScFinalizeForgeDraftCardOverlay._getPossibleNames(state);
    if (this._possibleNames && this._possibleNames.length) {
      this._selectedName = this._possibleNames[0];
    }
  }
}
