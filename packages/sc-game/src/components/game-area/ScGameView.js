import { html, css, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';
import * as Selectors from '../../state/selectors.js';
import { NAV } from '../../../sc-game-styles.js';

export class ScGameView extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          width: 100vw;
          margin-top: ${NAV.HEADER.HEIGHT};
          height: calc(100vh - ${NAV.HEADER.HEIGHT} - ${NAV.FOOTER.HEIGHT});
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      `,
    ];
  }

  render() {
    return html`
      ${this._getGameViewHtml()}
    `;
  }

  static get properties() {
    return {
      _isDrafting: { type: Boolean },
      game: { type: Game },
      gameVersion: { type: Number },
    };
  }

  _getGameViewHtml() {
    if (this._isDrafting) {
      return html`
        <sc-crafting-area .game=${this.game} .gameVersion=${this.gameVersion}></sc-crafting-area>
        <sc-crafting-parts .game=${this.game} .gameVersion=${this.gameVersion}></sc-crafting-parts>
      `;
    }
    return html`
      <sc-play-area .game=${this.game} .gameVersion=${this.gameVersion}></sc-play-area>
      <sc-player-hand .game=${this.game} .gameVersion=${this.gameVersion}></sc-player-hand>
    `;
  }

  stateChanged(state) {
    this._isDrafting = Selectors.isDrafting(state);
  }
}
