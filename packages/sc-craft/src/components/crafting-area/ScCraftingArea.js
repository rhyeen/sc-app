import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';
import * as Selectors from '../../state/selectors.js';
import { AREAS } from '../../../../sc-cards/sc-cards-styles.js';


export class ScCraftingArea extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex: 1;
          width: 100%;
          max-width: ${AREAS.PLAY_AREA.MAX_WIDTH};
        }

        /** @NOTE: width/height are set here because we have the context regarding flex **/
        sc-crafting-field {
          flex: 1;
          width: 100%;
        }
      `
    ];
  }

  render() {
    return html`
      <sc-crafting-field
        .game=${this.game}
        .gameVersion=${this.gameVersion}
        .selectedCraftingComponent=${this._selectedCraftingComponent}
      ></sc-crafting-field>
    `;
  }

  static get properties() { 
    return {
      game: { type: Game },
      gameVersion: { type: Number },
      _selectedCraftingComponent: { type: Object },
    }
  }

  stateChanged(state) {
    this._selectedCraftingComponent = Selectors.getSelectedCraftingComponent(state);
  }
}
