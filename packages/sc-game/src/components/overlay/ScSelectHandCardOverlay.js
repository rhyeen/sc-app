import { html, LitElement } from 'lit-element';

import { localStore } from '../../state/store.js';

import { ScOverlayStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';
import { cancelSelectedCard, playSelectedCard } from '../../../../sc-cards/src/state/actions.js';
import * as StatusSelectors from '../../../../sc-status/src/state/selectors.js';

export class ScSelectHandCardOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles];
  }

  render() {
    return html`
      <sc-full-card .card=${this.selectedCard.card}></sc-full-card>
      <div btn-group>
        <sc-btn
            .btntype=${SC_BTN_TYPES.PRESET.CANCEL}
            @click=${() => ScSelectHandCardOverlay._cancel()}>
          ${Localize.localeMap.SC_BTN.PRESET.CANCEL}</sc-btn>
        <sc-btn
            .btntype=${SC_BTN_TYPES.GENERIC.PRIMARY}
            @click=${() => ScSelectHandCardOverlay._playCard()}
            ?disabled=${!this._canAffordCard()}>
          ${Localize.localeMap.SC_BTN.OTHER.PLAY_CARD}</sc-btn>
      </div>
    `
  }

  static get properties() { 
    return {
      selectedCard: { type: Object }
    };
  }

  static _cancel() {
    localStore.dispatch(cancelSelectedCard());
  }

  static _playCard() {
    localStore.dispatch(playSelectedCard());
  }

  _canAffordCard() {
    const state = localStore.getState();
    const currentEnergy = StatusSelectors.getCurrentEnergy(state);
    return this.selectedCard.card.cost <= currentEnergy;
  }
}
