import { html, LitElement } from 'lit-element';

import { Log } from 'interface-handler/src/logger.js';
import { selectOpponentMinion, selectPlayerMinion } from '../../../state/actions.js';
import { PLAY_FIELD_OWNER } from '../ScPlayField.js';
import { localStore } from '../../../state/store.js';

export class ScMinionFieldCard extends LitElement {
  render() {
    return html`
      ${this._getCardHtml()}
    `;
  }

  static get properties() {
    return {
      fieldSlot: { type: Object },
      owner: { type: String },
    };
  }

  _getCardHtml() {
    if (!this.fieldSlot.card) {
      return html``;
    }
    switch (this.owner) {
      case PLAY_FIELD_OWNER.OPPONENT:
        return this._opponentMinion();
      case PLAY_FIELD_OWNER.PLAYER:
        return this._playerMinion();
      default:
        Log.error(`unexpected owner: ${this.owner}`);
        return html``;
    }
  }

  _opponentMinion() {
    return html`
      <sc-minion-card
        .card="${this.fieldSlot.card}"
        @click="${this._opponentMinionClicked}"
      ></sc-minion-card>
    `;
  }

  _opponentMinionClicked() {
    localStore.dispatch(
      selectOpponentMinion(
        this.fieldSlot.id,
        this.fieldSlot.instance,
        this.fieldSlot.playAreaIndex,
      ),
    );
  }

  _playerMinion() {
    return html`
      <sc-minion-card
        .card="${this.fieldSlot.card}"
        @click="${this._playerMinionClicked}"
      ></sc-minion-card>
    `;
  }

  _playerMinionClicked() {
    localStore.dispatch(
      selectPlayerMinion(this.fieldSlot.id, this.fieldSlot.instance, this.fieldSlot.playAreaIndex),
    );
  }
}
