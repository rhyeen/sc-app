import { Game } from "@shardedcards/sc-types/dist/game/entities/game.js";
import { localStore } from "../state/store.js";

export class GameDefiner {
  static getGame() {
    const state = localStore.getState();
    debugger;
    const game = new Game();
    return game;
  }
}