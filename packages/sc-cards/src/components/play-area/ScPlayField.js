import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { Log } from 'interface-handler/src/logger.js';
import { localStore } from '../../state/store.js';

import * as Selector from '../../state/selectors.js';
import { FieldSlotStyles } from './play-area-styles.js';

export const PLAY_FIELD_OWNER = {
  PLAYER: 'player',
  OPPONENT: 'opponent',
};

export class ScPlayField extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
        }
      `,
      FieldSlotStyles,
    ];
  }

  render() {
    return html`
      <div class="field-slot-left" field-slot>
        ${this._getFieldCardHtml(0)}
      </div>
      <div ?overlay="${this.overlay}" field-slot-separator></div>
      <div class="field-slot-middle" field-slot>
        ${this._getFieldCardHtml(1)}
      </div>
      <div ?overlay="${this.overlay}" field-slot-separator></div>
      <div class="field-slot-right" field-slot>
        ${this._getFieldCardHtml(2)}
      </div>
    `;
  }

  static get properties() {
    return {
      overlay: { type: Boolean },
      owner: { type: String },
      _selectedCardWithAbility: { type: Object },
      _fieldSlots: { type: Object },
    };
  }

  stateChanged(state) {
    if (this.overlay) {
      this._selectedCardWithAbility = Selector.getSelectedAbility(state);
    }
    this._fieldSlots = this._getFieldSlots(state);
  }

  _getFieldSlots(state) {
    switch (this.owner) {
      case PLAY_FIELD_OWNER.PLAYER:
        return Selector.getPlayerFieldSlots(state);
      case PLAY_FIELD_OWNER.OPPONENT:
        return Selector.getOpponentFieldSlots(state);
      default:
        Log.error(`unexpected owner: ${this.owner}`);
        return Selector.getPlayerFieldSlots(state);
    }
  }

  _getFieldCardHtml(playAreaIndex) {
    if (this.overlay) {
      return html`
        <sc-cover-field-card
          .fieldSlot="${this._fieldSlots[playAreaIndex]}"
          .selectedCardWithAbility="${this._selectedCardWithAbility}"
          .owner="${this.owner}"
        ></sc-cover-field-card>
      `;
    }
    return html`
      <sc-minion-field-card
        .fieldSlot="${this._fieldSlots[playAreaIndex]}"
        .owner="${this.owner}"
      ></sc-minion-field-card>
    `;
  }
}
