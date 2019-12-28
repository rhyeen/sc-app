import { css } from 'lit-element';

export const AREAS = {
  CRAFTING_PARTS: {
    HEIGHT: css`240px`,
  },
  CRAFTING_AREA: {
    PADDING: css`10px`
  }
};

export const FORGE = {
  WIDTH: css`90px`,
  HEIGHT: css`130px`,
  ELEVATION: css`inset 1px 1px 5px rgba(0, 0, 0, 0.4)`,
  BACKGROUND_COLOR: css`#ECEFF1`,
  BORDER_RADIUS: css`12px;`, // NOTE: a normal card's is 8px, so 12px seems to work well for correct corner bubble.
  PADDING: css`4px`,
  ICON: {
    WIDTH: css`32px`,
    HEIGHT: css`32px`,
    COLOR: css`#CFD8DC`,
  }
};
