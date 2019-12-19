import { html, LitElement } from 'lit-element';

import { localStore } from '../../state/store.js';

import { ScOverlayStyles, ScBtnGroupStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';
import { cancelSelectedCard } from '../../../../sc-cards/src/state/actions.js';

export class ScPreviewDungeonMinionOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles, ScBtnGroupStyles];
  }

  render() {
    return html`
      <sc-full-card .card=${this.selectedCard.card}></sc-full-card>
      <div btn-group>
        <sc-btn
          .btntype=${SC_BTN_TYPES.PRESET.CANCEL}
          @click=${() => ScPreviewDungeonMinionOverlay._cancel()}
        >
          ${Localize.localeMap.SC_BTN.PRESET.CANCEL}</sc-btn
        >
      </div>
    `;
  }

  static get properties() {
    return {
      selectedCard: { type: Object },
    };
  }

  static _cancel() {
    localStore.dispatch(cancelSelectedCard());
  }
}
