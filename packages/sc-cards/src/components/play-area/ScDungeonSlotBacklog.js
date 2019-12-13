import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

const BANNER_PIXEL_SIZE = 50;
export const BANNER_SIZE = css`${BANNER_PIXEL_SIZE}px`;
export const BANNER_DIAGNAL_LENGTH = css`${1.41 * BANNER_PIXEL_SIZE}px`; // x * sqrt(2)

export class ScDungeonSlotBacklog extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        [card-banner] {
          position: absolute;
          background-color: #eceff1;
          width: ${BANNER_SIZE};
          height: ${BANNER_SIZE};
          margin-top: calc(-1 * (${BANNER_DIAGNAL_LENGTH} / 2));
          transform: rotate(45deg);
          z-index: -1;
        }

        .backlog-size {
          margin-top: -5px; /* @NOTE: this is just to make the text a little higher, which is just more pleasing */
          line-height: calc(${BANNER_DIAGNAL_LENGTH} / 2));
          color: #90a4ae;
          text-align: center;
        }
      `,
    ];
  }

  render() {
    return html`
      <div card-banner></div>
      <div class="backlog-size">${this._getBacklogSize()}</div>
    `;
  }

  static get properties() {
    return {
      fieldSlotIndex: { type: Number },
      game: { type: Game },
    };
  }

  _getBacklogSize() {
    return this.game.dungeon.field[this.fieldSlotIndex].backlog.length;
  }
}
