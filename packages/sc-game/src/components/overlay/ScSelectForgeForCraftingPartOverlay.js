import { html, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { localStore } from '../../state/store.js';

import { ScOverlayStyles, ScBtnGroupStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';
import { cancelSelectCraftingComponent } from '../../../../sc-craft/src/state/actions.js';

export class ScSelectForgeForCraftingPartOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles, ScBtnGroupStyles];
  }

  render() {
    return html`
      <sc-crafting-area
        .game=${this.game}
        .gameVersion=${this.gameVersion}
        .selectedCraftingComponent=${this.selectedCraftingComponent}
      ></sc-crafting-area>
      <div class="btn-group-crafting-parts-area" btn-group>
        <sc-btn
          .btntype=${SC_BTN_TYPES.PRESET.CANCEL}
          @click=${() => ScSelectForgeForCraftingPartOverlay._cancel()}
        >
          ${Localize.localeMap.SC_BTN.PRESET.CANCEL}</sc-btn
        >
      </div>
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      gameVersion: { type: Number },
      selectedCraftingComponent: { type: Object },
    };
  }

  static _cancel() {
    localStore.dispatch(cancelSelectCraftingComponent());
  }
}
