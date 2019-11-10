import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import * as Selector from '../../state/selectors.js';

export class ScOpponentSlotBacklog extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        [card-banner] {
          --banner-size: 60px;
          position: absolute;
          background-color: #eceff1;
          width: var(--banner-size);
          height: var(--banner-size);
          margin-top: -35px; /* @TODO: why 35? I think it's because .backlog-amount:line-height - --banner-size */
          transform: rotate(45deg);
          z-index: -1;
        }

        .backlog-amount {
          margin-top: 3px; /* why 3px? */
          line-height: 25px; /* why 25px? */
          color: #90a4ae;
          text-align: center;
        }
      `,
    ];
  }

  render() {
    return html`
      <div card-banner></div>
      <div class="backlog-amount">${this._backlogAmount}</div>
    `;
  }

  static get properties() {
    return {
      playAreaIndex: { type: Number },
      _backlogAmount: { type: Number },
    };
  }

  stateChanged(state) {
    this._backlogAmount = Selector.getOpponentFieldBacklogSizes(state)[this.playAreaIndex];
  }
}
