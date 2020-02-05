import * as Actions from './actions.js';

import { SELECTED_CARD_SOURCES, SELECTED_CARD_STATES } from './state-specifiers.js';
import { localStore } from './store.js';

function _resetState() {
  return {
    ui: {
      selectedCard: {
        source: null,
        handCardIndex: null,
        fieldSlotIndex: null,
        state: null,
      },
      selectedAbility: {
        target: null,
        abilityId: null,
      },
    },
  };
}

function _setSelectedCardState(state, selectedCardState) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCard: {
        ...state.ui.selectedCard,
        state: selectedCardState,
      },
    },
  };
}

function _setSelectedCard(state, source, handCardIndex, fieldSlotIndex, selectedCardState) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCard: {
        source,
        handCardIndex,
        fieldSlotIndex,
        state: selectedCardState,
      },
    },
  };
}

function _removeSelectedCard(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCard: {
        source: null,
        handCardIndex: null,
        fieldSlotIndex: null,
        state: null,
      },
    },
  };
}

function _setSelectedAbility(state, target, abilityId) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedAbility: {
        target,
        abilityId,
      },
    },
  };
}

const INITIAL_STATE = _resetState();

const reducer = (state = INITIAL_STATE, action) => {
  const newState = state;
  let cardId;
  let cardInstance;
  let fieldSlotIndex;
  switch (action.type) {
    case Actions.SELECT_HAND_CARD:
      return _setSelectedCard(
        newState,
        SELECTED_CARD_SOURCES.SELECT_PLAYER_HAND_CARD,
        action.handCardIndex,
        null,
        SELECTED_CARD_STATES.PREVIEW,
      );
    case Actions.CANCEL_SELECTED_CARD:
    case Actions.PLACE_MINION.SUCCESS:
    case Actions.ATTACK_MINION.SUCCESS:
      return _removeSelectedCard(newState);
    case Actions.SELECT_DUNGEON_FIELD_SLOT_CARD:
      return _setSelectedCard(
        newState,
        SELECTED_CARD_SOURCES.SELECT_DUNGEON_FIELD_SLOT_CARD,
        null,
        action.fieldSlotIndex,
        SELECTED_CARD_STATES.PREVIEW,
      );
    case Actions.PREVIEW_ATTACK_MINION:
      return _setSelectedCard(
        newState,
        SELECTED_CARD_SOURCES.SELECT_PLAYER_FIELD_SLOT_CARD,
        null,
        action.fieldSlotIndex,
        SELECTED_CARD_STATES.TARGET_FIELD,
      );
    case Actions.PREVIEW_PLACE_MINION:
      return _setSelectedCardState(newState, SELECTED_CARD_STATES.TARGET_FIELD);
    case Actions.PREVIEW_PLAYER_FIELD_SLOT_CARD:
      return _setSelectedCardState(newState, SELECTED_CARD_STATES.PREVIEW);
    case Actions.PREVIEW_CARD_ABILITIES:
      return _setSelectedCardState(newState, SELECTED_CARD_STATES.USE_ABILITIES);
    case Actions.CANCEL_PREVIEW_PLAYER_FIELD_SLOT_CARD:
      return _setSelectedCardState(newState, SELECTED_CARD_STATES.TARGET_FIELD);
    case Actions.SELECT_ABILITY.SUCCESS:
      return _setSelectedAbility(newState, action.target, action.abilityId);
    default:
      return newState;
  }
};

localStore.addReducers({ scCards: reducer });
