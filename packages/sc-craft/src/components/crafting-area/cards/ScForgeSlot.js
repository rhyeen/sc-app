import { html, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { localStore } from '../../../state/store.js';
import { selectForgeSlot } from '../../../state/actions.js';

export class ScForgeSlot extends LitElement {
  render() {
    return html`
      ${this._getCardHtml()}
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      gameVersion: { type: Number },
      forgeSlotIndex: { type: Number }
    };
  }

  _getCardHtml() {
    const {card} = this.game.player.craftingTable.forge[this.forgeSlotIndex];
    if (!card) {
      return html`<sc-forge-slot-mold></sc-forge-slot-mold>`;
    }
    return html`
      <sc-reduced-draft-card
        .card=${card}
        @click=${this._draftCardClicked}></sc-reduced-draft-card>
      <sc-forge-slot-mold></sc-forge-slot-mold>
    `;
  }

  _draftCardClicked() {
    localStore.dispatch(selectForgeSlot(this.forgeSlotIndex));
  }
}
