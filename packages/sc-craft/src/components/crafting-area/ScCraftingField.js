import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { AREAS } from '../sc-craft-styles.js';
import { selectCraftingBaseCard } from '../../state/actions.js';

export class ScCraftingField extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          padding: 0 ${AREAS.CRAFTING_AREA.PADDING};
          display: flex;
        }
      `,
    ];
  }

  render() {
    return html`
      ${this._getCraftingForgeHtml(0)}
      ${this._getCraftingBaseCardHtml(0)}
      ${this._getCraftingForgeHtml(1)}
    `;
  }

  static get properties() { 
    return {
      gameVersion: { type: Number },
      game: { type: Game },
      owner: { type: String },
      selectedCraftingPart: { type: Object },
    }
  }

  _getCraftingForgeHtml(forgeSlotIndex) {
    if (this.selectedCraftingPart) {
      return html`
        <sc-cover-forge-card
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .selectedCraftingPart=${this.selectedCraftingPart}
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

  _getCraftingBaseCardHtml(baseCardIndex) {
    if (this.selectedCraftingPart) {
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

  static _selectCraftingBaseCard(baseCardIndex) {
    localStore.dispatch(selectCraftingBaseCard(baseCardIndex));
  }
}