import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import * as Selector from '../../state/selectors.js';
import { FieldSlotStyles } from './play-area-styles.js';

export const PLAY_FIELD_OWNER = {
  PLAYER: 'player',
  DUNGEON: 'dungeon',
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
        ${this._getFieldSlotCardHtml(0)}
      </div>
      <div ?overlay="${this.overlay}" field-slot-separator></div>
      <div class="field-slot-middle" field-slot>
        ${this._getFieldSlotCardHtml(1)}
      </div>
      <div ?overlay="${this.overlay}" field-slot-separator></div>
      <div class="field-slot-right" field-slot>
        ${this._getFieldSlotCardHtml(2)}
      </div>
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      overlay: { type: Boolean },
      owner: { type: String },
      _selectedCardWithAbility: { type: Object },
    };
  }

  stateChanged(state) {
    if (this.overlay) {
      this._selectedCardWithAbility = Selector.getSelectedAbility(state);
    }
  }

  _getFieldSlotCardHtml(fieldSlotIndex) {
    if (this.overlay) {
      return html`
        <sc-cover-field-card
          .game=${this.game}
          .fieldSlot=${fieldSlot}
          .selectedCardWithAbility=${this._selectedCardWithAbility}
          .owner=${this.owner}
        ></sc-cover-field-card>
      `;
    }
    return html`
      <sc-minion-field-slot
        .game=${this.game}
        .fieldSlotIndex=${fieldSlotIndex}
        .owner=${this.owner}
      ></sc-minion-field-slot>
    `;
  }
}
