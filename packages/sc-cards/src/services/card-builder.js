import { CardBuilder as TypedCardBuilder } from '@shardedcards/sc-types/dist/card/services/card-builder.js';

export class CardBuilder {
  static buildCard(cardSetsData, cardId, cardInstance) {
    if (!cardId || !cardSetsData[cardId] || !cardSetsData[cardId].instances) {
      return null;
    }
    const cardData = cardSetsData[cardId].instances[cardInstance];
    return TypedCardBuilder.buildCard(cardData);
  }
}
