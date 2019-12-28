import { html, css, LitElement } from 'lit-element';
import { ForgeIcon, ScIconsStyles } from '../../../../../sc-app/src/components/shared/ScIcons.js';
import { FORGE } from '../../sc-craft-styles.js';

export class ScForgeSlotMold extends LitElement {
  static get styles() {
    return [
      ScIconsStyles,
      css`
        [forge-mold] {
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${FORGE.WIDTH};
          height: ${FORGE.HEIGHT};
          padding: ${FORGE.PADDING};
          box-shadow: ${FORGE.ELEVATION};
          border-radius: ${FORGE.BORDER_RADIUS};
          background-color: ${FORGE.BACKGROUND_COLOR};
        }

        [svg-icon] {
          width: ${FORGE.ICON.WIDTH};
          height: ${FORGE.ICON.HEIGHT};
          fill: ${FORGE.ICON.COLOR};
          margin-left: -4px; /* the anvil icon just appears a bit off-center */
        }
      `
    ]
  }

  render() {
    return html`
      <div forge-mold>${ForgeIcon()}</div>
    `;
  }
}
