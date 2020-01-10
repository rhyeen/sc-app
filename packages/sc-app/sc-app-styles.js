import { css } from 'lit-element';

const NEAR_BLACK = css`#222426`;

export const APP_COLORS = {
  NEAR_BLACK,
  NEAR_WHITE: css`#F7FBFF`,
  HOVER_WHITE: css`#EAEDED`,
  SELECTED_WHITE: css`#EAF2F8`,
  BASE_WHITE: css`#FFF`,
  NEAR_WHITE_BORDER: css`#E7EBEF`,
  OFF_BLACK: css`#525456`,
  HINT_GRAY: css`#798183`,
  OVERLAY_BLACK: css`rgba(0, 0, 0, 0.5)`,
  OVERLAY_WHITE: css`rgba(255, 255, 255, 0.8)`,
  OVERLAY_CARD_WHITE: css`rgba(255, 255, 255, 0.5)`,
  SVG_DEFAULT: NEAR_BLACK,
  PRIMARY_BLUE: css`#2196F3`,
  ABILITY_CAST: css`#7E57C2`,
};

export const SHADOW_ELEVATIONS = {
  LEVEL_1: {
    BASE: css`1px 1px 5px rgba(0, 0, 0, 0.4)`,
    INSET: css`inset 1px 1px 5px rgba(0, 0, 0, 0.4)`,
    HOVER: css`
      1px 1px 5px rgba(0, 0, 0, 0.4),
        inset 0px 0px 80px rgba(0, 0, 0, 0.1)
    `,
  },
  SIDE_BAR: {
    BASE: css`-2px 0px 10px rgba(0, 0, 0, 0.1)`,
  },
};

export const BarItemsStyles = css`
  [bar-items] {
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
    background-color: ${APP_COLORS.BASE_WHITE};
    align-items: center;
  }

  [bar-items] .item-group {
    display: flex;
    align-items: center;
  }
`;

export const BarItemStyles = css`
  [bar-item] {
    display: flex;
    align-items: center;
    font-size: 18px;
  }
`;
