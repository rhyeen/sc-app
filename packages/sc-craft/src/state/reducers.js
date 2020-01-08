import * as Actions from './actions.js';
import { localStore } from './store.js';
import { SELECTED_CRAFTING_COMPONENT_SOURCES, SELECTED_CRAFTING_COMPONENT_STATES } from './state-specifiers.js';

function _resetState() {
  return {
    ui: {
      usedCraftingParts: [],
      selectedCraftingComponent: {
        baseCardIndex: null,
        forgeSlotIndex: null,
        craftingPartIndex: null,
        source: null,
        state: null,
      },
      finalizedCard: {
        card: null,
        possibleNames: null,
        originalCardMetadata: null
      },
      
      
      selectedCraftingPart: {
        craftingPartIndex: null,
        forgeSlotIndex: null,
      },
      selectedForgeSlot: {
        forgeSlotIndex: null,
        finishedCard: null,
      },
      isCraftingBaseCardSelected: false,
      isForgingCraftingBaseCard: false,
    },
    entities: {
      forge: {
        slots: [
          {
            draftCard: null,
          },
          {
            draftCard: null,
          },
        ],
      },
      craftingBaseCard: null,
      craftingParts: [],
      craftingPartsUsed: 0,
      maxCraftingPartsUsed: 1,
    },
  };
}

function _setFinalizedCard(state, card, possibleNames, originalCardMetadata) {
  return {
    ...state,
    ui: {
      ...state.ui,
      finalizedCard: {
        ...state.ui.finalizedCard,
        card,
        possibleNames,
        originalCardMetadata
      },
    }
  };
}

function _removeFinalizedCard(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      finalizedCard: {
        card: null,
        possibleNames: null,
        originalCardMetadata: null
      }
    }
  };
}

function _setSelectedCraftingComponentState(state, selectedCraftingComponentState) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCraftingComponent: {
        ...state.ui.selectedCraftingComponent,
        state: selectedCraftingComponentState,
      },
    },
  };
}

function _setSelectedCraftingComponent(state, source, baseCardIndex, forgeSlotIndex, craftingPartIndex, selectedCraftingComponentState) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCraftingComponent: {
        source,
        baseCardIndex,
        forgeSlotIndex,
        craftingPartIndex,
        state: selectedCraftingComponentState,
      },
    },
  };
}

function _removeSelectedCraftingComponent(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCraftingComponent: {
        source: null,
        baseCardIndex: null,
        forgeSlotIndex: null,
        craftingPartIndex: null,
        state: null,
      },
    },
  }
}


function _setSelectedCraftingPart(state, craftingPartIndex, forgeSlotIndex) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCraftingPart: {
        craftingPartIndex,
        forgeSlotIndex,
      },
    },
  };
}

function _removeSelectedCraftingPart(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCraftingPart: {
        craftingPartIndex: null,
        forgeSlotIndex: null,
      },
    },
  };
}

function _setSelectedForgeSlot(state, forgeSlotIndex) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedForgeSlot: {
        forgeSlotIndex,
        finishedCard: null,
      },
    },
  };
}

function _removeSelectedForgeSlot(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedForgeSlot: {
        forgeSlotIndex: null,
        finishedCard: null,
      },
    },
  };
}

function _setIsCraftingBaseCardSelected(state, isCraftingBaseCardSelected) {
  return {
    ...state,
    ui: {
      ...state.ui,
      isCraftingBaseCardSelected,
    },
  };
}

function _setFinishedForgeCard(state, finishedCard) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedForgeSlot: {
        ...state.ui.selectedForgeSlot,
        finishedCard,
      },
    },
  };
}

function _setIsForgingCraftingBaseCard(state, isForgingCraftingBaseCard) {
  return {
    ...state,
    ui: {
      ...state.ui,
      isForgingCraftingBaseCard,
    },
  };
}

function _shallowCopyForgeSlots(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      forge: {
        ...state.entities.forge,
        slots: [...state.entities.forge.slots],
      },
    },
  };
}

function _setForgeSlotCard(state, forgeSlotIndex, draftCard) {
  const newState = _shallowCopyForgeSlots(state);
  newState.entities.forge.slots[forgeSlotIndex] = {
    ...newState.entities.forge.slots[forgeSlotIndex],
    draftCard,
  };
  return newState;
}

function _setCraftingBaseCard(state, craftingBaseCard) {
  return {
    ...state,
    entities: {
      ...state.entities,
      craftingBaseCard,
    },
  };
}

function _setCraftingParts(state, craftingParts) {
  return {
    ...state,
    entities: {
      ...state.entities,
      craftingParts,
    },
  };
}

function _removeCraftingPart(state, craftingPartIndex) {
  const craftingParts = [...state.entities.craftingParts];
  craftingParts.splice(craftingPartIndex, 1);
  return {
    ...state,
    entities: {
      ...state.entities,
      craftingParts,
    },
  };
}

