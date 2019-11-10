import { html, css, LitElement } from 'lit-element';
import { FieldSlotStyles } from './play-area-styles.js';

export class ScOpponentFieldBacklog extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex: 0 0 25px; /* @TODO: get the 25px in some kind of variable.  I have no idea what it is otherwise. Pretty sure it's coming from sc-opponent-slot-backlog.backlog-amount:line-height */
          width: 100%;
        }

        [overlay] {
          display: none;
        }
      `,
      FieldSlotStyles,
    ];
  }

  render() {
    return html`
      <div class="field-slot-left" ?overlay="${this.overlay}" field-slot>
        <sc-opponent-slot-backlog .playAreaIndex="${0}"></sc-opponent-slot-backlog>
      </div>
      <div ?overlay="${this.overlay}" field-slot-separator></div>
      <div class="field-slot-middle" ?overlay="${this.overlay}" field-slot>
        <sc-opponent-slot-backlog .playAreaIndex="${1}"></sc-opponent-slot-backlog>
      </div>
      <div ?overlay="${this.overlay}" field-slot-separator></div>
      <div class="field-slot-right" ?overlay="${this.overlay}" field-slot>
        <sc-opponent-slot-backlog .playAreaIndex="${2}"></sc-opponent-slot-backlog>
      </div>
    `;
  }

  static get properties() {
    return {
      overlay: { type: Boolean },
    };
  }
}
