import { css } from 'lit-element';
import { CARDS } from '../../../../../sc-cards/sc-cards-styles.js';

export const DRAFT_CARDS = {
  FORGE_COVER: {
    FORGE_BASE_DRAFT_CARD_BORDER: css`
      ${CARDS.MINION_COVER.BORDER_SIZE} dashed #8D6E63
    `,
    BACKGROUND_COLOR: CARDS.MINION_COVER.BACKGROUND_COLOR,
    BORDER_SIZE: CARDS.MINION_COVER.BORDER_SIZE,
  },
};

export const ScCoverForgeCardStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    width: calc(${CARDS.MINION_COVER.WIDTH} - 2 * ${CARDS.MINION_COVER.PADDING});
    height: calc(${CARDS.MINION_COVER.HEIGHT} - 2 * ${CARDS.MINION_COVER.PADDING});
    border-radius: ${CARDS.MINION_COVER.BORDER_RADIUS};
    padding: ${CARDS.MINION_COVER.PADDING};
    background-color: ${CARDS.MINION_COVER.BACKGROUND_COLOR};
  }

  [crafting-cover-separator] {
    flex: 0, 0, ${CARDS.MINION_COVER.BORDER_SIZE};
    width: 100%;
  }

  [crafting-cover-top],
  [crafting-cover-bottom] {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;
