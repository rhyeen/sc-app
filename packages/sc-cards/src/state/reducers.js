import { CardType } from '@shardedcards/sc-types/dist/card/enums/card-type.js';

import { Log } from 'interface-handler/src/logger.js';
import * as Actions from './actions.js';
import * as Cards from '../services/card-selection.js';

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
        playAreaIndex: null
      },
      selectedAbility: {
        targets: null,
        abilityId: null
      }
    },
    entities: {
      cards: {},
      player: {
        hand: {
          cards: [],
          refillSize: 5
        },
        deck: {
          size: 0
        },
        discardPile: {
          cards: []
        },
        lostCards: {
          cards: []
        },
        field: {
          slots: [
            {
              id: null,
              instance: null
            },
            {
              id: null,
              instance: null
            },
            {
              id: null,
              instance: null
            }
          ]
        }
      },
      opponent: {
        field: {
          backlog: [
            {
              size: 0
            },
            {
              size: 0
            },
            {
              size: 0
            }
          ],
          slots: [
            {
              id: null,
              instance: null
            },
            {
              id: null,
              instance: null
            },
            {
              id: null,
              instance: null
            }
          ]
        }
      }
    }
  };
}

function _setCards(state, cards) {
  return {
    ...state,
    entities: {
      ...state.entities,
      cards: {
        ...cards
      }
    }
  };
}

function _updateCards(state, cards) {
  return {
    ...state,
    entities: {
      ...state.entities,
      cards: {
        ...state.entities.cards,
        ...cards
      }
    }
  };
}

function _setPlayerDeckSize(state, deckSize) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        deck: {
          ...state.entities.player.deck,
          size: deckSize
        }
      }
    }
  };
}

function _shallowCopyHandCards(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        hand: {
          ...state.entities.player.hand,
          cards: [...state.entities.player.hand.cards]
        }
      }
    }
  };
}

function _setHandCards(state, handCards) {
  const newState = _shallowCopyHandCards(state);
  newState.entities.player.hand.cards = handCards;
  return newState;
}

function _setHandRefillSize(state, handRefillSize) {
  const newState = _shallowCopyHandCards(state);
  newState.entities.player.hand.refillSize = handRefillSize;
  return newState;
}

function _removeHandCard(state, handIndex) {
  const newState = _shallowCopyHandCards(state);
  newState.entities.player.hand.cards.splice(handIndex, 1);
  return newState;
}

function _addHandCard(state, handIndex, cardId, cardInstance) {
  const newState = _shallowCopyHandCards(state);
  newState.entities.player.hand.cards.splice(handIndex, 0, {
    id: cardId,
    instance: cardInstance
  });
  return newState;
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
        playAreaIndex
      }
    }
  };
}

function _setSelectedAbility(state, targets, abilityId) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedAbility: {
        targets,
        abilityId
      }
    }
  };
}

function _setSelectedCardSource(state, source) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedCard: {
        ...state.ui.selectedCard,
        source
      }
    }
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
        playAreaIndex: null
      }
    }
  };
}

function _removeSelectedAbility(state) {
  return {
    ...state,
    ui: {
      ...state.ui,
      selectedAbility: {
        targets: null,
        abilityId: null
      }
    }
  };
}

function _shallowCopyPlayerCards(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        cards: {
          ...state.entities.cards,
        }
      }
    }
  };
}

function _shallowCopyPlayerCardInstances(state, cardId) {
  const newState = _shallowCopyPlayerCards(state);
  newState.entities.cards[cardId] = {
    ...newState.entities.cards[cardId],
    instances: {
      ...newState.entities.cards[cardId].instances
    }
  }
  return newState;
}

function _setCard(state, card, cardId, cardInstance) {
  const newState = _shallowCopyPlayerCardInstances(state, cardId);
  newState.entities.cards[cardId].instances[cardInstance] = card;
  return newState;
}

function _shallowCopyDiscardCards(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        discardPile: {
          ...state.entities.player.discardPile,
          cards: [...state.entities.player.discardPile.cards]
        }
      }
    }
  };
}

function _setDiscardedPileCards(state, discardedCards) {
  const newState = _shallowCopyDiscardCards(state);
  newState.entities.player.discardPile.cards = discardedCards;
  return newState;
}

function _shallowCopyLostPileCards(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        lostCards: {
          ...state.entities.player.lostCards,
          cards: [...state.entities.player.lostCards.cards]
        }
      }
    }
  };
}

function _setLostPileCards(state, lostPileCards) {
  const newState = _shallowCopyLostPileCards(state);
  newState.entities.player.lostCards.cards = lostPileCards;
  return newState;
}

