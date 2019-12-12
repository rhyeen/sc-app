import { css } from 'lit-element';
import { CARDS } from '../../../../sc-cards-styles.js';

export const ScCoverFieldCardStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    width: calc(${CARDS.MINION_COVER.WIDTH} - 2*${CARDS.MINION_COVER.PADDING});
    height: calc(${CARDS.MINION_COVER.HEIGHT} - 2*${CARDS.MINION_COVER.PADDING});
    border-radius: ${CARDS.MINION_COVER.BORDER_RADIUS};
    padding: ${CARDS.MINION_COVER.PADDING};
    background-color: ${CARDS.MINION_COVER.BACKGROUND_COLOR};
  }

  [minion-cover-separator] {
    flex: 0, 0, ${CARDS.MINION_COVER.BORDER_SIZE};
    width: 100%;
  }

  [minion-cover-top],
  [minion-cover-bottom] {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;