function _setCraftingPartsUsed(state, craftingPartsUsed) {
  return {
    ...state,
    entities: {
      ...state.entities,
      craftingPartsUsed,
    },
  };
}

const INITIAL_STATE = _resetState();

const reducer = (state = INITIAL_STATE, action) => {
  let newState = state;
  switch (action.type) {
    case Actions.SELECT_BASE_DRAFT_CARD:
      return _setSelectedCraftingComponent(
        newState,
        SELECTED_CRAFTING_COMPONENT_SOURCES.SELECT_BASE_DRAFT_CARD,
        action.baseCardIndex,
        null,
        null,
        SELECTED_CRAFTING_COMPONENT_STATES.PREVIEW
      );
    case Actions.CANCEL_SELECT_CRAFTING_COMPONENT:
    case Actions.FINISH_FORGE_SELECTED_BASE_DRAFT_CARD.SUCCESS:
      newState = _removeSelectedCraftingComponent(newState);
      return _removeFinalizedCard(newState);
    case Actions.FORGE_SELECTED_BASE_DRAFT_CARD:
      return _setSelectedCraftingComponentState(
        newState,
        SELECTED_CRAFTING_COMPONENT_STATES.TARGET_FIELD
      );
    case Actions.SELECT_FORGE_SLOT:
      return _setSelectedCraftingComponent(
        newState,
        SELECTED_CRAFTING_COMPONENT_SOURCES.SELECT_FORGE_SLOT,
        null,
        action.forgeSlotIndex,
        null,
        SELECTED_CRAFTING_COMPONENT_STATES.PREVIEW
      );
    case Actions.FINALIZE_SELECTED_FORGE_DRAFT_CARD.SUCCESS:
      newState = _setSelectedCraftingComponentState(
        newState,
        SELECTED_CRAFTING_COMPONENT_STATES.FINALIZE
      );
      return _setFinalizedCard(newState, action.finalizedCard, action.possibleNames, action.originalCardMetadata);



    case Actions.CANCEL_SELECT_FORGE_SLOT:
      return _removeSelectedForgeSlot(newState);
    case Actions.SELECT_CRAFTING_PART:
      return _setSelectedCraftingPart(newState, action.craftingPartIndex, null);
    case Actions.CANCEL_SELECT_CRAFTING_PART:
      return _removeSelectedCraftingPart(newState);
    case Actions.SET_CRAFTING_BASE_CARD.SUCCESS:
      return _setCraftingBaseCard(newState, action.craftingBaseCard);
    case Actions.SET_CRAFTING_PARTS.SUCCESS:
      newState = _setCraftingPartsUsed(newState, 0);
      return _setCraftingParts(newState, action.craftingParts);
    case Actions.FINISH_ADD_CRAFTING_PART.SUCCESS:
      newState = _setForgeSlotCard(
        newState,
        newState.ui.selectedCraftingPart.forgeSlotIndex,
        action.draftCard,
      );
      newState = _removeCraftingPart(newState, newState.ui.selectedCraftingPart.craftingPartIndex);
      newState = _setCraftingPartsUsed(newState, newState.entities.craftingPartsUsed + 1);
      return _removeSelectedCraftingPart(newState);
    case Actions.FORGE_SELECTED_CRAFTING_BASE_CARD:
      newState = _setIsForgingCraftingBaseCard(newState, true);
      return _setIsCraftingBaseCardSelected(newState, false);
    case Actions.CANCEL_FORGE_SELECTED_CRAFTING_BASE_CARD:
      return _setIsForgingCraftingBaseCard(newState, false);
    case Actions.FINISH_FORGE_SELECTED_CRAFTING_BASE_CARD.SUCCESS:
      newState = _setForgeSlotCard(
        newState,
        action.forgeSlotIndex,
        newState.entities.craftingBaseCard,
      );
      newState = _setIsForgingCraftingBaseCard(newState, false);
      return _setCraftingBaseCard(newState, null);
    case Actions.ADD_CRAFTING_PART:
      return _setSelectedCraftingPart(
        newState,
        newState.ui.selectedCraftingPart.craftingPartIndex,
        action.forgeSlotIndex,
      );
    case Actions.CANCEL_ADD_CRAFTING_PART:
      return _setSelectedCraftingPart(
        newState,
        newState.ui.selectedCraftingPart.craftingPartIndex,
        null,
      );
    case Actions.FINISH_FORGING_CARD.SUCCESS:
      return _setFinishedForgeCard(newState, action.card);
    case Actions.ADD_CRAFTED_CARD_TO_DECK.SUCCESS:
      newState = _setForgeSlotCard(newState, newState.ui.selectedForgeSlot.forgeSlotIndex, null);
      newState = _setFinishedForgeCard(newState, null);
      return _removeSelectedForgeSlot(newState);
    default:
      return newState;
  }
};

localStore.addReducers({ scCraft: reducer });
