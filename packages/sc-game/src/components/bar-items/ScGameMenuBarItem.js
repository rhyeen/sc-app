import { html, LitElement } from 'lit-element';
import { MenuIcon, ScIconsStyles } from '../../../../sc-app/src/components/shared/ScIcons.js';

import { BarItemStyles } from '../../../../sc-app/sc-app-styles.js';

export class ScGameMenuBarItem extends LitElement {
  static get styles() {
    return [ScIconsStyles, BarItemStyles];
  }

  render() {
    return html`
      <div bar-item>${MenuIcon()}</div>
    `;
  }
}
