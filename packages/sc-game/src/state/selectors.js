import { createSelector } from 'reselect';

import { GAME_STATES } from '../entities/game-states.js';

const _gameMenuSelector = state => state.scGame.ui.menu;
const _uiGameSelector = state => state.scGame.ui.game;
const _pendingTurnSelector = state => state.scGame.entities.pendingTurn;
const _gameSelector = state => state.scGame.entities.game;
const _gameVersionSelector = state => state.scGame.ui.game.version;
const _playerIdSelector = state => state.scGame.entities.playerId;
const _playerDeckIdSelector = state => state.scGame.entities.playerDeckId;
const _dungeonIdSelector = state => state.scGame.entities.dungeonId;

export const getPendingTurn = createSelector(
  _pendingTurnSelector,
  pendingTurn => pendingTurn,
);

export const isGameMenuOpen = createSelector(
  _gameMenuSelector,
  menu => menu.show,
);

export const isPlayingCards = createSelector(
  _uiGameSelector,
  game => game.state === GAME_STATES.PLAYING,
);

export const isCrafting = createSelector(
  _uiGameSelector,
  game => game.state === GAME_STATES.CRAFTING,
);

export const hasWon = createSelector(
  _uiGameSelector,
  game => game.state === GAME_STATES.WIN,
);

export const hasLost = createSelector(
  _uiGameSelector,
  game => game.state === GAME_STATES.LOSE,
);

export const getGame = createSelector(
  _gameSelector,
  game => game,
);

export const getGameId = createSelector(
  _gameSelector,
  game => game.id,
)

export const getGameVersion = createSelector(
  _gameVersionSelector,
  gameVersion => gameVersion,
);

export const getPlayerId = createSelector(
  _playerIdSelector,
  playerId => playerId,
);

export const getPlayerDeckId = createSelector(
  _playerDeckIdSelector,
  playerDeckId => playerDeckId,
);

export const getDungeonId = createSelector(
  _dungeonIdSelector,
  dungeonId => dungeonId,
);
