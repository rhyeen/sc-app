import { all, takeEvery, takeLatest, put, call } from 'redux-saga/effects'; // eslint-disable-line import/extensions
import { DraftCardModifier } from '@shardedcards/sc-types/dist/card/services/draft-card-modifier.js';
import { AddCraftedCardToDeckAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action/player-turn-actions/add-crafted-card-to-deck-action.js';
import { AddCraftingPartAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action/player-turn-actions/add-crafting-part-action.js';
import { CraftBaseCardAction } from '@shardedcards/sc-types/dist/turn/entities/turn-action/player-turn-actions/craft-base-card-action.js';
import { Log } from 'interface-handler/src/logger.js';
import * as Actions from './actions.js';
import * as CraftInterface from '../services/interface/craft.js';
import * as Selectors from './selectors.js';
import * as GameSelectors from '../../../sc-game/src/state/selectors.js';
import { localStore } from './store.js';
import * as GameActions from '../../../sc-game/src/state/actions.js';

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

function _getModifiedForgeCard() {
  const state = localStore.getState();
  const { craftingPart, forgeSlot } = Selectors.getSelectedCraftingPart(state);
  const { modifiedCard } = DraftCardModifier.addCraftingPart(forgeSlot.draftCard, craftingPart);
  return modifiedCard;
}

function _getAddCraftingPartAction() {
  const state = localStore.getState();
  const { craftingPartIndex, forgeSlotIndex } = Selectors.getSelectedCraftingPart(state);
  return new AddCraftingPartAction(craftingPartIndex, forgeSlotIndex);
}

function* _finishAddCraftingPart() {
  const forgeCard = yield _getModifiedForgeCard();
  const action = yield _getAddCraftingPartAction();
  yield put(GameActions.recordAction(action));
  yield put(Actions.finishAddCraftingPart.success(forgeCard));
}

function _getFinalCard() {
  const state = localStore.getState();
  const { draftCard } = Selectors.getSelectedForgeSlotCardSelector(state);
  return draftCard.buildCard();
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

function _getAddCraftedCardToDeckAction(numberOfInstances) {
  const state = localStore.getState();
  const { forgeSlotIndex } = Selectors.getSelectedForgeSlotCardSelector(state);
  const finishedForgeCard = Selectors.getFinishedForgeCard(state);
  return new AddCraftedCardToDeckAction(
    forgeSlotIndex,
    numberOfInstances,
    finishedForgeCard.id,
    finishedForgeCard.name,
  );
}

function* _addCraftedCardToDeck({ numberOfInstances }) {
  // @NOTE: I originally added the card to the actual discard deck, but since we don't have
  // the instance ids yet, it's a futile effort.
  const action = yield _getAddCraftedCardToDeckAction(numberOfInstances);
  yield put(GameActions.recordAction(action));
  yield put(Actions.addCraftedCardToDeck.success());
}

function _getForgeBaseCardAction(forgeSlotIndex) {
  const state = localStore.getState();
  const selectedCraftingComponent = Selectors.getSelectedCraftingComponent(state);
  return new CraftBaseCardAction(selectedCraftingComponent.baseCardIndex, forgeSlotIndex);
}

function* _finishForgeSelectedBaseDraftCard({ forgeSlotIndex }) {
  const action = yield _getForgeBaseCardAction(forgeSlotIndex);
  yield put(GameActions.fulfillTurnAction.request(action));
  yield put(Actions.finishForgeSelectedBaseDraftCard.success());
}

function _getFinalizedSelectedForgeDraftCard() {
  const state = localStore.getState();
  const selectedCraftingComponent = Selectors.getSelectedCraftingComponent(state);
  const game = GameSelectors.getGame(state);
  const draftCard = game.player.craftingTable.forge[selectedCraftingComponent.forgeSlotIndex].card;
  return draftCard.buildCard();
}

function _getCardNames(card) {
  return CraftInterface.getCardNames(card.hash);
}

function* _finalizeSelectedForgeDraftCard() {
  const card = yield _getFinalizedSelectedForgeDraftCard();
  const { data } = yield _getCardNames(card);
  yield put(Actions.finalizeSelectedForgeDraftCard.success(card, data.names, data.origin));
}

function* saga() {
  yield all([
    takeEvery(
      Actions.FINISH_FORGE_SELECTED_BASE_DRAFT_CARD.REQUEST,
      _finishForgeSelectedBaseDraftCard,
    ),
    takeEvery(
      Actions.FINALIZE_SELECTED_FORGE_DRAFT_CARD.REQUEST,
      _finalizeSelectedForgeDraftCard,
    ),
    takeLatest(Actions.SET_CRAFTING_BASE_CARD.REQUEST, _setCraftingBaseCard),
    takeLatest(Actions.SET_CRAFTING_PARTS.REQUEST, _setCraftingParts),
    takeEvery(Actions.FINISH_ADD_CRAFTING_PART.REQUEST, _finishAddCraftingPart),
    takeEvery(Actions.FINISH_FORGING_CARD.REQUEST, _finishForgingCard),
    takeEvery(Actions.ADD_CRAFTED_CARD_TO_DECK.REQUEST, _addCraftedCardToDeck),
  ]);
}

localStore.runSaga(saga);
