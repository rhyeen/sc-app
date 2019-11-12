import * as Actions from './actions.js';

import { CARD_SOURCES, CARD_TARGETS } from './state-specifiers.js';
import { localStore } from './store.js';

function _resetState() {
  return {
    ui: {
      selectedCard: {
        source: null,
        id: null,
        instance: null,
        handIndex: null,
        playAreaIndex: null,
      },
      selectedAbility: {
        targets: null,
        abilityId: null,
      },
    }
  };
}

function _setSelectedCard(state, source, cardId, cardInstance, handIndex, playAreaIndex) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCard: {
        source,
        id: cardId,
        instance: cardInstance,
        handIndex,
        playAreaIndex,
      },
    },
  };
}

function _setSelectedAbility(state, targets, abilityId) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedAbility: {
        targets,
        abilityId,
      },
    },
  };
}

function _setSelectedCardSource(state, source) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCard: {
        ...state.ui.selectedCard,
        source,
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
        id: null,
        instance: null,
        handIndex: null,
        playAreaIndex: null,
      },
    },
  };
}

function _removeSelectedAbility(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedAbility: {
        targets: null,
        abilityId: null,
      },
    },
  };
}

const INITIAL_STATE = _resetState();

const reducer = (state = INITIAL_STATE, action) => {
  let newState = state;
  let handIndex;
  let cardId;
  let cardInstance;
  let card;
  let playAreaIndex;
  switch (action.type) {
    case Actions.SELECT_CARD_FROM_HAND:
      cardId = newState.entities.player.hand.cards[action.handIndex].id;
      cardInstance = newState.entities.player.hand.cards[action.handIndex].instance;
      newState = _removeHandCard(newState, action.handIndex);
      return _setSelectedCard(
        newState,
        CARD_SOURCES.SELECT_PLAYER_HAND,
        cardId,
        cardInstance,
        action.handIndex,
        null,
      );
    case Actions.CANCEL_SELECT_CARD_FROM_HAND:
    case Actions.CANCEL_PLAY_SELECTED_SPELL:
    case Actions.CANCEL_CAST_SPELL:
    case Actions.CANCEL_SELECT_OPPONENT_MINION:
    case Actions.CANCEL_SELECT_PLAYER_MINION:
    case Actions.PLACE_MINION.SUCCESS:
    case Actions.ATTACK_MINION.SUCCESS:
    case Actions.USE_CARD_ABILITY.SUCCESS:
    case Actions.FINISH_SPELL_CARD:
      return _removeSelectedCard(newState);
    case Actions.CANCEL_PLAY_SELECTED_MINION:
      cardId = newState.ui.selectedCard.id;
      cardInstance = newState.ui.selectedCard.instance;
      playAreaIndex = newState.ui.selectedCard.playAreaIndex;
      return _setSelectedCard(
        newState,
        CARD_SOURCES.SELECT_PLAYER_MINION,
        cardId,
        cardInstance,
        null,
        playAreaIndex,
      );
    case Actions.SELECT_PLAYER_MINION:
      return _setSelectedCard(
        newState,
        CARD_SOURCES.SELECT_PLAYER_MINION,
        action.cardId,
        action.cardInstance,
        null,
        action.playAreaIndex,
      );
    case Actions.SELECT_OPPONENT_MINION:
      return _setSelectedCard(
        newState,
        CARD_SOURCES.SELECT_OPPONENT_MINION,
        action.cardId,
        action.cardInstance,
        null,
        action.playAreaIndex,
      );
    case Actions.PLAY_PLAYER_MINION:
      return _setSelectedCardSource(newState, CARD_SOURCES.PLAY_PLAYER_MINION);
    case Actions.RESET_CARDS:
      return _resetState();
    case Actions.SELECT_OPPONENT_MINION_TARGETED_ABILITY:
      return _setSelectedAbility(newState, CARD_TARGETS.OPPONENT_MINION, action.abilityId);
    case Actions.SELECT_PLAYER_MINION_TARGETED_ABILITY:
      return _setSelectedAbility(newState, CARD_TARGETS.PLAYER_MINION, action.abilityId);
    case Actions.SELECT_PLAYER_TARGETED_ABILITY:
      return _setSelectedAbility(newState, CARD_TARGETS.PLAYER, action.abilityId);
    case Actions.CANCEL_SELECT_OPPONENT_MINION_TARGETED_ABILITY:
    case Actions.CANCEL_SELECT_PLAYER_MINION_TARGETED_ABILITY:
      return _removeSelectedAbility(newState);
    default:
      return newState;
  }
};

localStore.addReducers({ scCards: reducer });