function _discardCard(state, cardId, cardInstance) {
  const newState = _shallowCopyDiscardCards(state);
  newState.entities.player.discardPile.cards.push({
    id: cardId,
    instance: cardInstance
  });
  return newState;
}

function _shallowCopyPlayerFieldSlots(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        field: {
          ...state.entities.player.field,
          slots: [...state.entities.player.field.slots]
        }
      }
    }
  };
}

function _setPlayerFieldSlot(state, playAreaIndex, cardId, cardInstance) {
  const newState = _shallowCopyPlayerFieldSlots(state);
  newState.entities.player.field.slots[playAreaIndex] = {
    id: cardId,
    instance: cardInstance
  };
  return newState;
}

function _setPlayerFieldSlots(state, playerFieldSlots) {
  const newState = _shallowCopyPlayerFieldSlots(state);
  for (let i = 0; i < 3; i += 1) {
    newState.entities.player.field.slots[i] = {
      id: playerFieldSlots[i].id,
      instance: playerFieldSlots[i].instance
    };
  }
  return newState;
}

function _shallowCopyOpponentFieldSlots(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      opponent: {
        ...state.entities.opponent,
        field: {
          ...state.entities.opponent.field,
          slots: [...state.entities.opponent.field.slots]
        }
      }
    }
  };
}

function _shallowCopyOpponentFieldBacklog(state) {
  return {
    ...state,
    entities: {
      ...state.entities,
      opponent: {
        ...state.entities.opponent,
        field: {
          ...state.entities.opponent.field,
          backlog: [...state.entities.opponent.field.backlog]
        }
      }
    }
  };
}

function _setOpponentFieldSlots(state, opponentFieldSlots) {
  const newState = _shallowCopyOpponentFieldSlots(state);
  for (let i = 0; i < 3; i += 1) {
    newState.entities.opponent.field.slots[i] = {
      id: opponentFieldSlots[i].id,
      instance: opponentFieldSlots[i].instance
    };
  }
  return newState;
}

function _setOpponentFieldBacklog(state, opponentFieldBacklog) {
  const newState = _shallowCopyOpponentFieldBacklog(state);
  for (let i = 0; i < 3; i += 1) {
    newState.entities.opponent.field.backlog[i] = {
      size: opponentFieldBacklog[i].size
    };
  }
  return newState;
}

const INITIAL_STATE = _resetState();

