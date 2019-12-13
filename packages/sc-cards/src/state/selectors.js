import { createSelector } from 'reselect';

const _selectedCardSelector = state => state.scCards.ui.selectedCard;
const _selectedAbilitySelector = state => state.scCards.ui.selectedAbility;
const _gameSelector = state => state.scGame.entities.game;

export const getSelectedCard = createSelector(
  _selectedCardSelector,
  _gameSelector,
  (selectedCard, game) => {
    let card = null;
    if (selectedCard.handCardIndex || selectedCard.handCardIndex === 0) {
      card = game.player.hand.cards[selectedCard.handCardIndex];
    }
    return {
      ...selectedCard,
      card,
    }
  },
);

export const getSelectedAbility = createSelector(
  _selectedCardSelector,
  _selectedAbilitySelector,
  (selectedCard, selectedAbility) => {
    return {
      ...selectedCard,
      ...selectedAbility,
      card: selectedCard.card,
      ability: card.getAbility(selectedAbility.abilityId),
    };
  },
);
