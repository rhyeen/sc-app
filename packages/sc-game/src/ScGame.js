import { LitElement, html, css } from 'lit-element';
import { localStore } from './state/store';
import { resetGame, setPlayerId, setPlayerDeckId, setDungeonId } from './state/actions';

export class ScGame extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          height: 100vh;
          width: 100vw;
        }
      `,
    ];
  }

  render() {
    return html`
      <sc-game-view></sc-game-view>
      <sc-game-header></sc-game-header>
      <sc-game-footer></sc-game-footer>
      <sc-game-overlay></sc-game-overlay>
    `;
  }

  static get properties() {
    return {
      playerId: { type: String },
      playerDeckId: { type: String },
      dungeonId: { type: String },
    }
  }

  updated(changedProps) {
    if (changedProps.has('playerId') || changedProps.has('playerDeckId') || changedProps.has('dungeonId')) {
      this._newGame();
    }
  }

  _newGame() {
    localStore.dispatch(setPlayerId(this.playerId));
    localStore.dispatch(setPlayerDeckId(this.playerDeckId));
    localStore.dispatch(setDungeonId(this.dungeonId));
    localStore.dispatch(resetGame.request(this.playerId, this.playerDeckId, this.dungeonId));
  }
}
