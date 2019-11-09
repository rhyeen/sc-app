import { ReduxAction } from '../../../utils/redux-action.js';

const ra = new ReduxAction('SR_CARDS');

export const SELECT_CARD_FROM_HAND = ra.createRequestRaw('SELECT_CARD_FROM_HAND');
export const selectCardFromHand = handIndex =>
  ReduxAction.action(SELECT_CARD_FROM_HAND, { handIndex });

export const CANCEL_SELECT_CARD_FROM_HAND = ra.createRequestRaw('CANCEL_SELECT_CARD_FROM_HAND');
export const cancelSelectCardFromHand = () => ReduxAction.action(CANCEL_SELECT_CARD_FROM_HAND, {});

export const CANCEL_PLAY_SELECTED_SPELL = ra.createRequestRaw('CANCEL_PLAY_SELECTED_SPELL');
export const cancelPlaySelectedSpell = () => ReduxAction.action(CANCEL_PLAY_SELECTED_SPELL, {});

export const CANCEL_CAST_SPELL = ra.createRequestRaw('CANCEL_CAST_SPELL');
export const cancelCastSpell = () => ReduxAction.action(CANCEL_CAST_SPELL, {});

export const CANCEL_SELECT_OPPONENT_MINION = ra.createRequestRaw('CANCEL_SELECT_OPPONENT_MINION');
export const cancelSelectOpponentMinion = () =>
  ReduxAction.action(CANCEL_SELECT_OPPONENT_MINION, {});

export const CANCEL_SELECT_PLAYER_MINION = ra.createRequestRaw('CANCEL_SELECT_PLAYER_MINION');
export const cancelSelectPlayerMinion = () => ReduxAction.action(CANCEL_SELECT_PLAYER_MINION, {});

export const CANCEL_PLAY_SELECTED_MINION = ra.createRequestRaw('CANCEL_PLAY_SELECTED_MINION');
export const cancelPlaySelectedMinion = () => ReduxAction.action(CANCEL_PLAY_SELECTED_MINION, {});

export const PLAY_SELECTED_CARD = ra.createRequestRaw('PLAY_SELECTED_CARD');
export const playSelectedCard = () => ReduxAction.action(PLAY_SELECTED_CARD, {});

export const PLACE_MINION = ra.createRequestTypes('PLACE_MINION');
export const placeMinion = {
  request: playAreaIndex => ReduxAction.action(PLACE_MINION.REQUEST, { playAreaIndex }),
  success: (playAreaIndex, updatedCards, discardedCard) =>
    ReduxAction.action(PLACE_MINION.SUCCESS, { playAreaIndex, updatedCards, discardedCard }),
};

export const SELECT_PLAYER_MINION = ra.createRequestRaw('SELECT_PLAYER_MINION');
export const selectPlayerMinion = (cardId, cardInstance, playAreaIndex) =>
  ReduxAction.action(SELECT_PLAYER_MINION, { cardId, cardInstance, playAreaIndex });

export const SELECT_OPPONENT_MINION = ra.createRequestRaw('SELECT_OPPONENT_MINION');
export const selectOpponentMinion = (cardId, cardInstance, playAreaIndex) =>
  ReduxAction.action(SELECT_OPPONENT_MINION, { cardId, cardInstance, playAreaIndex });

export const PLAY_PLAYER_MINION = ra.createRequestRaw('PLAY_PLAYER_MINION');
export const playPlayerMinion = () => ReduxAction.action(PLAY_PLAYER_MINION, {});

export const ATTACK_MINION = ra.createRequestTypes('ATTACK_MINION');
export const attackMinion = {
  request: playAreaIndex => ReduxAction.action(ATTACK_MINION.REQUEST, { playAreaIndex }),
  success: (updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots) =>
    ReduxAction.action(ATTACK_MINION.SUCCESS, {
      updatedCards,
      addedToDiscardPile,
      playerFieldSlots,
      opponentFieldSlots,
    }),
};

export const SET_PLAYING_FIELD = ra.createRequestTypes('SET_PLAYING_FIELD');
export const setPlayingField = {
  request: () => ReduxAction.action(SET_PLAYING_FIELD.REQUEST, {}),
  success: (opponentFieldSlots, opponentFieldBacklog, playerFieldSlots) =>
    ReduxAction.action(SET_PLAYING_FIELD.SUCCESS, {
      opponentFieldSlots,
      opponentFieldBacklog,
      playerFieldSlots,
    }),
};

export const CLEAR_HAND = ra.createRequestTypes('CLEAR_HAND');
export const clearHand = {
  request: () => ReduxAction.action(CLEAR_HAND.REQUEST, {}),
  success: addedToDiscardPile => ReduxAction.action(CLEAR_HAND.SUCCESS, { addedToDiscardPile }),
};

