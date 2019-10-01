import { LitElement, html, css } from 'lit-element';
import { Localize } from '../../../utils/localizer.js';

export class Sc404 extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          padding: 40px;
        }
      `,
    ];
  }

  render() {
    return html`
      <h1>${Localize.localeMap.SC_ROOT.PAGE_NOT_FOUND.P1}</h1>
      <h2>${Localize.localeMap.SC_ROOT.PAGE_NOT_FOUND.P2}</h2>
    `;
  }
}
