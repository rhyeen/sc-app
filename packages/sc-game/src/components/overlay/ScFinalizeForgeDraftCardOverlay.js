import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { Log } from 'interface-handler/src/logger';
import { localStore } from '../../state/store.js';

import { ScOverlayStyles, ScBtnGroupStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';
import * as CraftSelectors from '../../../../sc-craft/src/state/selectors.js';

import { cancelSelectCraftingComponent, finalizeSelectedForgeDraftCard } from '../../../../sc-craft/src/state/actions.js';

export class ScFinalizeForgeDraftCardOverlay extends LitElement {
  static get styles() {
    return [
      ScOverlayStyles,
      ScBtnGroupStyles,
      css`
        .square-btn {
          display: block;
          width: 9px; /* just an arbitrary number that makes the width + height both 41px */ 
        }
      `
    ];
  }

  render() {
    if (this._numberOfInstances === -1) {
      this._numberOfInstances = this.maxNumberOfInstances;
    }
    return html`
      <sc-full-card .card=${this._getFinalizedCard()}></sc-full-card>
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
            @click="${() => this._addToDeck()}">
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
      _numberOfInstances: { type: Number }
    };
  }

  constructor() {
    super();
    this._numberOfInstances = -1;
  }

  get maxNumberOfInstances() {
    return this.game.player.craftingTable.getMaxNumberOfDraftedInstances(this._getFinalizedCard().rarity);
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

  _getFinalizedCard() {
    if (!this._finalizedCard || !this._finalizedCard.card) {
      const state = localStore.getState();
      this._finalizedCard = CraftSelectors.getFinalizedCard(state);
      if (!this._finalizedCard || !this._finalizedCard.card) {
        Log.error(`finalizedCard is not set`);
      }
    }
    return this._finalizedCard.card;
  }
}
