import { LitElement, html, css } from 'lit-element';
import { localStore } from './state/store';
import { resetGame } from './state/actions';

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

  constructor() {
    super();
    localStore.dispatch(resetGame.request());
  }
}
