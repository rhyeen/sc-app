import { LitElement, html, css } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
import { resetGame, setPlayerId, setPlayerDeckId, setDungeonId } from './state/actions.js';
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
          display: block;
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
      _gameVersion: { type: Number },
      _removeMe: { type: Array }
    };
  }

  updated(changedProps) {
    if (
      changedProps.has('playerId') ||
      changedProps.has('playerDeckId') ||
      changedProps.has('dungeonId')
    ) {
      this._newGame();
    }
  }

  _getGameHtml() {
    // return html`
    //       <sc-dropdown
    //       style="margin: 50px"
    //     .items=${this._removeMe}
    //     @select-item=${this._deleteMe}
    //     .loading=${!this._removeMe || !this._removeMe.length}
    //     wrapSelected></sc-dropdown>
    //     <div>HELLO WORLD</div>
    //     `;
    if (!this._game) {
      return html`
        <div class="centralize">
          <sc-loading .text=${Localize.localeMap.SC_GAME.LOADING_GAME}></sc-loading>
        </div>
      `;
    }
    return html`
      <sc-game-view .game=${this._game} .gameVersion=${this._gameVersion}></sc-game-view>
      <sc-game-header .game=${this._game} .gameVersion=${this._gameVersion}></sc-game-header>
      <sc-game-footer .game=${this._game} .gameVersion=${this._gameVersion}></sc-game-footer>
      <sc-game-overlay .game=${this._game} .gameVersion=${this._gameVersion}></sc-game-overlay>
    `;
  }

  constructor() {
    super();
    setTimeout(() => {
      this._removeMe = ['hello world afd afadsf dasf dsaf adsf asdf ds', 'this is a test', 'a what?'];
    }, 2000);
  }

  _deleteMe(event) {
    console.log(event.detail.item);
  }

  _newGame() {
    localStore.dispatch(setPlayerId(this.playerId));
    localStore.dispatch(setPlayerDeckId(this.playerDeckId));
    localStore.dispatch(setDungeonId(this.dungeonId));
    localStore.dispatch(resetGame.request(this.playerId, this.playerDeckId, this.dungeonId));
  }

  stateChanged(state) {
    this._game = Selectors.getGame(state);
    this._gameVersion = Selectors.getGameVersion(state);
  }
}
