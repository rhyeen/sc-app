import { html, LitElement } from 'lit-element';

import { localStore } from '../../state/store.js';

import { ScOverlayStyles, ScBtnGroupStyles } from './sc-overlay-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';
import {
  cancelSelectedCard,
  finishUsingAbilities,
  selectAbility,
} from '../../../../sc-cards/src/state/actions.js';

export class ScPreviewCardAbilitiesOverlay extends LitElement {
  static get styles() {
    return [ScOverlayStyles, ScBtnGroupStyles];
  }

  render() {
    return html`
      <div class="btn-group-fill-bottom-up" btn-group>
        ${this._getAbilityBtnsHtml()}
      </div>
      <div btn-group>
        ${this._getFinalActionBtnHtml()}
      </div>
    `;
  }

  static get properties() {
    return {
      selectedCard: { type: Object },
    };
  }

  _getAbilityBtnsHtml() {
    return html`
      ${this.selectedCard.card.abilities.map(ability =>
        ScPreviewCardAbilitiesOverlay._getAbilityBtnHtml(ability),
      )}
    `;
  }

  static _getAbilityBtnHtml(ability) {
    return html`
      <sc-use-ability-btn
        .ability=${ability}
        @click=${() => ScPreviewCardAbilitiesOverlay._selectAbility(ability)}
      ></sc-use-ability-btn>
    `;
  }

  _getFinalActionBtnHtml() {
    if (this._noAbilitiesUsed()) {
      return html`
        <sc-btn
          .btntype=${SC_BTN_TYPES.PRESET.CANCEL}
          @click=${() => ScPreviewCardAbilitiesOverlay._cancel()}
        >
          ${Localize.localeMap.SC_BTN.PRESET.CANCEL}</sc-btn
        >
      `;
    }
    return html`
      <sc-btn
        .btntype=${SC_BTN_TYPES.PRESET.DONE}
        @click=${() => ScPreviewCardAbilitiesOverlay._finish()}
      >
        ${Localize.localeMap.SC_BTN.PRESET.DONE}</sc-btn
      >
    `;
  }

  _noAbilitiesUsed() {
    // eslint-disable-next-line no-restricted-syntax
    for (const ability of this.selectedCard.card.abilities) {
      if (ability.used) {
        return false;
      }
    }
    return true;
  }

  static _cancel() {
    localStore.dispatch(cancelSelectedCard());
  }

  static _finish() {
    localStore.dispatch(finishUsingAbilities());
  }

  static _selectAbility(ability) {
    if (ability.used) {
      return;
    }
    localStore.dispatch(selectAbility.request(ability.id));
  }
}
