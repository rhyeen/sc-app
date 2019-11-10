import { html, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import { EnergyIcon, ScIconsStyles } from '../../../../sc-app/src/components/shared/ScIcons.js';

import * as Selector from '../../state/selectors.js';
import { BarItemStyles } from '../../../../sc-app/sc-app-styles.js';

export class ScEnergyBarItem extends connect(localStore)(LitElement) {
  static get styles() {
    return [ScIconsStyles, BarItemStyles];
  }

  render() {
    return html`
      <div bar-item>
        <div class="current">${this._currentEnergy}</div>
        <div class="current-max-divider">/</div>
        <div class="max">${this._maxEnergy}</div>
        <div class="icon">${EnergyIcon()}</div>
      </div>
    `;
  }

  static get properties() {
    return {
      _currentEnergy: { type: Number },
      _maxEnergy: { type: Number },
    };
  }

  stateChanged(state) {
    this._currentEnergy = Selector.getCurrentEnergy(state);
    this._maxEnergy = Selector.getMaxEnergy(state);
  }
}
