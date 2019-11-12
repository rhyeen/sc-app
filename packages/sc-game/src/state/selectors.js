import { createSelector } from 'reselect';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';

import { GAME_STATES } from '../entities/game-states.js';

const _gameMenuSelector = state => state.scGame.ui.menu;
const _gameStateSelector = state => state.scGame.ui.game;
const _pendingTurnSelector = state => state.scGame.entities.pendingTurn;
const _gameSelector = state => state.scGame.entities.game;

export const getPendingTurn = createSelector(
  _pendingTurnSelector,
  pendingTurn => pendingTurn,
);

export const isGameMenuOpen = createSelector(
  _gameMenuSelector,
  menu => menu.show,
);

export const isPlayingCards = createSelector(
  _gameStateSelector,
  game => game.state === GAME_STATES.PLAYING,
);

export const isCrafting = createSelector(
  _gameStateSelector,
  game => game.state === GAME_STATES.CRAFTING,
);

export const hasWon = createSelector(
  _gameStateSelector,
  game => game.state === GAME_STATES.WIN,
);

export const hasLost = createSelector(
  _gameStateSelector,
  game => game.state === GAME_STATES.LOSE,
);

export const getGame = createSelector(
  _gameSelector,
  game => game,
);
