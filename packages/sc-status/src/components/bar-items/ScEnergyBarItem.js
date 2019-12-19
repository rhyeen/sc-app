import { html, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { EnergyIcon, ScIconsStyles } from '../../../../sc-app/src/components/shared/ScIcons.js';
import { BarItemStyles } from '../../../../sc-app/sc-app-styles.js';

export class ScEnergyBarItem extends LitElement {
  static get styles() {
    return [ScIconsStyles, BarItemStyles];
  }

  render() {
    return html`
      <div bar-item>
        <div class="current">${this.game.player.energy.current}</div>
        <div class="current-max-divider">/</div>
        <div class="max">${this.game.player.energy.max}</div>
        <div class="icon">${EnergyIcon()}</div>
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
