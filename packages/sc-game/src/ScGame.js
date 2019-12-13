import { LitElement, html, css } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { resetGame, setPlayerId, setPlayerDeckId, setDungeonId } from './state/actions.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from './state/store.js';
import * as Selectors from './state/selectors.js';
import { Localize } from '../../utils/localizer.js';

export class ScGame extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          height: 100vh;
          width: 100vw;
        }

        .centralize {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100vw;
          height: 100vh;
        }
      `,
    ];
  }

  render() {
    return html`
      ${this._getGameHtml()}
    `;
  }

  static get properties() {
    return {
      playerId: { type: String },
      playerDeckId: { type: String },
      dungeonId: { type: String },
      _game: { type: Game },
    }
  }

  updated(changedProps) {
    if (changedProps.has('playerId') || changedProps.has('playerDeckId') || changedProps.has('dungeonId')) {
      this._newGame();
    }
  }

  _getGameHtml() {
    if (!this._game) {
      return html`
        <div class="centralize">
          <sc-loading .text=${Localize.localeMap.SC_GAME.LOADING}></sc-loading>
        </div>
      `;
    }
    return html`
      <sc-game-view .game=${this._game}></sc-game-view>
      <sc-game-header .game=${this._game}></sc-game-header>
      <sc-game-footer .game=${this._game}></sc-game-footer>
      <sc-game-overlay .game=${this._game}></sc-game-overlay>
    `;
  }

  _newGame() {
    localStore.dispatch(setPlayerId(this.playerId));
    localStore.dispatch(setPlayerDeckId(this.playerDeckId));
    localStore.dispatch(setDungeonId(this.dungeonId));
    localStore.dispatch(resetGame.request(this.playerId, this.playerDeckId, this.dungeonId));
  }

  stateChanged(state) {
    this._game = Selectors.getGame(state);
  }
}
