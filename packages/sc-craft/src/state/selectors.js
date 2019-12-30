import { createSelector } from 'reselect';
import { SELECTED_CRAFTING_COMPONENT_SOURCES } from './state-specifiers';

const _usedCraftingPartsSelector = state => state.scCraft.ui.usedCraftingParts;
const _selectedCraftingComponentSelector = state => state.scCraft.ui.selectedCraftingComponent;
const _gameSelector = state => state.scGame.entities.game;

const _forgeSelector = state => state.scCraft.entities.forge;
const _craftingBaseCardSelector = state => state.scCraft.entities.craftingBaseCard;
const _craftingPartsSelector = state => state.scCraft.entities.craftingParts;
const _isCraftingBaseCardSelectedSelector = state => state.scCraft.ui.isCraftingBaseCardSelected;
const _isForgingCraftingBaseCardSelector = state => state.scCraft.ui.isForgingCraftingBaseCard;
const _selectedForgeSlotSelector = state => state.scCraft.ui.selectedForgeSlot;
const _selectedCraftingPartSelector = state => state.scCraft.ui.selectedCraftingPart;
const _finishedForgeCardSelector = state => state.scCraft.ui.selectedForgeSlot.finishedCard;

export const getUsedCraftingParts = createSelector(
  _usedCraftingPartsSelector,
  usedCraftingParts => usedCraftingParts,
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

export const getSelectedCraftingComponent = createSelector(
  _selectedCraftingComponentSelector,
  _gameSelector,
  (selectedCraftingComponent, game) => {
    let card = null;
    if (_isSelectBaseDraftCard(selectedCraftingComponent)) {
      card = game.player.craftingTable.baseCards[selectedCraftingComponent.baseCardIndex];
    }
    return {
      ...selectedCraftingComponent,
      card,
    };
  },
);

export const getForgeSlots = createSelector(
  _forgeSelector,
  forge => forge.slots,
);

export const getCraftingBaseCard = createSelector(
  _craftingBaseCardSelector,
  craftingBaseCard => craftingBaseCard,
);

export const getCraftingParts = createSelector(
  _craftingPartsSelector,
  craftingParts => craftingParts,
);

export const emptyForgeSlots = createSelector(
  _forgeSelector,
  forge => forge.slots.findIndex(slot => !!slot.draftCard) >= 0,
);

export const isCraftingBaseCardSelected = createSelector(
  _isCraftingBaseCardSelectedSelector,
  isCraftingBaseCardSelectedBool => isCraftingBaseCardSelectedBool,
);

export const isForgingCraftingBaseCard = createSelector(
  _isForgingCraftingBaseCardSelector,
  isForgingCraftingBaseCardBool => isForgingCraftingBaseCardBool,
);

export const getFinishedForgeCard = createSelector(
  _finishedForgeCardSelector,
  finishedForgeCard => finishedForgeCard,
);

export const getSelectedForgeSlotCardSelector = createSelector(
  _selectedForgeSlotSelector,
  _forgeSelector,
  (selectedForgeSlotSelector, forgeSelector) => {
    if (
      !selectedForgeSlotSelector.forgeSlotIndex &&
      selectedForgeSlotSelector.forgeSlotIndex !== 0
    ) {
      return {
        forgeSlotIndex: null,
        draftCard: null,
      };
    }
    return {
      forgeSlotIndex: selectedForgeSlotSelector.forgeSlotIndex,
      ...forgeSelector.slots[selectedForgeSlotSelector.forgeSlotIndex],
    };
  },
);

export const getSelectedCraftingPart = createSelector(
  _selectedCraftingPartSelector,
  _forgeSelector,
  _craftingPartsSelector,
  (selectedCraftingPart, forgeSelector, craftingPartsSelector) => {
    let forgeSlot = null;
    let craftingPart = null;
    if (selectedCraftingPart.forgeSlotIndex === 0 || selectedCraftingPart.forgeSlotIndex > 0) {
      forgeSlot = { ...forgeSelector.slots[selectedCraftingPart.forgeSlotIndex] };
    }
    if (
      selectedCraftingPart.craftingPartIndex === 0 ||
      selectedCraftingPart.craftingPartIndex > 0
    ) {
      craftingPart = { ...craftingPartsSelector[selectedCraftingPart.craftingPartIndex] };
    }
    return {
      ...selectedCraftingPart,
      forgeSlot,
      craftingPart,
    };
  },
);
