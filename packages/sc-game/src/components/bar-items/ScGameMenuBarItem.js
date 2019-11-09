import { html, LitElement } from 'lit-element';
import { MenuIcon, ScIconsStyles } from '../../../../sc-app/src/components/shared/ScIcons.js';

export class ScGameMenuBarItem extends LitElement {
  static get styles() {
    return [ScIconsStyles];
  }

  render() {
    return html`
      <div bar-item>${MenuIcon()}</div>
    `;
  }
}
