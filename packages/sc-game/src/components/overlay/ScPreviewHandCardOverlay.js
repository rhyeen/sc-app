import { html, LitElement } from 'lit-element';
import { CardType } from '@shardedcards/sc-types/dist/card/enums/card-type.js';

import { Log } from 'interface-handler/src/logger.js';
import { localStore } from '../../state/store.js';

import { ScOverlayStyles, ScBtnGroupStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';
import {
  cancelSelectedCard,
  previewPlaceMinion,
  previewCardAbilities,
} from '../../../../sc-cards/src/state/actions.js';
import * as StatusSelectors from '../../../../sc-status/src/state/selectors.js';

export class ScPreviewHandCardOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles, ScBtnGroupStyles];
  }

  render() {
    return html`
      <sc-full-card .card=${this.selectedCard.card}></sc-full-card>
      <div btn-group>
        <sc-btn
          .btntype=${SC_BTN_TYPES.PRESET.CANCEL}
          @click=${() => ScPreviewHandCardOverlay._cancel()}
        >
          ${Localize.localeMap.SC_BTN.PRESET.CANCEL}</sc-btn
        >
        <sc-btn
          .btntype=${SC_BTN_TYPES.GENERIC.PRIMARY}
          @click=${() => this._playCard()}
          ?disabled=${!this._canAffordCard()}
        >
          ${Localize.localeMap.SC_BTN.OTHER.PLAY_CARD}</sc-btn
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

  _playCard() {
    if (!this.selectedCard || !this.selectedCard.card) {
      Log.error(`selectedCard has no set card: ${this.selectedCard}`);
      return;
    }
    switch (this.selectedCard.card.type) {
      case CardType.Minion:
        localStore.dispatch(previewPlaceMinion());
        return;
      case CardType.Spell:
        localStore.dispatch(previewCardAbilities());
        return;
      default:
        Log.error(`unexpected card type for: ${this.selectedCard.card}`);
    }
  }

  _canAffordCard() {
    const state = localStore.getState();
    const currentEnergy = StatusSelectors.getCurrentEnergy(state);
    return this.selectedCard.card.cost <= currentEnergy;
  }
}