const reducer = (state = INITIAL_STATE, action) => {
  let newState = state; let handIndex; let cardId; let cardInstance; let card; let playAreaIndex;
  switch (action.type) {
    case Actions.SELECT_CARD_FROM_HAND:
      cardId = newState.entities.player.hand.cards[action.handIndex].id;
      cardInstance = newState.entities.player.hand.cards[action.handIndex].instance;
      newState = _removeHandCard(newState, action.handIndex);
      return _setSelectedCard(newState, CARD_SOURCES.SELECT_PLAYER_HAND, cardId, cardInstance, action.handIndex, null);
    case Actions.CANCEL_SELECT_CARD_FROM_HAND:
    case Actions.CANCEL_PLAY_SELECTED_SPELL:
    case Actions.CANCEL_CAST_SPELL:
      handIndex = newState.ui.selectedCard.handIndex;
      cardId = newState.ui.selectedCard.id;
      cardInstance = newState.ui.selectedCard.instance;
      newState = _addHandCard(newState, handIndex, cardId, cardInstance);
      return _removeSelectedCard(newState);
    case Actions.CANCEL_SELECT_OPPONENT_MINION:    
    case Actions.CANCEL_SELECT_PLAYER_MINION:
      return _removeSelectedCard(newState);
    case Actions.CANCEL_PLAY_SELECTED_MINION:
      cardId = newState.ui.selectedCard.id;
      cardInstance = newState.ui.selectedCard.instance;
      playAreaIndex = newState.ui.selectedCard.playAreaIndex;
      return _setSelectedCard(newState, CARD_SOURCES.SELECT_PLAYER_MINION, cardId, cardInstance, null, playAreaIndex);
    case Actions.PLAY_SELECTED_CARD:
      card = Cards.getCard(newState.entities.cards, newState.ui.selectedCard.id, newState.ui.selectedCard.instance);
      switch (card.type) {
        case CardType.Minion:
          return _setSelectedCardSource(newState, CARD_SOURCES.SUMMON_PLAYER_MINION);
        case CardType.Spell:
          return _setSelectedCardSource(newState, CARD_SOURCES.CAST_PLAYER_SPELL);
        default:
          Log.error(`unexpected card type: ${card.type}`);
          return newState;
      }
    case Actions.SUMMON_MINION.SUCCESS:
      cardId = newState.ui.selectedCard.id;
      cardInstance = newState.ui.selectedCard.instance;
      // for example, if the placed card got shield from replacing a card.
      action.updatedCards.forEach(updatedCard => {
        newState = _setCard(newState, updatedCard.card, updatedCard.id, updatedCard.instance);
      });
      if (action.discardedCard && action.discardedCard.id) {
        newState = _discardCard(newState, action.discardedCard.id, action.discardedCard.instance);
      }
      newState = _setPlayerFieldSlot(newState, action.playAreaIndex, cardId, cardInstance);
      return _removeSelectedCard(newState);
    case Actions.SELECT_PLAYER_MINION:
      return _setSelectedCard(newState, CARD_SOURCES.SELECT_PLAYER_MINION, action.cardId, action.cardInstance, null, action.playAreaIndex);
    case Actions.SELECT_OPPONENT_MINION:
      return _setSelectedCard(newState, CARD_SOURCES.SELECT_OPPONENT_MINION, action.cardId, action.cardInstance, null, action.playAreaIndex);
    case Actions.PLAY_PLAYER_MINION:
      return _setSelectedCardSource(newState, CARD_SOURCES.PLAY_PLAYER_MINION);
    case Actions.ATTACK_MINION.SUCCESS:
      action.updatedCards.forEach(updatedCard => {
        newState = _setCard(newState, updatedCard.card, updatedCard.id, updatedCard.instance);
      });
      action.addedToDiscardPile.forEach(discardedCard => {
        newState = _discardCard(newState, discardedCard.id, discardedCard.instance);
      });
      newState = _setPlayerFieldSlots(newState, action.playerFieldSlots);
      newState = _setOpponentFieldSlots(newState, action.opponentFieldSlots);
      return _removeSelectedCard(newState);
    case Actions.SET_PLAYING_FIELD.SUCCESS:
      newState = _setPlayerFieldSlots(newState, action.playerFieldSlots);
      newState = _setOpponentFieldSlots(newState, action.opponentFieldSlots);
      return _setOpponentFieldBacklog(newState, action.opponentFieldBacklog);
    case Actions.CLEAR_HAND.SUCCESS:
      newState = _setHandCards(newState, []);
      action.addedToDiscardPile.forEach(discardedCard => {
        newState = _discardCard(newState, discardedCard.id, discardedCard.instance);
      });
      return _setPlayerDeckSize(newState, action.deckSize);
    case Actions.SET_PLAYER_DECKS.SUCCESS:
      newState = _setHandCards(newState, action.handCards);
      newState = _setHandRefillSize(newState, action.handRefillSize);
      newState = _setDiscardedPileCards(newState, action.discardPileCards);
      newState = _setLostPileCards(newState, action.lostPileCards);
      return _setPlayerDeckSize(newState, action.deckSize);
    case Actions.REFRESH_PLAYER_CARDS.SUCCESS:
    case Actions.SET_UPDATED_CARDS:
      action.updatedCards.forEach(updatedCard => {
        newState = _setCard(newState, updatedCard.card, updatedCard.id, updatedCard.instance);
      });
      return newState;
    case Actions.SET_CARDS.SUCCESS:
      return _setCards(newState, action.cards);
    case Actions.SET_NEW_CARDS:
        return _updateCards(newState, action.newCards);
    case Actions.SET_OPPONENT_FIELD_BACKLOG:
      return _setOpponentFieldBacklog(newState, action.opponentFieldBacklog);
    case Actions.RESET_CARDS:
      return _resetState();
    case Actions.USE_CARD_ABILITY.SUCCESS:
      action.updatedCards.forEach(updatedCard => {
        newState = _setCard(newState, updatedCard.card, updatedCard.id, updatedCard.instance);
      });
      action.addedToDiscardPile.forEach(discardedCard => {
        newState = _discardCard(newState, discardedCard.id, discardedCard.instance);
      });
      newState = _setPlayerFieldSlots(newState, action.playerFieldSlots);
      newState = _setOpponentFieldSlots(newState, action.opponentFieldSlots);
      return _removeSelectedAbility(newState);
    case Actions.FINISH_SPELL_CARD:
      cardId = newState.ui.selectedCard.id;
      cardInstance = newState.ui.selectedCard.instance;  
      newState = _discardCard(newState, cardId, cardInstance);
      return _removeSelectedCard(newState);
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
