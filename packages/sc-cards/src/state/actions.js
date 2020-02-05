import { ReduxAction } from '../../../utils/redux-action.js';

const ra = new ReduxAction('SR_CARDS');

export const CANCEL_SELECTED_CARD = ra.createRequestRaw('CANCEL_SELECTED_CARD');
export const cancelSelectedCard = () => ReduxAction.action(CANCEL_SELECTED_CARD, {});

export const SELECT_HAND_CARD = ra.createRequestRaw('SELECT_HAND_CARD');
export const selectHandCard = handCardIndex =>
  ReduxAction.action(SELECT_HAND_CARD, { handCardIndex });

export const SELECT_DUNGEON_FIELD_SLOT_CARD = ra.createRequestRaw('SELECT_DUNGEON_FIELD_SLOT_CARD');
export const selectDungeonFieldSlotCard = fieldSlotIndex =>
  ReduxAction.action(SELECT_DUNGEON_FIELD_SLOT_CARD, { fieldSlotIndex });

export const PREVIEW_ATTACK_MINION = ra.createRequestRaw('PREVIEW_ATTACK_MINION');
export const previewAttackMinion = fieldSlotIndex =>
  ReduxAction.action(PREVIEW_ATTACK_MINION, { fieldSlotIndex });

export const PREVIEW_PLAYER_FIELD_SLOT_CARD = ra.createRequestRaw('PREVIEW_PLAYER_FIELD_SLOT_CARD');
export const previewPlayerFieldSlotCard = () =>
  ReduxAction.action(PREVIEW_PLAYER_FIELD_SLOT_CARD, {});

export const PREVIEW_PLACE_MINION = ra.createRequestRaw('PREVIEW_PLACE_MINION');
export const previewPlaceMinion = () => ReduxAction.action(PREVIEW_PLACE_MINION, {});

export const PREVIEW_CARD_ABILITIES = ra.createRequestRaw('PREVIEW_CARD_ABILITIES');
export const previewCardAbilities = () => ReduxAction.action(PREVIEW_CARD_ABILITIES, {});

export const FINISH_USING_ABILITIES = ra.createRequestRaw('FINISH_USING_ABILITIES');
export const finishUsingAbilities = () => ReduxAction.action(FINISH_USING_ABILITIES, {});

export const PLACE_MINION = ra.createRequestTypes('PLACE_MINION');
export const placeMinion = {
  request: fieldSlotIndex => ReduxAction.action(PLACE_MINION.REQUEST, { fieldSlotIndex }),
  success: () => ReduxAction.action(PLACE_MINION.SUCCESS, {}),
};

export const CANCEL_PREVIEW_PLAYER_FIELD_SLOT_CARD = ra.createRequestRaw(
  'CANCEL_PREVIEW_PLAYER_FIELD_SLOT_CARD',
);

export const cancelPreviewPlayerFieldSlotCard = () =>
  ReduxAction.action(CANCEL_PREVIEW_PLAYER_FIELD_SLOT_CARD, {});

export const ATTACK_MINION = ra.createRequestTypes('ATTACK_MINION');
export const attackMinion = {
  request: fieldSlotIndex => ReduxAction.action(ATTACK_MINION.REQUEST, { fieldSlotIndex }),
  success: () => ReduxAction.action(ATTACK_MINION.SUCCESS, {}),
};

export const SELECT_ABILITY = ra.createRequestTypes('SELECT_ABILITY');
export const selectAbility = {
  request: abilityId => ReduxAction.action(SELECT_ABILITY.REQUEST, { abilityId }),
  success: (abilityId, target) => ReduxAction.action(SELECT_ABILITY.SUCCESS, { abilityId, target }),
};

export const USE_SELECTED_ABILITY = ra.createRequestTypes('USE_SELECTED_ABILITY');
export const useSelectedAbility = {
  request: () => ReduxAction.action(USE_SELECTED_ABILITY.REQUEST, {}),
  success: () => ReduxAction.action(USE_SELECTED_ABILITY.SUCCESS, {}),
};
