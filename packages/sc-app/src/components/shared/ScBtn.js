import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { Log } from 'interface-handler/src/logger.js';
import { SHADOW_ELEVATIONS } from '../../../sc-app-styles.js';

export const SC_BTN_TYPES = {
  PRESET: {
    BACK: 'btn-back',
    CANCEL: 'btn-cancel',
    DONE: 'btn-done',
    END_TURN: 'btn-endturn',
  },
  GENERIC: {
    WARNING: 'btn-warning',
    PRIMARY: 'btn-primary',
    SECONDARY: 'btn-secondary',
    BACK: 'btn-back', // intentionally have this in both GENERIC and PRESET since the PRESET would be the literally 'back' button
  },
};

// @NOTE: this is to ensure SC_BTN_COLORS is rendered all at once for IDE autofill.
const SC_BTN_COLORS_TMP = {
  DARK_BTN_TEXT_COLOR: css`#FFF`,
  LIGHT_BTN_TEXT_COLOR: css`#212121`,
};

export const SC_BTN_COLORS = {
  PRIMARY: {
    TEXT_COLOR: SC_BTN_COLORS_TMP.DARK_BTN_TEXT_COLOR,
    BACKGROUND_COLOR: css`#2196F3`,
  },
  SECONDARY: {
    TEXT_COLOR: SC_BTN_COLORS_TMP.DARK_BTN_TEXT_COLOR,
    BACKGROUND_COLOR: css`#B0BEC5`,
  },
  BACK: {
    TEXT_COLOR: SC_BTN_COLORS_TMP.DARK_BTN_TEXT_COLOR,
    BACKGROUND_COLOR: css`#424242`,
  },
  WARNING: {
    TEXT_COLOR: SC_BTN_COLORS_TMP.DARK_BTN_TEXT_COLOR,
    BACKGROUND_COLOR: css`#f44336`,
  },
  DISABLED: {
    TEXT_COLOR: css`#9E9E9E`,
    BACKGROUND_COLOR: css`#BDBDBD`,
  },
  DARK_BTN_TEXT_COLOR: SC_BTN_COLORS_TMP.DARK_BTN_TEXT_COLOR,
  LIGHT_BTN_TEXT_COLOR: SC_BTN_COLORS_TMP.LIGHT_BTN_TEXT_COLOR,
};

export const ScBtnStyles = css`
  button {
    cursor: pointer;
    border: none;
    line-height: 40px;
    font-size: 18px;
    text-transform: uppercase;
    border-radius: 4px;
    padding: 0 16px;
    font-weight: 500;
    box-shadow: ${SHADOW_ELEVATIONS.LEVEL_1.BASE};
  }

  button:hover {
    box-shadow: ${SHADOW_ELEVATIONS.LEVEL_1.HOVER};
  }

  button:active {
    box-shadow: ${SHADOW_ELEVATIONS.LEVEL_1.INSET};
  }

  button.btn-warning {
    background-color: ${SC_BTN_COLORS.WARNING.BACKGROUND_COLOR};
    color: ${SC_BTN_COLORS.WARNING.TEXT_COLOR};
  }

  button.btn-warning .button-svg-icon {
    fill: ${SC_BTN_COLORS.WARNING.TEXT_COLOR};
  }

  button.btn-back {
    background-color: ${SC_BTN_COLORS.BACK.BACKGROUND_COLOR};
    color: ${SC_BTN_COLORS.BACK.TEXT_COLOR};
  }

  button.btn-back .button-svg-icon {
    fill: ${SC_BTN_COLORS.BACK.TEXT_COLOR};
  }

  button.btn-primary {
    background-color: ${SC_BTN_COLORS.PRIMARY.BACKGROUND_COLOR};
    color: ${SC_BTN_COLORS.PRIMARY.TEXT_COLOR};
  }

  button.btn-primary .button-svg-icon {
    fill: ${SC_BTN_COLORS.PRIMARY.TEXT_COLOR};
  }

  button.btn-secondary {
    background-color: ${SC_BTN_COLORS.SECONDARY.BACKGROUND_COLOR};
    color: ${SC_BTN_COLORS.SECONDARY.TEXT_COLOR};
  }

  button.btn-secondary .button-svg-icon {
    fill: ${SC_BTN_COLORS.SECONDARY.TEXT_COLOR};
  }

  button[disabled] {
    background-color: ${SC_BTN_COLORS.DISABLED.BACKGROUND_COLOR};
    color: ${SC_BTN_COLORS.DISABLED.TEXT_COLOR};
    box-shadow: none;
  }

  button[disabled]:hover {
    box-shadow: none;
  }

  button[disabled]:active {
    box-shadow: none;
  }

  button[disabled] .button-svg-icon {
    fill: ${SC_BTN_COLORS.DISABLED.TEXT_COLOR};
  }
`;

export class ScBtn extends LitElement {
  static get styles() {
    return [
      css`
        button.btn-endturn {
          padding: 8px 12px;
          line-height: 20px;
          font-size: 16px;
        }

        .click-propagation-prevention {
          display: inline;
        }
      `,
      ScBtnStyles,
    ];
  }

  render() {
    return html`
      <div class="click-propagation-prevention" @click="${this._handleDisabledPropogation}">
        <button class=${this._getBtnClasses()} ?disabled="${this.disabled}"><slot></slot></button>
      </div>
    `;
  }

  static get properties() {
    return {
      btntype: { type: String },
      disabled: { type: Boolean },
    };
  }

  _handleDisabledPropogation(e) {
    if (!this.disabled) {
      return;
    }
    e.stopPropagation();
  }

  _getBtnClasses() {
    switch (this.btntype) {
      case SC_BTN_TYPES.GENERIC.PRIMARY:
        return classMap({'btn-primary': true });
      case SC_BTN_TYPES.GENERIC.SECONDARY:
        return classMap({'btn-secondary': true });
      case SC_BTN_TYPES.GENERIC.WARNING:
        return classMap({'btn-warning': true });
      case SC_BTN_TYPES.GENERIC.BACK:
        return classMap({'btn-back': true });
      case SC_BTN_TYPES.PRESET.BACK:
        return classMap({'btn-back': true });
      case SC_BTN_TYPES.PRESET.CANCEL:
        return classMap({'btn-warning': true, 'btn-cancel': true });
      case SC_BTN_TYPES.PRESET.END_TURN:
        return classMap({'btn-secondary': true, 'btn-endturn': true });
      case SC_BTN_TYPES.PRESET.DONE:
        return classMap({'btn-primary': true, 'btn-done': true });
      default:
        Log.error(`invalid btntype: ${this.btntype}`);
        return classMap({'btn-secondary': true });
    }
  }

  __getClasses(currentPage, thisPage) {
    return classMap({ active: currentPage === thisPage });
  }
}
