import { ReduxAction } from '../../../utils/redux-action.js';

const ra = new ReduxAction('SR_CRAFT');

export const SELECT_BASE_DRAFT_CARD = ra.createRequestRaw('SELECT_BASE_DRAFT_CARD');
export const selectBaseDraftCard = baseCardIndex =>
  ReduxAction.action(SELECT_BASE_DRAFT_CARD, { baseCardIndex });

export const CANCEL_SELECT_CRAFTING_COMPONENT = ra.createRequestRaw(
  'CANCEL_SELECT_CRAFTING_COMPONENT',
);
export const cancelSelectCraftingComponent = () =>
  ReduxAction.action(CANCEL_SELECT_CRAFTING_COMPONENT, {});

export const FORGE_SELECTED_BASE_DRAFT_CARD = ra.createRequestRaw('FORGE_SELECTED_BASE_DRAFT_CARD');
export const forgeSelectedBaseDraftCard = () =>
  ReduxAction.action(FORGE_SELECTED_BASE_DRAFT_CARD, {});

export const FINISH_FORGE_SELECTED_BASE_DRAFT_CARD = ra.createRequestTypes(
  'FINISH_FORGE_SELECTED_BASE_DRAFT_CARD',
);
export const finishForgeSelectedBaseDraftCard = {
  request: forgeSlotIndex =>
    ReduxAction.action(FINISH_FORGE_SELECTED_BASE_DRAFT_CARD.REQUEST, { forgeSlotIndex }),
  success: () => ReduxAction.action(FINISH_FORGE_SELECTED_BASE_DRAFT_CARD.SUCCESS, {}),
};

export const FINALIZE_SELECTED_FORGE_DRAFT_CARD = ra.createRequestTypes(
  'FINALIZE_SELECTED_FORGE_DRAFT_CARD',
);
export const finalizeSelectedForgeDraftCard = {
  request: () => ReduxAction.action(FINALIZE_SELECTED_FORGE_DRAFT_CARD.REQUEST, {}),
  success: finalizedCard =>
    ReduxAction.action(FINALIZE_SELECTED_FORGE_DRAFT_CARD.SUCCESS, { finalizedCard }),
};

export const SET_FINALIZE_SELECTED_FORGE_DRAFT_CARD_NAME_DATA = ra.createRequestRaw(
  'SET_FINALIZE_SELECTED_FORGE_DRAFT_CARD_NAME_DATA',
);
export const setFinalizedSelectedForgeDraftCardNameData = (possibleNames, cardOrigin) =>
  ReduxAction.action(SET_FINALIZE_SELECTED_FORGE_DRAFT_CARD_NAME_DATA, {
    possibleNames,
    cardOrigin,
  });

export const ADD_FINALIZED_CARD_TO_DECK = ra.createRequestTypes('ADD_FINALIZED_CARD_TO_DECK');
export const addFinalizedCardToDeck = {
  request: (cardName, cardNameId, numberOfInstances) =>
    ReduxAction.action(ADD_FINALIZED_CARD_TO_DECK.REQUEST, {
      cardName,
      cardNameId,
      numberOfInstances,
    }),
  success: () => ReduxAction.action(ADD_FINALIZED_CARD_TO_DECK.SUCCESS, {}),
};

export const SELECT_CRAFTING_PART = ra.createRequestRaw('SELECT_CRAFTING_PART');
export const selectCraftingPart = craftingPartIndex =>
  ReduxAction.action(SELECT_CRAFTING_PART, { craftingPartIndex });

export const SELECT_FORGE_FOR_CRAFTING_PART = ra.createRequestTypes(
  'SELECT_FORGE_FOR_CRAFTING_PART',
);
export const selectForgeForCraftingPart = {
  request: forgeSlotIndex =>
    ReduxAction.action(SELECT_FORGE_FOR_CRAFTING_PART.REQUEST, { forgeSlotIndex }),
  success: modifiedCard =>
    ReduxAction.action(SELECT_FORGE_FOR_CRAFTING_PART.SUCCESS, { modifiedCard }),
};

export const ADD_CRAFTING_PART = ra.createRequestTypes('ADD_CRAFTING_PART');
export const addCraftingPart = {
  request: () => ReduxAction.action(ADD_CRAFTING_PART.REQUEST, {}),
  success: () => ReduxAction.action(ADD_CRAFTING_PART.SUCCESS, {}),
};

export const SELECT_FORGE_SLOT = ra.createRequestRaw('SELECT_FORGE_SLOT');
export const selectForgeSlot = forgeSlotIndex =>
  ReduxAction.action(SELECT_FORGE_SLOT, { forgeSlotIndex });
