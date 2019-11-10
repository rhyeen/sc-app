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

export const CARDS = {
  HAND: {
    WIDTH: css`350px`,
    HOVER_RAISE_HEIGHT: css`10px`,
    HEIGHT: css`32px`,
    PADDING: css`16px`,
    ELEVATION: css`0px -4px 20px rgba(0, 0, 0, 0.15)`,
    BORDER_RADIUS: css`16px`,
  },
};

export const AREAS = {
  PLAYER_HAND: {
    HEIGHT: css`calc(5*${CARDS.HAND.HEIGHT} + 4px)`, // 4px = last card's extra height
    MARGIN: css`10px`,
  },
};
