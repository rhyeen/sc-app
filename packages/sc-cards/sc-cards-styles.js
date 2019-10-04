import { css } from 'lit-element';
import { Log } from 'interface-handler/src/logger.js';
import { CardRarity } from '@shardedcards/sct-card/dist/browser/enums/sct-card-rarity.js';

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
