import { createSelector } from 'reselect';
import { getCard, getCardAbility } from '../services/card-selection.js';

const _playerDeckSelector = state => state.scCards.entities.player.deck;
const _playerDiscardPileCardsSelector = state => state.scCards.entities.player.discardPile.cards;
const _playerLostCardsSelector = state => state.scCards.entities.player.lostCards.cards;
const _selectedCardSelector = state => state.scCards.ui.selectedCard;
const _selectedAbilitySelector = state => state.scCards.ui.selectedAbility;
const _cardsSelector = state => state.scCards.entities.cards;
const _playerHandCardsSelector = state => state.scCards.entities.player.hand.cards;
const _playerHandRefillSizeSelector = state => state.scCards.entities.player.hand.refillSize;
const _playerFieldSlotsSelector = state => state.scCards.entities.player.field.slots;
const _opponentFieldSlotsSelector = state => state.scCards.entities.opponent.field.slots;
const _opponentFieldBacklogSelector = state => state.scCards.entities.opponent.field.backlog;

export const getCards = createSelector(
  _cardsSelector,
  (cards) => cards
);

function _getHandCard(handCard, cards) {
  return {
    ...handCard,
    card: getCard(cards, handCard.id, handCard.instance)
  };
}

export const getHandCards = createSelector(
  _playerHandCardsSelector,
  _cardsSelector,
  (hand, cards) => {
    const handCards = [];
    hand.forEach(handCard => handCards.push(_getHandCard(handCard, cards)));
    return handCards;
  }
);

export const getHandRefillSize = createSelector(
  _playerHandRefillSizeSelector,
  (playerHandRefillSizeSelector) => playerHandRefillSizeSelector
);

export const getDeckSize = createSelector(
  _playerDeckSelector,
  (deck) => deck.size
);

export const getDiscardPileCards = createSelector(
  _playerDiscardPileCardsSelector,
  (discardPileCards) => discardPileCards
);

export const getDiscardPileSize = createSelector(
  _playerDiscardPileCardsSelector,
  (discardPileCards) => discardPileCards.length
);

export const getLostPileSize = createSelector(
  _playerLostCardsSelector,
  (lostCards) => lostCards.length
);

export const getLostPileCards = createSelector(
  _playerLostCardsSelector,
  (lostCards) => lostCards
);

export const getSelectedCard = createSelector(
  _selectedCardSelector,
  _cardsSelector,
  (selectedCard, cards) => ({
      ...selectedCard,
      card: getCard(cards, selectedCard.id, selectedCard.instance)
    })
);

export const getSelectedAbility = createSelector(
  _selectedCardSelector,
  _selectedAbilitySelector,
  _cardsSelector,
  (selectedCard, selectedAbility, cards) => ({
      ...selectedCard,
      ...selectedAbility,
      card: getCard(cards, selectedCard.id, selectedCard.instance),
      ability: getCardAbility(cards, selectedCard.id, selectedCard.instance, selectedAbility.abilityId)
    })
);

function _getFieldSlot(fieldSlots, playAreaIndex, cards) {
  return {
    ...fieldSlots[playAreaIndex],
    playAreaIndex,
    card: getCard(cards, fieldSlots[playAreaIndex].id, fieldSlots[playAreaIndex].instance)
  };
}

function _getFieldSlots(fieldSlots, cards) {
  return [
    _getFieldSlot(fieldSlots, 0, cards),
    _getFieldSlot(fieldSlots, 1, cards),
    _getFieldSlot(fieldSlots, 2, cards)
  ];
}

export const getPlayerFieldSlots = createSelector(
  _playerFieldSlotsSelector,
  _cardsSelector,
  (fieldSlots, cards) => _getFieldSlots(fieldSlots, cards)
);

export const getOpponentFieldSlots = createSelector(
  _opponentFieldSlotsSelector,
  _cardsSelector,
  (fieldSlots, cards) => _getFieldSlots(fieldSlots, cards)
);

export const getOpponentFieldBacklogSizes = createSelector(
  _opponentFieldBacklogSelector,
  (backlog) => [
      backlog[0].size,
      backlog[1].size,
      backlog[2].size
    ]
);