export const SET_PLAYER_DECKS = ra.createRequestTypes('SET_PLAYER_DECKS');
export const setPlayerDecks = {
  request: () => ReduxAction.action(SET_PLAYER_DECKS.REQUEST, {}),
  success: (handCards, handRefillSize, discardPileCards, lostPileCards, deckSize) =>
    ReduxAction.action(SET_PLAYER_DECKS.SUCCESS, {
      handCards,
      handRefillSize,
      discardPileCards,
      lostPileCards,
      deckSize,
    }),
};

export const REFRESH_PLAYER_CARDS = ra.createRequestTypes('REFRESH_PLAYER_CARDS');
export const refreshPlayerCards = {
  request: () => ReduxAction.action(REFRESH_PLAYER_CARDS.REQUEST, {}),
  success: updatedCards => ReduxAction.action(REFRESH_PLAYER_CARDS.SUCCESS, { updatedCards }),
};

export const SET_UPDATED_CARDS = ra.createRequestRaw('SET_UPDATED_CARDS');
export const setUpdatedCards = updatedCards =>
  ReduxAction.action(SET_UPDATED_CARDS, { updatedCards });

export const SET_NEW_CARDS = ra.createRequestRaw('SET_NEW_CARDS');
export const setNewCards = newCards => ReduxAction.action(SET_NEW_CARDS, { newCards });

export const SET_CARDS = ra.createRequestTypes('SET_CARDS');
export const setCards = {
  request: () => ReduxAction.action(SET_CARDS.REQUEST, {}),
  success: cards => ReduxAction.action(SET_CARDS.SUCCESS, { cards }),
};

export const RESET_CARDS = ra.createRequestRaw('RESET_CARDS');
export const resetCards = () => ReduxAction.action(RESET_CARDS, {});

export const USE_CARD_ABILITY = ra.createRequestTypes('USE_CARD_ABILITY');
export const useCardAbility = {
  request: playAreaIndex => ReduxAction.action(USE_CARD_ABILITY.REQUEST, { playAreaIndex }),
  success: (updatedCards, addedToDiscardPile, playerFieldSlots, opponentFieldSlots) =>
    ReduxAction.action(USE_CARD_ABILITY.SUCCESS, {
      updatedCards,
      addedToDiscardPile,
      playerFieldSlots,
      opponentFieldSlots,
    }),
};

export const FINISH_SPELL_CARD = ra.createRequestRaw('FINISH_SPELL_CARD');
export const finishSpellCard = () => ReduxAction.action(FINISH_SPELL_CARD, {});

export const SELECT_ABILITY = ra.createRequestRaw('SELECT_ABILITY');
export const selectAbility = abilityId => ReduxAction.action(SELECT_ABILITY, { abilityId });

// Use selectAbility instead, which will handle this case in the saga.
export const SELECT_OPPONENT_MINION_TARGETED_ABILITY = ra.createRequestRaw(
  'SELECT_OPPONENT_MINION_TARGETED_ABILITY',
);
export const selectOpponentMinionTargetedAbility = abilityId =>
  ReduxAction.action(SELECT_OPPONENT_MINION_TARGETED_ABILITY, { abilityId });

// Use selectAbility instead, which will handle this case in the saga.
export const SELECT_PLAYER_MINION_TARGETED_ABILITY = ra.createRequestRaw(
  'SELECT_PLAYER_MINION_TARGETED_ABILITY',
);
export const selectPlayerMinionTargetedAbility = abilityId =>
  ReduxAction.action(SELECT_PLAYER_MINION_TARGETED_ABILITY, { abilityId });

export const CANCEL_SELECT_MINION_TARGETED_ABILITY = ra.createRequestRaw(
  'CANCEL_SELECT_MINION_TARGETED_ABILITY',
);
export const cancelSelectMinionTargetedAbility = () =>
  ReduxAction.action(CANCEL_SELECT_MINION_TARGETED_ABILITY, {});

// May use cancelSelectMinionTargetedAbility instead
export const CANCEL_SELECT_OPPONENT_MINION_TARGETED_ABILITY = ra.createRequestRaw(
  'CANCEL_SELECT_OPPONENT_MINION_TARGETED_ABILITY',
);
export const cancelSelectOpponentMinionTargetedAbility = () =>
  ReduxAction.action(CANCEL_SELECT_OPPONENT_MINION_TARGETED_ABILITY, {});

// May use cancelSelectMinionTargetedAbility instead
export const CANCEL_SELECT_PLAYER_MINION_TARGETED_ABILITY = ra.createRequestRaw(
  'CANCEL_SELECT_PLAYER_MINION_TARGETED_ABILITY',
);
export const cancelSelectPlayerMinionTargetedAbility = () =>
  ReduxAction.action(CANCEL_SELECT_PLAYER_MINION_TARGETED_ABILITY, {});

// Use selectAbility instead, which will handle this case in the saga.
export const SELECT_PLAYER_TARGETED_ABILITY = ra.createRequestRaw('SELECT_PLAYER_TARGETED_ABILITY');
export const selectPlayerTargetedAbility = abilityId =>
  ReduxAction.action(SELECT_PLAYER_TARGETED_ABILITY, { abilityId });
