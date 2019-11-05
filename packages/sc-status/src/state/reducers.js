import * as Actions from './actions.js';
import { EnergyStatus } from '../services/energy-status.js';
import { localStore } from './store.js';

const INITIAL_STATE = {
  entities: {
    player: {
      energy: {
        max: 0,
        current: 0,
        pending: 0
      },
      health: {
        max: 0,
        current: 0,
        pending: 0
      }
    }
  }
};

function _setPlayerPendingEnergy(state, energy) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        energy: {
          ...state.entities.player.energy,
          pending: energy
        }
      }
    }
  };
}

function _setPlayerCurrentHealth(state, health) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        health: {
          ...state.entities.player.health,
          pending: health,
          current: health
        }
      }
    }
  };
}

function _setPlayerCurrentEnergy(state, energy) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        energy: {
          ...state.entities.player.energy,
          pending: energy,
          current: energy
        }
      }
    }
  };
}

function _setPlayerMaxHealth(state, health) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        health: {
          ...state.entities.player.health,
          max: health
        }
      }
    }
  };
}

function _setPlayerMaxEnergy(state, energy) {
  return {
    ...state,
    entities: {
      ...state.entities,
      player: {
        ...state.entities.player,
        energy: {
          ...state.entities.player.energy,
          max: energy
        }
      }
    }
  };
}

const reducer = (state = INITIAL_STATE, action) => {
  let newState = state; let newEnergies;
  switch (action.type) {
    case Actions.SET_PLAYER_STATUS.SUCCESS:
      newState = _setPlayerCurrentHealth(newState, action.status.health.current);
      newState = _setPlayerMaxHealth(newState, action.status.health.max);
      newState = _setPlayerCurrentEnergy(newState, action.status.energy.current);
      return _setPlayerMaxEnergy(newState, action.status.energy.max);
    case Actions.SET_PLAYER_HEALTH:
      return _setPlayerCurrentHealth(newState, action.health);
    case Actions.RESET_PLAYER_ENERGY:
    return _setPlayerMaxEnergy(newState, newState.entities.player.energy.max);   
    case Actions.ALLOCATE_PLAYER_ENERGY:
      return _setPlayerPendingEnergy(newState, EnergyStatus.setValidEnergy(newState.energy.current - action.energyCost));
    case Actions.SPEND_ALLOCATED_PLAYER_ENERGY.SUCCESS:
      return _setPlayerCurrentEnergy(newState, newState.entities.player.energy.pending);
    case Actions.CANCEL_ALLOCATED_PLAYER_ENERGY:
      return _setPlayerPendingEnergy(newState, newState.entities.player.energy.current);
    case Actions.MODIFY_PLAYER_ENERGY.SUCCESS:
      newEnergies = EnergyStatus.getModifiedEnergy(newState.entities.player.energy, action.maxEnergyModifier, action.currentEnergyModifier);
      newState = _setPlayerCurrentEnergy(newState, newEnergies.current);
      return _setPlayerMaxEnergy(newState, newEnergies.max);
    case Actions.UPDATE_STATUS:
      if (!action.statusUpdates) {
        return newState;
      }
      if (action.statusUpdates.player) {
        if (action.statusUpdates.player.energy) {
          if (action.statusUpdates.player.energy.maxModifier) {
            newEnergies = EnergyStatus.getModifiedEnergy(newState.entities.player.energy, action.statusUpdates.player.energy.maxModifier, null);
            newState = _setPlayerMaxEnergy(newState, newEnergies.max);
          }
          if (action.statusUpdates.player.energy.currentModifier) {
            newEnergies = EnergyStatus.getModifiedEnergy(newState.entities.player.energy, null, action.statusUpdates.player.energy.currentModifier);
            newState = _setPlayerCurrentEnergy(newState, newEnergies.current);
          }
        }
      }
      return newState;
    default:
      return newState;
  }
};

localStore.addReducers({ scStatus: reducer });
