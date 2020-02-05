import { LitElement, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { ScCoverForgeCardStyles } from './sc-cover-forge-card-styles.js';

export class ScCoverBaseDraftCard extends LitElement {
  static get styles() {
    return [ScCoverForgeCardStyles];
  }

  render() {
    return html`
      <div minion-cover-top></div>
      <div minion-cover-separator></div>
      <div minion-cover-bottom></div>
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      gameVersion: { type: Number },
      selectedComponent: { type: Object },
      baseCardIndex: { type: Number },
    };
  }
}
