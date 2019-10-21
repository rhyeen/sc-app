import { all, takeEvery, takeLatest, put, call } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import { DraftCardModifier } from '@shardedcards/sct-card/dist/browser/services/draft-card-modifier.js';
import * as Actions from './actions.js';
import * as CraftInterface from '../services/interface/craft.js';
import * as Selectors from './selectors.js';
import { localStore } from './store.js';
import { buildCardDetails } from '../services/card-builder.js';
import * as GameActions from '../../../sc-game/src/state/actions.js';
import { ACTION_TYPES } from '../../../sc_shared/src/entities/turn-keywords.js';

function* _setCraftingBaseCard() {
  try {
    const { craftingBaseCard } = yield call(CraftInterface.getCraftingBaseCard);
    yield put(Actions.setCraftingBaseCard.success(craftingBaseCard));
  } catch (e) {
    yield Log.error(`@TODO: unable to _setCraftingBaseCard(): ${e}`);
  }
}

function* _setCraftingParts() {
  try {
    const { craftingParts } = yield call(CraftInterface.getCraftingParts);
    yield put(Actions.setCraftingParts.success(craftingParts));
  } catch (e) {
    yield Log.error(`@TODO: unable to _setCraftingParts(): ${e}`);
  }
}

function* _finishAddCraftingPart() {
  const forgeCard = yield _getModifiedForgeCard();
  const action = yield _getAddCraftingPartAction();
  yield put(GameActions.recordAction(action));
  yield put(Actions.finishAddCraftingPart.success(forgeCard));
}

function _getModifiedForgeCard() {
  const state = localStore.getState();
  const { craftingPart, forgeSlot } = Selectors.getSelectedCraftingPartSelector(state);
  const { modifiedCard } = DraftCardModifier.addCraftingPart(forgeSlot.draftCard, craftingPart);
  return modifiedCard;
}

function _getAddCraftingPartAction() {
  const state = localStore.getState();
  const { craftingPartIndex, forgeSlotIndex } = Selectors.getSelectedCraftingPartSelector(state);
  return {
    type: ACTION_TYPES.ADD_CRAFTING_PART,
    craftingPartIndex,
    forgeSlotIndex
  };
}

function* _finishForgingCard() {
  try {
    const finalCard = yield _getFinalCard();
    const { cardName, cardId } = yield call(CraftInterface.getCardIdentifiers, finalCard);
    finalCard.name = cardName;
    finalCard.id = cardId;
    yield put(Actions.finishForgingCard.success(finalCard));
  } catch (e) {
    yield Log.error(`@TODO: unable to _finishForgingCard(): ${e}`);
  }
}

function _getFinalCard() {
  const state = localStore.getState();
  const { draftCard } = Selectors.getSelectedForgeSlotCardSelector(state);
  return draftCard.buildCard();
}

function* _addCraftedCardToDeck({numberOfInstances}) {
  // @NOTE: I originally added the card to the actual discard pile, but since we don't have
  // the instance ids yet, it's a futile effort.
  const action = yield _getAddCraftedCardToDeckAction(numberOfInstances);
  yield put(GameActions.recordAction(action));
  yield put(Actions.addCraftedCardToDeck.success());
}

function _getAddCraftedCardToDeckAction(numberOfInstances) {
  const state = localStore.getState();
  const { forgeSlotIndex } = Selectors.getSelectedForgeSlotCardSelector(state);  
  const finishedForgeCard = Selectors.getFinishedForgeCard(state);
  return {
    type: ACTION_TYPES.ADD_CRAFTED_CARD_TO_DECK,
    numberOfInstances,
    cardName: finishedForgeCard.name,
    cardId: finishedForgeCard.id,
    forgeSlotIndex
  };
}

function* _finishForgeSelectedCraftingBaseCard({forgeSlotIndex}) {
  const action = yield _getForgeBaseCardAction(forgeSlotIndex);
  yield put(GameActions.recordAction(action));
  yield put(Actions.finishForgeSelectedCraftingBaseCard.success(forgeSlotIndex));
}

function _getForgeBaseCardAction(forgeSlotIndex) {
  return {
    type: ACTION_TYPES.CRAFT_BASE_CARD,
    forgeSlotIndex
  };
}

function* saga() {
  yield all([
    takeLatest(Actions.SET_CRAFTING_BASE_CARD.REQUEST, _setCraftingBaseCard),
    takeLatest(Actions.SET_CRAFTING_PARTS.REQUEST, _setCraftingParts),
    takeEvery(Actions.FINISH_ADD_CRAFTING_PART.REQUEST, _finishAddCraftingPart),
    takeEvery(Actions.FINISH_FORGING_CARD.REQUEST, _finishForgingCard),
    takeEvery(Actions.ADD_CRAFTED_CARD_TO_DECK.REQUEST, _addCraftedCardToDeck),
    takeEvery(Actions.FINISH_FORGE_SELECTED_CRAFTING_BASE_CARD.REQUEST, _finishForgeSelectedCraftingBaseCard),
  ]);
}

localStore.runSaga(saga);
