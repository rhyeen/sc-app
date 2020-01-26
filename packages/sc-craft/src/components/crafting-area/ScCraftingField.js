import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { finishForgeSelectedBaseDraftCard, selectForgeForCraftingPart } from '../../state/actions.js';
import { localStore } from '../../state/store.js';
import { SELECTED_CRAFTING_COMPONENT_SOURCES } from '../../state/state-specifiers.js';

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
      selectedCraftingComponent: { type: Object }
    }
  }

  _getCraftingForgeHtml(forgeSlotIndex) {
    if (this.overlay) {
      return html`
        <sc-cover-forge-card
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .selectedCraftingComponent=${this.selectedCraftingComponent}
          .forgeSlotIndex=${forgeSlotIndex}
          @click=${() => this._selectForge(forgeSlotIndex)}
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

  get _addingCraftingPart() {
    return this.selectedCraftingComponent.source === SELECTED_CRAFTING_COMPONENT_SOURCES.SELECT_CRAFTING_PART;
  }

  _selectForge(forgeSlotIndex) {
    if (this._addingCraftingPart) {
      localStore.dispatch(selectForgeForCraftingPart.request(forgeSlotIndex));
      return;
    }
    localStore.dispatch(finishForgeSelectedBaseDraftCard.request(forgeSlotIndex));
  }

  get overlay() {
    return !!this.selectedCraftingComponent;
  }

  _getCraftingBaseCardHtml(baseCardIndex) {
    if (this.overlay) {
      return html`
        <sc-cover-base-draft-card
          .game=${this.game}
          .gameVersion=${this.gameVersion}
          .selectedCraftingComponent=${this.selectedCraftingComponent}
          .baseCardIndex=${baseCardIndex}></sc-cover-base-draft-card>
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