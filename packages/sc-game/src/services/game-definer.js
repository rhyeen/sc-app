import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { Log } from 'interface-handler/src/logger.js';
import { localStore } from '../state/store.js';

export class GameDefiner {
  static getGame() {
    const state = localStore.getState();
    // debugger;
    Log.info('@TODO:');
    Log.info(state);
    const game = new Game();
    return game;
  }
}
