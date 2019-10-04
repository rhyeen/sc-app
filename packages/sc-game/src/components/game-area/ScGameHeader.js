import { html, css, LitElement } from 'lit-element';
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
          <sc-energy-bar-item></sc-energy-bar-item>
          <sc-health-bar-item></sc-health-bar-item>
        </div>

        <div class="item-group right-items">
          <sc-game-menu-bar-item @click="${() => ScGameHeader._openMenu()}"></sc-game-menu-bar-item>
        </div>
      </div>
    `;
  }

  static _openMenu() {
    localStore.dispatch(Actions.showInGameMenu());
  }
}
