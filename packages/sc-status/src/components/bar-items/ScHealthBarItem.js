import { html, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { HealthIcon, ScIconsStyles } from '../../../../sc-app/src/components/shared/ScIcons.js';
import { BarItemStyles } from '../../../../sc-app/sc-app-styles.js';

export class ScHealthBarItem extends LitElement {
  static get styles() {
    return [ScIconsStyles, BarItemStyles];
  }

  render() {
    return html`
      <div bar-item>
        <div class="current">${this.game.player.health.current}</div>
        <div class="icon">${HealthIcon()}</div>
      </div>
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      gameVersion: { type: Number },
    };
  }
}
