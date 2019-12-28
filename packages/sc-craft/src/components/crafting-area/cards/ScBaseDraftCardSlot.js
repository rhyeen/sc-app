import { html, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { localStore } from '../../../state/store.js';
import { selectCraftingBaseCard } from '../../../state/actions.js';

export class ScBaseDraftCardSlot extends LitElement {
  render() {
    return html`
      ${this._getCardHtml()}
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      gameVersion: { type: Number },
      baseCardIndex: { type: Number }
    };
  }

  _getCardHtml() {
    const card = this.game.player.craftingTable.baseCards[this.baseCardIndex];
    if (!card) {
      return html``;
    }
    return html`
      <sc-draft-card
        .card=${card}
        @click=${this._draftCardClicked}></sc-draft-card>
    `;
  }

  _draftCardClicked() {
    localStore.dispatch(selectCraftingBaseCard(this.baseCardIndex));
  }
}
