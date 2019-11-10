import { html, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { localStore } from '../../state/store.js';

import { HealthIcon, ScIconsStyles } from '../../../../sc-app/src/components/shared/ScIcons.js';

import * as Selector from '../../state/selectors.js';
import { BarItemStyles } from '../../../../sc-app/sc-app-styles.js';

export class ScHealthBarItem extends connect(localStore)(LitElement) {
  static get styles() {
    return [ScIconsStyles, BarItemStyles];
  }

  render() {
    return html`
      <div bar-item>
        <div class="current">${this._currentHealth}</div>
        <div class="icon">${HealthIcon()}</div>
      </div>
    `;
  }

  static get properties() {
    return {
      _currentHealth: { type: Number },
    };
  }

  stateChanged(state) {
    this._currentHealth = Selector.getCurrentHealth(state);
  }
}
