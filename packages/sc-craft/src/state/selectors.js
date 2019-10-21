import { createSelector } from 'reselect';

const _forgeSelector = state => state.scCraft.entities.forge;
const _craftingBaseCardSelector = state => state.scCraft.entities.craftingBaseCard;
const _craftingPartsSelector = state => state.scCraft.entities.craftingParts;
const _isCraftingBaseCardSelectedSelector = state => state.scCraft.ui.isCraftingBaseCardSelected;
const _isForgingCraftingBaseCardSelector = state => state.scCraft.ui.isForgingCraftingBaseCard;
const _selectedForgeSlotSelector = state => state.scCraft.ui.selectedForgeSlot;
const _selectedCraftingPart = state => state.scCraft.ui.selectedCraftingPart;
const _craftingPartsUsed = state => state.scCraft.entities.craftingPartsUsed;
const _maxCraftingPartsUsed = state => state.scCraft.entities.maxCraftingPartsUsed;
const _finishedForgeCard = state => state.scCraft.ui.selectedForgeSlot.finishedCard;

export const getForgeSlots = createSelector(
  _forgeSelector,
  (forge) => forge.slots
);

export const getCraftingBaseCard = createSelector(
  _craftingBaseCardSelector,
  (craftingBaseCard) => craftingBaseCard
);

export const getCraftingParts = createSelector(
  _craftingPartsSelector,
  (craftingParts) => craftingParts
);

export const emptyForgeSlots = createSelector(
  _forgeSelector,
  (forge) => {
    for (const slot of forge.slots) {
      if (slot.draftCard) {
        return false;
      }
    }
    return true;
  }
);

export const getCraftingPartsLeftToUse = createSelector(
  _craftingPartsUsed,
  _maxCraftingPartsUsed,
  (craftingPartsUsed, maxCraftingPartsUsed) => maxCraftingPartsUsed - craftingPartsUsed
);

export const isCraftingBaseCardSelected = createSelector(
  _isCraftingBaseCardSelectedSelector,
  (isCraftingBaseCardSelected) => isCraftingBaseCardSelected
);

export const isForgingCraftingBaseCard = createSelector(
  _isForgingCraftingBaseCardSelector,
  (isForgingCraftingBaseCard) => isForgingCraftingBaseCard
);

export const getFinishedForgeCard = createSelector(
  _finishedForgeCard,
  (finishedForgeCard) => finishedForgeCard
);

export const getSelectedForgeSlotCardSelector = createSelector(
  _selectedForgeSlotSelector,
  _forgeSelector,
  (selectedForgeSlotSelector, forgeSelector) => {
    if (!selectedForgeSlotSelector.forgeSlotIndex && selectedForgeSlotSelector.forgeSlotIndex !== 0) {
      return {
        forgeSlotIndex: null,
        draftCard: null
      };
    }
    return {
      forgeSlotIndex: selectedForgeSlotSelector.forgeSlotIndex,
      ...forgeSelector.slots[selectedForgeSlotSelector.forgeSlotIndex]
    };
  }
);

export const getSelectedCraftingPartSelector = createSelector(
  _selectedCraftingPart,
  _forgeSelector,
  _craftingPartsSelector,
  (selectedCraftingPart, forgeSelector, craftingPartsSelector) => {
    let forgeSlot = null;
    let craftingPart = null;
    if (selectedCraftingPart.forgeSlotIndex === 0 || selectedCraftingPart.forgeSlotIndex > 0) {
      forgeSlot = { ...forgeSelector.slots[selectedCraftingPart.forgeSlotIndex] };
    }
    if (selectedCraftingPart.craftingPartIndex === 0 || selectedCraftingPart.craftingPartIndex > 0) {
      craftingPart = { ...craftingPartsSelector[selectedCraftingPart.craftingPartIndex] };
    }
    return {
      ...selectedCraftingPart,
      forgeSlot,
      craftingPart,
    };
  }
);