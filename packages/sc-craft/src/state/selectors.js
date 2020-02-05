import { createSelector } from 'reselect';
import { SELECTED_CRAFTING_COMPONENT_SOURCES } from './state-specifiers.js';

const _usedCraftingPartsSelector = state => state.scCraft.ui.usedCraftingParts;
const _selectedCraftingComponentSelector = state => state.scCraft.ui.selectedCraftingComponent;
const _finalizedCardSelector = state => state.scCraft.ui.finalizedCard;
const _modifiedCardSelector = state => state.scCraft.ui.modifiedCard;
const _gameSelector = state => state.scGame.entities.game;

export const getUsedCraftingParts = createSelector(
  _usedCraftingPartsSelector,
  usedCraftingParts => usedCraftingParts,
);

export const getModifiedCard = createSelector(
  _modifiedCardSelector,
  modifiedCard => modifiedCard,
);

export const getFinalizedCard = createSelector(
  _finalizedCardSelector,
  finalizedCard => finalizedCard,
);

function _validIndex(index) {
  return index || index === 0;
}

function _isSelectBaseDraftCard(selectedCraftingComponent) {
  return (
    _validIndex(selectedCraftingComponent.baseCardIndex) &&
    selectedCraftingComponent.source === SELECTED_CRAFTING_COMPONENT_SOURCES.SELECT_BASE_DRAFT_CARD
  );
}

function _isSelectForgeDraftCard(selectedCraftingComponent) {
  return (
    _validIndex(selectedCraftingComponent.forgeSlotIndex) &&
    selectedCraftingComponent.source === SELECTED_CRAFTING_COMPONENT_SOURCES.SELECT_FORGE_SLOT
  );
}

function _isSelectCraftingPart(selectedCraftingComponent) {
  return (
    _validIndex(selectedCraftingComponent.craftingPartIndex) &&
    selectedCraftingComponent.source === SELECTED_CRAFTING_COMPONENT_SOURCES.SELECT_CRAFTING_PART
  );
}

export const getSelectedCraftingComponent = createSelector(
  _selectedCraftingComponentSelector,
  _gameSelector,
  (selectedCraftingComponent, game) => {
    let card = null;
    let craftingPart = null;
    if (_isSelectBaseDraftCard(selectedCraftingComponent)) {
      card = game.player.craftingTable.baseCards[selectedCraftingComponent.baseCardIndex];
    }
    if (_isSelectForgeDraftCard(selectedCraftingComponent)) {
      card = game.player.craftingTable.forge[selectedCraftingComponent.forgeSlotIndex].card;
    }
    if (_isSelectCraftingPart(selectedCraftingComponent)) {
      if (_validIndex(selectedCraftingComponent.forgeSlotIndex)) {
        card = game.player.craftingTable.forge[selectedCraftingComponent.forgeSlotIndex].card;
      }
      craftingPart =
        game.player.craftingTable.craftingParts[selectedCraftingComponent.craftingPartIndex];
    }
    return {
      ...selectedCraftingComponent,
      card,
      craftingPart,
    };
  },
);
