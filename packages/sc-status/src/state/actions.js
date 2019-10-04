import { ReduxAction } from '../../../utils/redux-action.js';

const ra = new ReduxAction('SR_STATUS');

export const SET_PLAYER_STATUS = ra.createRequestTypes('SET_PLAYER_STATUS');
export const setPlayerStatus = {
  request: () => ReduxAction.action(SET_PLAYER_STATUS.REQUEST, {}),
  success: (maxHealth, currentHealth, maxEnergy, currentEnergy) =>
    ReduxAction.action(SET_PLAYER_STATUS.SUCCESS, {
      status: {
        health: {
          current: currentHealth,
          max: maxHealth,
        },
        energy: {
          current: currentEnergy,
          max: maxEnergy,
        },
      },
    }),
};

export const SET_PLAYER_HEALTH = ra.createRequestRaw('SET_PLAYER_HEALTH');
export const setPlayerHealth = health => ReduxAction.action(SET_PLAYER_HEALTH, { health });

export const RESET_PLAYER_ENERGY = ra.createRequestRaw('RESET_PLAYER_ENERGY');
export const resetPlayerEnergy = () => ReduxAction.action(RESET_PLAYER_ENERGY, {});

export const ALLOCATE_PLAYER_ENERGY = ra.createRequestRaw('ALLOCATE_PLAYER_ENERGY');
export const allocatePlayerEnergy = energyCost =>
  ReduxAction.action(ALLOCATE_PLAYER_ENERGY, { energyCost });

export const SPEND_ALLOCATED_PLAYER_ENERGY = ra.createRequestTypes('SPEND_ALLOCATED_PLAYER_ENERGY');
export const spendAllocatedPlayerEnergy = {
  request: () => ReduxAction.action(SPEND_ALLOCATED_PLAYER_ENERGY.REQUEST, {}),
  success: () => ReduxAction.action(SPEND_ALLOCATED_PLAYER_ENERGY.SUCCESS, {}),
};

export const CANCEL_ALLOCATED_PLAYER_ENERGY = ra.createRequestRaw('CANCEL_ALLOCATED_PLAYER_ENERGY');
export const cancelAllocatedPlayerEnergy = () =>
  ReduxAction.action(CANCEL_ALLOCATED_PLAYER_ENERGY, {});

export const MODIFY_PLAYER_ENERGY = ra.createRequestTypes('MODIFY_PLAYER_ENERGY');
export const modifyPlayerEnergy = {
  request: (maxEnergyModifier, currentEnergyModifier) =>
    ReduxAction.action(MODIFY_PLAYER_ENERGY.REQUEST, { maxEnergyModifier, currentEnergyModifier }),
  success: (maxEnergyModifier, currentEnergyModifier) =>
    ReduxAction.action(MODIFY_PLAYER_ENERGY.SUCCESS, { maxEnergyModifier, currentEnergyModifier }),
};

export const UPDATE_STATUS = ra.createRequestRaw('UPDATE_STATUS');
export const updateStatus = statusUpdates => ReduxAction.action(UPDATE_STATUS, { statusUpdates });
