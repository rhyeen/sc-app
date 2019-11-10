import { html, css, LitElement } from 'lit-element';
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
      <sc-opponent-field-backlog ?overlay="${this.overlay}"></sc-opponent-field-backlog>
      <sc-play-field
        .owner="${PLAY_FIELD_OWNER.OPPONENT}"
        ?overlay="${this.overlay}"
      ></sc-play-field>
      <div ?overlay="${this.overlay}" play-field-separator></div>
      <sc-play-field .owner="${PLAY_FIELD_OWNER.PLAYER}" ?overlay="${this.overlay}"></sc-play-field>
    `;
  }

  static get properties() {
    return {
      overlay: { type: Boolean },
    };
  }
}
