import { LitElement, html, css } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import * as Actions from '../../state/actions.js';
import * as Selectors from '../../state/selectors.js';

import { Localize } from '../../../../utils/localizer.js';

import { NAV } from '../../../sc-game-styles.js';
import { SC_BTN_TYPES } from '../../../../sc-app/src/components/shared/ScBtn.js';
import { BarItemsStyles } from '../../../../sc-app/sc-app-styles.js';

export class ScGameFooter extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        [bar-items] {
          bottom: 0;
          border-top: ${NAV.FOOTER.BORDER};
          height: ${NAV.FOOTER.HEIGHT};
        }

        sc-discard-pile-bar-item,
        sc-lost-pile-bar-item {
          margin-left: 20px;
        }
      `,
      BarItemsStyles,
    ];
  }

  render() {
    return html`
      <div bar-items>
        ${this._getBarItemsHtml()}
      </div>
    `;
  }

  static get properties() {
    return {
      _isPlayingCards: { type: Boolean },
      _isCrafting: { type: Boolean },
    };
  }

  _getBarItemsHtml() {
    if (this._isPlayingCards) {
      return ScGameFooter._getPlayingBarItemsHtml();
    }
    if (this._isCrafting) {
      return ScGameFooter._getCraftingBarItemsHtml();
    }
    // @NOTE: if the game is in the win/lose state
    return this._getPlayingBarItemsHtml();
  }

  static _getPlayingBarItemsHtml() {
    return html`
      <div class="item-group left-items">
        <sc-draw-pile-bar-item></sc-draw-pile-bar-item>
        <sc-discard-pile-bar-item></sc-discard-pile-bar-item>
        <sc-lost-pile-bar-item></cc-lost-pile-bar-item>
      </div>
      <div class="item-group right-items">
        <sc-btn
            .btntype="${SC_BTN_TYPES.PRESET.END_TURN}"
            @click="${() => ScGameFooter._endTurn()}">
          ${Localize.localeMap.SC_BTN.OTHER.END_TURN}</sc-btn>
      </div>
    `;
  }

  static _getCraftingBarItemsHtml() {
    return html`
      <div class="item-group left-items"></div>
      <div class="item-group right-items">
        <sc-btn
          .btntype="${SC_BTN_TYPES.PRESET.END_TURN}"
          @click="${() => ScGameFooter._endCrafting()}"
        >
          ${Localize.localeMap.SC_BTN.OTHER.FINISH_CRAFTING}</sc-btn
        >
      </div>
    `;
  }

  static _endTurn() {
    localStore.dispatch(Actions.endTurn.request());
  }

  static _endCrafting() {
    localStore.dispatch(Actions.endCrafting.request());
  }

  stateChanged(state) {
    this._isCrafting = Selectors.isCrafting(state);
    this._isPlayingCards = Selectors.isPlayingCards(state);
  }
}
