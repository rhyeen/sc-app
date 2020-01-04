import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { CARDS } from '../../../../../sc-cards/sc-cards-styles';

import { localStore } from '../../../state/store.js';
import { selectBaseDraftCard } from '../../../state/actions.js';

export class ScBaseDraftCardSlot extends LitElement {
  static get styles() {
    return [
      css`
        [empty-draft-card] {
          width: calc(${CARDS.MINION.WIDTH} - 2 * ${CARDS.MINION.PADDING});
          height: calc(${CARDS.MINION.HEIGHT} - 2 * ${CARDS.MINION.PADDING});
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
      baseCardIndex: { type: Number }
    };
  }

  _getCardHtml() {
    if (this.game.player.craftingTable.baseCards.length <= this.baseCardIndex) {
      return ScBaseDraftCardSlot._getEmptyDraftCard();
    }
    const card = this.game.player.craftingTable.baseCards[this.baseCardIndex];
    if (!card) {
      return ScBaseDraftCardSlot._getEmptyDraftCard();
    }
    return html`
      <sc-reduced-draft-card
        .card=${card}
        @click=${this._draftCardClicked}></sc-reduced-draft-card>
    `;
  }

  static _getEmptyDraftCard() {
    return html`<div empty-draft-card></div>`;
  }

  _draftCardClicked() {
    localStore.dispatch(selectBaseDraftCard(this.baseCardIndex));
  }
}
