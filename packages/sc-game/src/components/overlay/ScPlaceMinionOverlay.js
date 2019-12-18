import { html, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game';

import { localStore } from '../../state/store.js';

import { ScOverlayStyles, ScBtnGroupStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';
import { cancelSelectedCard } from '../../../../sc-cards/src/state/actions.js';

export class ScPlaceMinionOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles, ScBtnGroupStyles];
  }

  render() {
    return html`
      <sc-play-area .game=${this.game} .selectedCard=${this.selectedCard}></sc-play-area>
      <div btn-group>
        <sc-btn
            .btntype=${SC_BTN_TYPES.PRESET.CANCEL}
            @click=${() => ScPlaceMinionOverlay._cancel()}>
          ${Localize.localeMap.SC_BTN.PRESET.CANCEL}</sc-btn>
      </div>
    `
  }

  static get properties() { 
    return {
      game: { type: Game },
      selectedCard: { type: Object },
    };
  }

  static _cancel() {
    localStore.dispatch(cancelSelectedCard());
  }
}
