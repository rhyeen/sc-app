import { createSelector } from 'reselect';
import { GamePhase } from '@shardedcards/sc-types/dist/game/enums/game-phase.js';

const _gameMenuSelector = state => state.scGame.ui.menu;
const _loadingSelector = state => state.scGame.ui.loading;
const _pendingTurnSelector = state => state.scGame.entities.pendingTurn;
const _gameSelector = state => state.scGame.entities.game;
const _gameVersionSelector = state => state.scGame.ui.game.version;
const _playerIdSelector = state => state.scGame.entities.playerId;
const _playerDeckIdSelector = state => state.scGame.entities.playerDeckId;
const _dungeonIdSelector = state => state.scGame.entities.dungeonId;

export const isLoading = createSelector(
  _loadingSelector,
  loading => loading,
);

export const getPendingTurn = createSelector(
  _pendingTurnSelector,
  pendingTurn => pendingTurn,
);

export const isGameMenuOpen = createSelector(
  _gameMenuSelector,
  menu => menu.show,
);

export const hasWon = createSelector(
  _gameSelector,
  game => (!game ? false : game.phase === GamePhase.Win),
);

export const hasLost = createSelector(
  _gameSelector,
  game => (!game ? false : game.phase === GamePhase.Lose),
);

export const isBattling = createSelector(
  _gameSelector,
  game => (!game ? false : game.phase === GamePhase.Battle),
);

export const isDrafting = createSelector(
  _gameSelector,
  game => (!game ? false : game.phase === GamePhase.Draft),
);

export const getGame = createSelector(
  _gameSelector,
  game => game,
);

export const getGameId = createSelector(
  _gameSelector,
  game => (!game ? null : game.id),
);

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
