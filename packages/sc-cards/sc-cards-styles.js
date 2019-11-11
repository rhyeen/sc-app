import { css } from 'lit-element';
import { Log } from 'interface-handler/src/logger.js';
import { CardRarity } from '@shardedcards/sc-types/dist/card/enums/card-rarity.js';

export const CARD_RARITIES = {
  UNDEFINED: {
    COLOR: css`#EFEBE9`,
  },
  COMMON: {
    COLOR: css`#B0BEC5`,
  },
  RARE: {
    COLOR: css`#64B5F6`,
  },
  EPIC: {
    COLOR: css`#BA68C8`,
  },
  LEGENDARY: {
    COLOR: css`#FFD54F`,
  },
  STANDARD: {
    COLOR: css`#B2DFDB`,
  },
};

export function CardRarityColor(rarity) {
  switch (rarity) {
    case CardRarity.Undefined:
      return CARD_RARITIES.UNDEFINED.COLOR;
    case CardRarity.Common:
      return CARD_RARITIES.COMMON.COLOR;
    case CardRarity.Rare:
      return CARD_RARITIES.RARE.COLOR;
    case CardRarity.Epic:
      return CARD_RARITIES.EPIC.COLOR;
    case CardRarity.Legendary:
      return CARD_RARITIES.LEGENDARY.COLOR;
    case CardRarity.Standard:
      return CARD_RARITIES.STANDARD.COLOR;
    default:
      Log.error(`undefined rarity: ${rarity}`);
      return CARD_RARITIES.COMMON.COLOR;
  }
}

const CARDS_MINION_HEIGHT = css`130px`;
const CARDS_MINION_WIDTH = css`90px`;
const CARDS_MINION_BORDER_RADIUS = css`8px`;
const CARDS_MINION_BORDER_SIZE = css`8px`;

export const CARDS = {
  HAND: {
    WIDTH: css`350px`,
    HOVER_RAISE_HEIGHT: css`10px`,
    HEIGHT: css`32px`,
    PADDING: css`16px`,
    ELEVATION: css`0px -4px 20px rgba(0, 0, 0, 0.15)`,
    BORDER_RADIUS: css`16px`,
  },
  MINION: {
    WIDTH: CARDS_MINION_WIDTH,
    PADDING: css`4px`,
    HEIGHT: CARDS_MINION_HEIGHT,
    ELEVATION: css`1px 1px 5px rgba(0, 0, 0, 0.4)`,
    BORDER_RADIUS: CARDS_MINION_BORDER_RADIUS,
    EXHAUSTED_OPACITY_VALUE: css`0.5`,
  },
  MINION_COVER: {
    HEIGHT: CARDS_MINION_HEIGHT,
    WIDTH: CARDS_MINION_WIDTH,
    PADDING: css`8px`,
    BORDER_RADIUS: CARDS_MINION_BORDER_RADIUS,
    PLACE_MINION_BORDER: css`${CARDS_MINION_BORDER_SIZE} dashed #8D6E63`,
    CAST_TARGET_MINION_BORDER: css`${CARDS_MINION_BORDER_SIZE} dashed #7E57C2`,
    ATTACK_MINION_BORDER: css`${CARDS_MINION_BORDER_SIZE} dashed #E53935`,
    BACKGROUND_COLOR: rgba(255, 255, 255, 0.5),
    BORDER_SIZE: CARDS_MINION_BORDER_SIZE
  }
};

const PLAY_AREA_SEPARATOR_BORDER_SIZE = css`2px`;

export const AREAS = {
  PLAYER_HAND: {
    HEIGHT: css`calc(5*${CARDS.HAND.HEIGHT} + 4px)`, // 4px = last card's extra height
    MARGIN: css`10px`,
  },
  PLAY_AREA: {
    MAX_WIDTH: css`500px`,
    SEPARATOR: {
      BORDER_SIZE: PLAY_AREA_SEPARATOR_BORDER_SIZE,
      BORDER: css`
        ${PLAY_AREA_SEPARATOR_BORDER_SIZE} solid #EEEEEE
      `,
      HEIGHT: css`8px`,
    },
  },
};
