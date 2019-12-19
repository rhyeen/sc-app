import { html, LitElement } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { localStore } from '../../state/store.js';

import { ScOverlayStyles, ScBtnGroupStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';
import { cancelPreviewPlayerFieldSlotCard } from '../../../../sc-cards/src/state/actions.js';

export class ScPreviewPlayerMinionOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles, ScBtnGroupStyles];
  }

  render() {
    return html`
      <sc-full-card .card=${this.selectedCard.card}></sc-full-card>
      <div btn-group>
        <sc-btn
          .btntype=${SC_BTN_TYPES.PRESET.BACK}
          @click=${() => ScPreviewPlayerMinionOverlay._cancel()}
        >
          ${Localize.localeMap.SC_BTN.PRESET.BACK}</sc-btn
        >
      </div>
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      gameVersion: { type: Number },
      selectedCard: { type: Object },
    };
  }

  static _cancel() {
    localStore.dispatch(cancelPreviewPlayerFieldSlotCard());
  }
}
