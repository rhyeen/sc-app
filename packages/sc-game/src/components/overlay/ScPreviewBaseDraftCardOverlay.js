import { html, LitElement } from 'lit-element';

import { Log } from 'interface-handler/src/logger';
import { localStore } from '../../state/store.js';

import { ScOverlayStyles, ScBtnGroupStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';

import { cancelSelectCraftingComponent, forgeSelectedBaseDraftCard } from '../../../../sc-craft/src/state/actions.js';

export class ScPreviewBaseDraftCardOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles, ScBtnGroupStyles];
  }

  render() {
    return html`
      <sc-full-draft-card .card=${this.selectedCraftingComponent.card}></sc-full-draft-card>
      <div btn-group>
        <sc-btn
          .btntype=${SC_BTN_TYPES.PRESET.CANCEL}
          @click=${() => ScPreviewBaseDraftCardOverlay._cancel()}
        >
          ${Localize.localeMap.SC_BTN.PRESET.CANCEL}</sc-btn
        >
        <sc-btn
          .btntype=${SC_BTN_TYPES.GENERIC.PRIMARY}
          @click=${() => this._forgeCard()}
        >
          ${Localize.localeMap.SC_BTN.OTHER.FORGE_CARD}</sc-btn
        >
      </div>
    `;
  }

  static get properties() {
    return {
      selectedCraftingComponent: { type: Object },
    };
  }

  static _cancel() {
    localStore.dispatch(cancelSelectCraftingComponent());
  }

  _forgeCard() {
    if (!this.selectedCraftingComponent.card) {
       Log.error(`selectedCraftingCompobnent does not have a card`);
    }
    localStore.dispatch(forgeSelectedBaseDraftCard());
  }
}
