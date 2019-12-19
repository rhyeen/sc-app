import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { localStore } from '../../state/store.js';
import * as Actions from '../../state/actions.js';
import { NAV } from '../../../sc-game-styles.js';
import { BarItemsStyles } from '../../../../sc-app/sc-app-styles.js';

export class ScGameHeader extends LitElement {
  static get styles() {
    return [
      css`
        [bar-items] {
          top: 0;
          border-bottom: ${NAV.HEADER.BORDER};
          height: ${NAV.HEADER.HEIGHT};
        }

        sc-health-bar-item {
          margin-left: 20px;
        }
      `,
      BarItemsStyles,
    ];
  }

  render() {
    return html`
      <div bar-items>
        <div class="item-group left-items">
          <sc-energy-bar-item
            .game=${this.game}
            .gameVersion=${this.gameVersion}
          ></sc-energy-bar-item>
          <sc-health-bar-item
            .game=${this.game}
            .gameVersion=${this.gameVersion}
          ></sc-health-bar-item>
        </div>

        <div class="item-group right-items">
          <sc-game-menu-bar-item @click=${() => ScGameHeader._openMenu()}></sc-game-menu-bar-item>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      gameVersion: { type: Number },
      game: { type: Game },
    };
  }

  static _openMenu() {
    localStore.dispatch(Actions.showInGameMenu());
  }
}
