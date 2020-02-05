import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { APP_COLORS } from '../../../../sc-app/sc-app-styles.js';
import { AREAS } from '../sc-craft-styles.js';
import { localStore } from '../../state/store.js';
import * as Selectors from '../../state/selectors.js';

import { selectCraftingPart } from '../../state/actions.js';
import { Localize } from '../../../../utils/localizer.js';

export class ScCraftingParts extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          height: ${AREAS.CRAFTING_PARTS.HEIGHT};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
        }

        sc-crafting-part:first-child {
          margin-top: 0;
        }

        sc-crafting-part {
          margin-top: 10px;
        }

        sc-crafting-part:last-child {
          margin-bottom: 10px;
        }

        .parts-title {
          color: ${APP_COLORS.HINT_GRAY};
          font-size: 14px;
          font-weight: 300;
          border-bottom: 1px dashed ${APP_COLORS.HINT_GRAY};
          padding-bottom: 10px;
        }

        /* Given in the locale itself as injected html */
        .dynamic-value {
          font-weight: 700;
        }
      `
    ];
  }

  render() {
    return html`
      <div class="parts-title">${this._getPartsTitle()}</div>
      ${this._getCraftingPartsHtml()}
    `;
  }

  static get properties() { 
    return {
      game: { type: Game },
      gameVersion: { type: Number }
    }
  }

  _getPartsTitle() {
    if (this._allForgeSlotsEmpty()) {
      return html`${Localize.localeMap.SC_CRAFT.CRAFTING_PARTS.FORGE_EMPTY}`;
    }
    if (this._craftingPartsLeftToUse() <= 0) {
      return html`${Localize.localeMap.SC_CRAFT.CRAFTING_PARTS.NO_USES_REMAIN}`;
    }
    return html`${Localize.localeMap.SC_CRAFT.CRAFTING_PARTS.FORGE_NOT_EMPTY(this._craftingPartsLeftToUse())}`;
  }

  _getCraftingPartsHtml() {
    return this.game.player.craftingTable.craftingParts.map((craftingPart, craftingPartIndex) => {
      return html`
        <sc-crafting-part
          .craftingPart=${craftingPart}
          @click=${() => ScCraftingParts._selectCraftingPart(craftingPartIndex)}
          ?disabled=${this._allForgeSlotsEmpty() || this._craftingPartsLeftToUse() <= 0}
        ></sc-crafting-part>
      `;
    });
  }

  _allForgeSlotsEmpty() {
    for (const forgeSlot of this.game.player.craftingTable.forge) {
      if (forgeSlot.card) {
        return false;
      }
    }
    return true;
  }

  _craftingPartsLeftToUse() {
    return this.game.player.craftingTable.remainingUsableCraftingParts;
  }

  static _selectCraftingPart(craftingPartIndex) {
    localStore.dispatch(selectCraftingPart(craftingPartIndex));
  }
}
