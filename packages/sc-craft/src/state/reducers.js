import * as Actions from './actions.js';
import { localStore } from './store.js';
import { SELECTED_CRAFTING_COMPONENT_SOURCES, SELECTED_CRAFTING_COMPONENT_STATES } from './state-specifiers.js';

const SELECTED_CRAFTING_COMPONENT_INDEX_KEYS = {
  FORGE_SLOT_INDEX: 'forgeSlotIndex',
  BASE_CARD_INDEX: 'baseCardIndex',
  CRAFTING_PART_INDEX: 'craftingPartIndex'
};

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
        cardOrigin: null
      },
      modifiedCard: {
        card: null,
      },
    },
  };
}

function _setFinalizedCard(state, card, possibleNames, cardOrigin) {
  return {
    ...state,
    ui: {
      ...state.ui,
      finalizedCard: {
        ...state.ui.finalizedCard,
        card,
        possibleNames,
        cardOrigin
      },
    }
  };
}

function _setModifiedCard(state, card) {
  return {
    ...state,
    ui: {
      ...state.ui,
      modifiedCard: {
        ...state.ui.modifiedCard,
        card,
      },
    }
  };
}

function _removeModifiedCard(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      modifiedCard: {
        card: null
      }
    }
  };
}

function _setFinalizedCardNameData(state, possibleNames, cardOrigin) {
  return {
    ...state,
    ui: {
      ...state.ui,
      finalizedCard: {
        ...state.ui.finalizedCard,
        possibleNames,
        cardOrigin
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
        cardOrigin: null
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

function _setSelectedCraftingComponentKeyedIndex(state, indexKey, index) {
  const newState = {
    ...state,
    ui: {
      ...state.ui,
      selectedCraftingComponent: {
        ...state.ui.selectedCraftingComponent,
      },
    },
  };
  newState.ui.selectedCraftingComponent[indexKey] = index;
  return newState;
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
    case Actions.ADD_FINALIZED_CARD_TO_DECK.SUCCESS:
    case Actions.ADD_CRAFTING_PART.SUCCESS:
      newState = _removeSelectedCraftingComponent(newState);
      newState = _removeFinalizedCard(newState);
      return _removeModifiedCard(newState);
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
      return _setFinalizedCard(newState, action.finalizedCard, null, null);
    case Actions.SET_FINALIZE_SELECTED_FORGE_DRAFT_CARD_NAME_DATA:
      return _setFinalizedCardNameData(newState, action.possibleNames, action.cardOrigin);
    case Actions.SELECT_CRAFTING_PART:
      return _setSelectedCraftingComponent(
        newState,
        SELECTED_CRAFTING_COMPONENT_SOURCES.SELECT_CRAFTING_PART,
        null,
        null,
        action.craftingPartIndex,
        SELECTED_CRAFTING_COMPONENT_STATES.TARGET_FIELD,
      );
    case Actions.SELECT_FORGE_FOR_CRAFTING_PART.REQUEST:
      return _setSelectedCraftingComponentKeyedIndex(
        newState,
        SELECTED_CRAFTING_COMPONENT_INDEX_KEYS.FORGE_SLOT_INDEX,
        action.forgeSlotIndex
      );
    case Actions.SELECT_FORGE_FOR_CRAFTING_PART.SUCCESS:
      newState = _setModifiedCard(newState, action.modifiedCard);
      return _setSelectedCraftingComponentState(
        newState,
        SELECTED_CRAFTING_COMPONENT_STATES.PREVIEW
      );
    default:
      return newState;
  }
};

localStore.addReducers({ scCraft: reducer });
