import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { APP_COLORS, SHADOW_ELEVATIONS } from '../../../sc-app-styles.js';
import { ScIconsStyles, DropdownIcon } from './ScIcons.js';
import { SC_BTN_COLORS } from './ScBtn.js';
import { Localize } from '../../../../utils/localizer.js';

const DROPDOWN = {
  SELECTED_ITEM: {
    MAX_WIDTH: css`300px`,
    HEIGHT: css`40px`,
    PADDING: css`10px`,
    BODER_RADIUS: css`4px`
  }
}

export class ScDropdown extends LitElement {
  static get styles() {
    return [
      ScIconsStyles,
      css`
        :host {
          display: block;
          max-width: ${DROPDOWN.SELECTED_ITEM.MAX_WIDTH};
        }

        [selected-item] {
          max-width: ${DROPDOWN.SELECTED_ITEM.MAX_WIDTH};
          height: calc(${DROPDOWN.SELECTED_ITEM.HEIGHT} - 2*${DROPDOWN.SELECTED_ITEM.PADDING});
          border: 1px solid ${APP_COLORS.OFF_BLACK};
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${DROPDOWN.SELECTED_ITEM.PADDING};
          border-radius: ${DROPDOWN.SELECTED_ITEM.BODER_RADIUS};
        }

        [selected-item] .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        [selected-item] .icon {
          transition: transform 0.2s;
        }

        [selected-item].opened .icon {
          transform: rotate(180deg);
        }

        [selected-item][disabled] {
          color: ${SC_BTN_COLORS.DISABLED.TEXT_COLOR};
          border-color: ${SC_BTN_COLORS.DISABLED.BACKGROUND_COLOR};
        }

        [selected-item][disabled] .icon [svg-icon] {
          fill: ${SC_BTN_COLORS.DISABLED.BACKGROUND_COLOR};
        }

        [dropdown-menu] {
          position: absolute;
          max-width: ${DROPDOWN.SELECTED_ITEM.MAX_WIDTH};
          margin-right: 10px;
          background-color: ${APP_COLORS.BASE_WHITE};
          box-shadow: ${SHADOW_ELEVATIONS.LEVEL_1.BASE};
          border-radius: ${DROPDOWN.SELECTED_ITEM.BODER_RADIUS};
          padding-bottom: 10px;
        }

        [dropdown-menu-item] {
          padding: ${DROPDOWN.SELECTED_ITEM.PADDING};
          transition: background-color 0.2s;
        }

        [dropdown-menu-item]:hover {
          background-color: ${APP_COLORS.HOVER_WHITE};
        }

        [dropdown-menu-item].selected {
          background-color: ${APP_COLORS.SELECTED_WHITE};
        }
      `,
    ];
  }

  render() {
    if (!this._selectedItem && this.items && this.items.length) {
      this._selectedItem = this.items[0];
    }

    return html`
      <div class="dropdown-wrapper" @click=${this._wasClicked}>
        ${this._getSelectedItemHtml()}
        ${this._getDropdownMenuHtml()}
      </div>
    `;
  }

  static get properties() {
    return {
      items: { type: Array },
      loading: { type: Boolean },
      _selectedItem: { type: Object },
      _isOpen: { type: Boolean }
    };
  }

  constructor() {
    super();
    this._isOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', () => this._handleClick());
  }

  disconnectedCallback() {
    document.removeEventListener('click', () => this._handleClick());
    super.disconnectedCallback();
  }

  _getSelectedItemHtml() {
    if (this.loading) {
      return html`
        <div selected-item disabled>
          <div class="text"><sc-loading .text=${Localize.localeMap.SC_GAME.LOADING} reduced></sc-loading></div>
          <div class="icon">${DropdownIcon()}</div>
        </div>
      `;
    }
    const classes = {
      opened: !!this._isOpen
    };
    return html`
      <div selected-item class=${classMap(classes)} @click=${() => this._isOpen = true}>
        <div class="text">${this._selectedItem}</div>
        <div class="icon">${DropdownIcon()}</div>
      </div>
    `;
  }

  _getDropdownMenuHtml() {
    if (!this._isOpen) {
      return html``;
    }
    return html`
      <div dropdown-menu>
        ${this.items.map(item => this._getDropdownItemHtml(item))}
      </div>
    `;
  }

  _getDropdownItemHtml(item) {
    const classes = {
      selected: item === this._selectedItem
    };
    return html`
      <div
        dropdown-menu-item
        class=${classMap(classes)}
        @click=${(e) => this._selectItem(e, item)}>${item}</div>
    `;
  }

  _selectItem(event, item) {
    event.stopPropagation();
    this._selectedItem = item;
    this._isOpen = false;
    const newEvent = new CustomEvent('select-item', {
      detail: {
        item
      }
    });
    this.dispatchEvent(newEvent);
  }

  _wasClicked(event) {
    event.stopPropagation();
    this._timesClickedInside += 1;
  }

  _handleClick() {
    // @NOTE: since we perform event.stopPropogation on any clicks within this element, 
    // then we can assume any globally triggered mouse click is a click outside of this element
    this._isOpen = false;
  }
}
