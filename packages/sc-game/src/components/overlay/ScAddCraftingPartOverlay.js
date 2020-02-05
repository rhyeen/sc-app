import { html, LitElement } from 'lit-element';

import { localStore } from '../../state/store.js';

import { ScOverlayStyles, ScBtnGroupStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';

import {
  cancelSelectCraftingComponent,
  addCraftingPart,
} from '../../../../sc-craft/src/state/actions.js';
import * as CraftSelectors from '../../../../sc-craft/src/state/selectors.js';

export class ScAddCraftingPartOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles, ScBtnGroupStyles];
  }

  render() {
    return html`
      <sc-full-draft-card
        .card=${this.selectedCraftingComponent.card}
        .modifiedCard=${this._modifiedCard}
      ></sc-full-draft-card>
      <div btn-group>
        <sc-btn
          .btntype=${SC_BTN_TYPES.PRESET.CANCEL}
          @click=${() => ScAddCraftingPartOverlay._cancel()}
        >
          ${Localize.localeMap.SC_BTN.PRESET.CANCEL}</sc-btn
        >
        <sc-btn
          .btntype=${SC_BTN_TYPES.GENERIC.PRIMARY}
          @click=${() => ScAddCraftingPartOverlay._addCraftingPart()}
        >
          ${Localize.localeMap.SC_BTN.OTHER.ADD_PART}</sc-btn
        >
      </div>
    `;
  }

  static get properties() {
    return {
      selectedCraftingComponent: { type: Object },
    };
  }

  constructor() {
    super();
    this._modifiedCard = ScAddCraftingPartOverlay._getModifiedCard().card;
  }

  static _getModifiedCard() {
    const state = localStore.getState();
    return CraftSelectors.getModifiedCard(state);
  }

  static _cancel() {
    localStore.dispatch(cancelSelectCraftingComponent());
  }

  static _addCraftingPart() {
    localStore.dispatch(addCraftingPart.request());
  }
}
