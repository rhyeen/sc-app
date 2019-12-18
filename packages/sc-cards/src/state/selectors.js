import { createSelector } from 'reselect';
import { CARD_SOURCES } from './state-specifiers';

const _selectedCardSelector = state => state.scCards.ui.selectedCard;
const _selectedAbilitySelector = state => state.scCards.ui.selectedAbility;
const _gameSelector = state => state.scGame.entities.game;

function _validIndex(index) {
  return index || index === 0;
}

function _isSelectHandCard(selectedCard) {
  return _validIndex(selectedCard.handCardIndex) && selectedCard.source === CARD_SOURCES.SELECT_PLAYER_HAND_CARD;
}

function _isSelectPlayerFieldSlotCard(selectedCard) {
  return _validIndex(selectedCard.fieldSlotIndex) && selectedCard.source === CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD;
}

function _isSelectDungeonFieldSlotCard(selectedCard) {
  return _validIndex(selectedCard.fieldSlotIndex) && selectedCard.source === CARD_SOURCES.SELECT_DUNGEON_FIELD_SLOT_CARD;
}

export const getSelectedCard = createSelector(
  _selectedCardSelector,
  _gameSelector,
  (selectedCard, game) => {
    let card = null;
    if (_isSelectHandCard(selectedCard)) {
      card = game.player.hand.cards[selectedCard.handCardIndex];
    } else if (_isSelectPlayerFieldSlotCard(selectedCard)) {
      card = game.player.field[selectedCard.fieldSlotIndex].card;
    } else if (_isSelectDungeonFieldSlotCard(selectedCard)) {
      card = game.dungeon.field[selectedCard.fieldSlotIndex].card;
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
  (selectedCard, selectedAbility) => ({
      ...selectedCard,
      ...selectedAbility,
      card: selectedCard.card,
      ability: card.getAbility(selectedAbility.abilityId),
    }),
);
