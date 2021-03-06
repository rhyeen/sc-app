import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { AREAS } from '../../../sc-cards-styles.js';
import { PLAY_FIELD_OWNER } from './ScPlayField.js';

export class ScPlayArea extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          width: 100%;
          max-width: ${AREAS.PLAY_AREA.MAX_WIDTH};
        }

        [play-field-separator] {
          width: 100%;
          border-bottom: ${AREAS.PLAY_AREA.SEPARATOR.BORDER};
          border-top: ${AREAS.PLAY_AREA.SEPARATOR.BORDER};
          flex: 0 0
            calc(${AREAS.PLAY_AREA.SEPARATOR.HEIGHT} - 2 * ${AREAS.PLAY_AREA.SEPARATOR.BORDER_SIZE});
        }

        [play-field-separator][overlay] {
          border: none;
          flex: 0 0 ${AREAS.PLAY_AREA.SEPARATOR.HEIGHT};
        }

        /** @NOTE: width/height are set here because we have the context regarding flex **/
        sc-play-field {
          flex: 1;
          width: 100%;
        }
      `,
    ];
  }

  render() {
    return html`
      <sc-dungeon-field-backlog
        .game=${this.game}
        .gameVersion=${this.gameVersion}
        ?overlay=${!!this.selectedCard}
      ></sc-dungeon-field-backlog>
      <sc-play-field
        .game=${this.game}
        .gameVersion=${this.gameVersion}
        .owner=${PLAY_FIELD_OWNER.DUNGEON}
        .selectedCard=${this.selectedCard}
      ></sc-play-field>
      <div ?overlay=${!!this.selectedCard} play-field-separator></div>
      <sc-play-field
        .game=${this.game}
        .gameVersion=${this.gameVersion}
        .owner=${PLAY_FIELD_OWNER.PLAYER}
        .selectedCard=${this.selectedCard}
      ></sc-play-field>
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      gameVersion: { type: Number },
      overlay: { type: Boolean },
      selectedCard: { type: Object },
    };
  }
}
