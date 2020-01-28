import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { FieldSlotStyles } from './play-area-styles.js';

export const PLAY_FIELD_OWNER = {
  PLAYER: 'player',
  DUNGEON: 'dungeon',
};

export class ScPlayField extends LitElement {
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
      <div ?overlay=${!!this.selectedCard} field-slot-separator></div>
      <div class="field-slot-middle" field-slot>
        ${this._getFieldSlotCardHtml(1)}
      </div>
      <div ?overlay=${!!this.selectedCard} field-slot-separator></div>
      <div class="field-slot-right" field-slot>
        ${this._getFieldSlotCardHtml(2)}
      </div>
    `;
  }

  static get properties() {
    return {
      gameVersion: { type: Number },
      game: { type: Game },
      owner: { type: String },
      selectedCard: { type: Object },
    };
  }

  _getFieldSlotCardHtml(fieldSlotIndex) {
    if (this.selectedCard) {
      return html`
        <sc-cover-field-card
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .selectedCard=${this.selectedCard}
          .fieldSlotIndex=${fieldSlotIndex}
          .owner=${this.owner}
        ></sc-cover-field-card>
      `;
    }
    return html`
      <sc-minion-field-slot
        .game=${this.game}
        .gameVersion=${this.gameVersion}
        .fieldSlotIndex=${fieldSlotIndex}
        .owner=${this.owner}
      ></sc-minion-field-slot>
    `;
  }
}
