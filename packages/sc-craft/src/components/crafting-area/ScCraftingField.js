import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { selectBaseDraftCard } from '../../state/actions.js';

export class ScCraftingField extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .middle-slot {
          margin: 0 10px;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="left-slot">
        ${this._getCraftingForgeHtml(0)}
      </div>
      <div class="middle-slot">
        ${this._getCraftingBaseCardHtml(0)}
      </div>
      <div class="right-slot">
        ${this._getCraftingForgeHtml(1)}
      </div>
    `;
  }

  static get properties() { 
    return {
      gameVersion: { type: Number },
      game: { type: Game },
      owner: { type: String },
      selectedCraftingPart: { type: Object },
      selectedBaseDraftCard: { type: Object }
    }
  }

  _getCraftingForgeHtml(forgeSlotIndex) {
    if (this.overlay) {
      return html`
        <sc-cover-forge-card
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .selectedCraftingPart=${this.selectedCraftingPart}
          .selectedBaseDraftCard=${this.selectedBaseDraftCard}
          .forgeSlotIndex=${forgeSlotIndex}
        ></sc-cover-forge-card>
      `;
    }
    return html`
      <sc-forge-slot
        .game=${this.game}
        .gameVersion=${this.gameVersion}
        .forgeSlotIndex=${forgeSlotIndex}
      ></sc-forge-slot>
    `;
  }

  get overlay() {
    return this.selectedCraftingPart || this.selectedBaseDraftCard && this.selectedBaseDraftCard.isForging;
  }

  _getCraftingBaseCardHtml(baseCardIndex) {
    if (this.overlay) {
      return html`
        <sc-cover-base-draft-card></sc-cover-base-draft-card>
      `;
    }
    return html`
      <sc-base-draft-card-slot
        .game=${this.game}
        .gameVersion=${this.gameVersion}
        .baseCardIndex=${baseCardIndex}
      ></sc-base-draft-card-slot>
    `;
  }
}