import { createSelector } from 'reselect';

const _playerEnergySelector = state => state.scGame.entities.game.player.energy;
const _playerHealthSelector = state => state.scGame.entities.game.player.health;

export const getCurrentEnergy = createSelector(
  _playerEnergySelector,
  energy => energy.current,
);

export const getMaxEnergy = createSelector(
  _playerEnergySelector,
  energy => energy.max,
);

export const getCurrentHealth = createSelector(
  _playerHealthSelector,
  health => health.current,
);

export const getMaxHealth = createSelector(
  _playerHealthSelector,
  health => health.max,
);
