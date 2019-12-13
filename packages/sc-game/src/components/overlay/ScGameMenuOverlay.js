import { html, LitElement } from 'lit-element';

import { localStore } from '../../state/store.js';

import { hideInGameMenu, resetGame } from '../../state/actions.js';
import { Localize } from '../../../../utils/localizer.js';

import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { ScOverlayStyles, ScOverlayVerticalBtnsStyles } from './sc-overlay-styles.js';
import * as Selectors from '../../state/selectors.js';

export class ScGameMenuOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles, ScOverlayVerticalBtnsStyles];
  }

  render() {
    return html`
      <sc-btn
        .btntype=${SC_BTN_TYPES.GENERIC.WARNING}
        @click=${() => this._resetGame()}
      >
        ${Localize.localeMap.SC_BTN.OTHER.RESET_GAME}</sc-btn
      >
      <sc-btn .btntype=${SC_BTN_TYPES.PRESET.BACK} @click=${() => ScGameMenuOverlay._cancel()}>
        ${Localize.localeMap.SC_BTN.PRESET.BACK}</sc-btn
      >
    `;
  }

  static _cancel() {
    localStore.dispatch(hideInGameMenu());
  }

  _resetGame() {
    const state = localStore.getState();
    const playerId = Selectors.getPlayerId(state);
    const playerDeckId = Selectors.getPlayerDeckId(state);
    const dungeonId = Selectors.getDungeonId(state);
    localStore.dispatch(resetGame.request(playerId, playerDeckId, dungeonId));
  }
}
