import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { localStore } from '../../../state/store.js';
import { selectForgeSlot } from '../../../state/actions.js';
import { FORGE } from '../../sc-craft-styles.js';
import { CARDS } from '../../../../../sc-cards/sc-cards-styles.js';

export class ScForgeSlot extends LitElement {
  static get styles() {
    return [
      css`
        sc-reduced-draft-card {
          position: absolute;
          margin-top: calc((${FORGE.HEIGHT} + (${FORGE.PADDING} * 2) - ${CARDS.MINION.HEIGHT})/2);
          margin-bottom: calc((${FORGE.HEIGHT} + (${FORGE.PADDING} * 2) - ${CARDS.MINION.HEIGHT})/2);
          margin-left: calc((${FORGE.WIDTH} + (${FORGE.PADDING} * 2) - ${CARDS.MINION.WIDTH})/2);
          margin-right: calc((${FORGE.WIDTH} + (${FORGE.PADDING} * 2) - ${CARDS.MINION.WIDTH})/2);
        }
      `
    ];
  }

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
