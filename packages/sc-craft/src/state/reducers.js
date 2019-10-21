import * as Actions from './actions.js';

const INITIAL_STATE = _resetState();

function _resetState() {
  return {
    ui: {
      selectedCraftingPart: {
        craftingPartIndex: null,
        forgeSlotIndex: null
      },
      selectedForgeSlot: {
        forgeSlotIndex: null,
        finishedCard: null
      },
      isCraftingBaseCardSelected: false,
      isForgingCraftingBaseCard: false
    },
    entities: {
      forge: {
        slots: [
          {
            draftCard: null
          },
          {
            draftCard: null
          }
        ]
      },
      craftingBaseCard: null,
      craftingParts: [],
      craftingPartsUsed: 0,
      maxCraftingPartsUsed: 1,
    }
  };
}

function _setSelectedCraftingPart(state, craftingPartIndex, forgeSlotIndex) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCraftingPart: {
        craftingPartIndex,
        forgeSlotIndex
      }
    }
  };
}

function _removeSelectedCraftingPart(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCraftingPart: {
        craftingPartIndex: null,
        forgeSlotIndex: null
      }
    }
  };
}

function _setSelectedForgeSlot(state, forgeSlotIndex) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedForgeSlot: {
        forgeSlotIndex,
        finishedCard: null
      }
    }
  };
}

function _removeSelectedForgeSlot(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedForgeSlot: {
        forgeSlotIndex: null,
        finishedCard: null
      }
    }
  };
}

function _setIsCraftingBaseCardSelected(state, isCraftingBaseCardSelected) {
  return {
    ...state,
    ui: {
      ...state.ui,
      isCraftingBaseCardSelected
    }
  };
}

function _setFinishedForgeCard(state, finishedCard) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedForgeSlot: {
        ...state.ui.selectedForgeSlot,
        finishedCard
      }
    }
  };
}

function _setIsForgingCraftingBaseCard(state, isForgingCraftingBaseCard) {
  return {
    ...state,
    ui: {
      ...state.ui,
      isForgingCraftingBaseCard
    }
  };
}

function _setForgeSlotCards(state, draftCards) {
  for (let i = 0; i < draftCards.length; i++) {
    state = _setForgeSlotCard(state, i, draftCards[i]);
  }
  return state;
}

function _setForgeSlotCard(state, forgeSlotIndex, draftCard) {
  state = _shallowCopyForgeSlots(state);
  state.entities.forge.slots[forgeSlotIndex] = {
    ...state.entities.forge.slots[forgeSlotIndex],
    draftCard
  };
  return state;
}

function _shallowCopyForgeSlots(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      forge: {
        ...state.entities.forge,
        slots: [...state.entities.forge.slots]
      }
    }
  };
}

function _setCraftingBaseCard(state, craftingBaseCard) {
  return {
    ...state,
    entities: {
      ...state.entities,
      craftingBaseCard
    }
  };
}

function _setCraftingParts(state, craftingParts) {
  return {
    ...state,
    entities: {
      ...state.entities,
      craftingParts
    }
  };
}

function _removeCraftingPart(state, craftingPartIndex) {
  const craftingParts = [...state.entities.craftingParts];
  craftingParts.splice(craftingPartIndex, 1);
  return {
    ...state,
    entities: {
      ...state.entities,
      craftingParts
    }
  };
}

function _setCraftingPartsUsed(state, craftingPartsUsed) {
  return {
    ...state,
    entities: {
      ...state.entities,
      craftingPartsUsed,
    }
  };
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SELECT_CRAFTING_BASE_CARD:
      return _setIsCraftingBaseCardSelected(state, true);
    case Actions.CANCEL_SELECT_CRAFTING_BASE_CARD:
      return _setIsCraftingBaseCardSelected(state, false);
    case Actions.SELECT_FORGE_SLOT:
      return _setSelectedForgeSlot(state, action.forgeSlotIndex);
    case Actions.CANCEL_SELECT_FORGE_SLOT:
      return _removeSelectedForgeSlot(state);
    case Actions.SELECT_CRAFTING_PART:
      return _setSelectedCraftingPart(state, action.craftingPartIndex, null);
    case Actions.CANCEL_SELECT_CRAFTING_PART:
      return _removeSelectedCraftingPart(state);
    case Actions.SET_CRAFTING_BASE_CARD.SUCCESS:
      return _setCraftingBaseCard(state, action.craftingBaseCard);
    case Actions.SET_CRAFTING_PARTS.SUCCESS:
      state = _setCraftingPartsUsed(state, 0);
      return _setCraftingParts(state, action.craftingParts);
    case Actions.FINISH_ADD_CRAFTING_PART.SUCCESS:
      state = _setForgeSlotCard(state, state.ui.selectedCraftingPart.forgeSlotIndex, action.draftCard);
      state = _removeCraftingPart(state, state.ui.selectedCraftingPart.craftingPartIndex);
      state = _setCraftingPartsUsed(state, state.entities.craftingPartsUsed + 1);
      return _removeSelectedCraftingPart(state);
    case Actions.FORGE_SELECTED_CRAFTING_BASE_CARD:
      state = _setIsForgingCraftingBaseCard(state, true);
      return _setIsCraftingBaseCardSelected(state, false);
    case Actions.CANCEL_FORGE_SELECTED_CRAFTING_BASE_CARD:
      return _setIsForgingCraftingBaseCard(state, false);
    case Actions.FINISH_FORGE_SELECTED_CRAFTING_BASE_CARD.SUCCESS:
      state = _setForgeSlotCard(state, action.forgeSlotIndex, state.entities.craftingBaseCard);
      state = _setIsForgingCraftingBaseCard(state, false);
      return _setCraftingBaseCard(state, null);
    case Actions.ADD_CRAFTING_PART:
      return _setSelectedCraftingPart(state, state.ui.selectedCraftingPart.craftingPartIndex, action.forgeSlotIndex);
    case Actions.CANCEL_ADD_CRAFTING_PART:
      return _setSelectedCraftingPart(state, state.ui.selectedCraftingPart.craftingPartIndex, null);
    case Actions.FINISH_FORGING_CARD.SUCCESS:
      return _setFinishedForgeCard(state, action.card);
    case Actions.ADD_CRAFTED_CARD_TO_DECK.SUCCESS:
      state = _setForgeSlotCard(state, state.ui.selectedForgeSlot.forgeSlotIndex, null);
      state = _setFinishedForgeCard(state, null);
      return _removeSelectedForgeSlot(state);
    default:
      return state;
  }
};

localStore.addReducers({ scCraft: reducer });
