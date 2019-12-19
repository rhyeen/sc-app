import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { FieldSlotStyles } from './play-area-styles.js';
import { BANNER_DIAGNAL_LENGTH } from './ScDungeonSlotBacklog.js';

export class ScDungeonFieldBacklog extends LitElement {
  static get styles() {
    return [
      FieldSlotStyles,
      css`
        :host {
          display: flex;
          flex: 0 0 calc(${BANNER_DIAGNAL_LENGTH} / 2);
          width: 100%;
          margin-bottom: -10px; /* @NOTE: to pull the field cards up a bit on the banner */
        }

        [overlay] {
          display: none;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="field-slot-left" ?overlay=${this.overlay} field-slot>
        <sc-dungeon-slot-backlog
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .fieldSlotIndex=${0}
        ></sc-dungeon-slot-backlog>
      </div>
      <div ?overlay=${this.overlay} field-slot-separator></div>
      <div class="field-slot-middle" ?overlay=${this.overlay} field-slot>
        <sc-dungeon-slot-backlog
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .fieldSlotIndex=${1}
        ></sc-dungeon-slot-backlog>
      </div>
      <div ?overlay=${this.overlay} field-slot-separator></div>
      <div class="field-slot-right" ?overlay=${this.overlay} field-slot>
        <sc-dungeon-slot-backlog
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .fieldSlotIndex=${2}
        ></sc-dungeon-slot-backlog>
      </div>
    `;
  }

  static get properties() {
    return {
      overlay: { type: Boolean },
      game: { type: Game },
      gameVersion: { type: Number },
    };
  }
}
