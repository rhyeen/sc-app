import './src/state/reducers.js';
import './src/state/sagas.js';

import { ScLostDeckBarItem } from './src/components/bar-items/ScLostDeckBarItem.js';
import { ScDiscardDeckBarItem } from './src/components/bar-items/ScDiscardDeckBarItem.js';
import { ScDrawDeckBarItem } from './src/components/bar-items/ScDrawDeckBarItem.js';

import { ScCardValue } from './src/components/card-parts/ScCardValue.js';
import { ScPlayerHandCard } from './src/components/player-hand/ScPlayerHandCard.js';
import { ScPlayerHand } from './src/components/player-hand/ScPlayerHand.js';

import { ScTargetMinionAbilityCover } from './src/components/play-area/covers/ScTargetMinionAbilityCover.js';
import { ScPlaceMinionCover } from './src/components/play-area/covers/ScPlaceMinionCover.js';
import { ScAttackCardCover } from './src/components/play-area/covers/ScAttackCardCover.js';
import { ScCoverFieldCard } from './src/components/play-area/covers/ScCoverFieldCard.js';

import { ScMinionCard } from './src/components/play-area/cards/ScMinionCard.js';
import { ScMinionFieldSlot } from './src/components/play-area/cards/ScMinionFieldSlot.js';

import { ScDungeonSlotBacklog } from './src/components/play-area/ScDungeonSlotBacklog.js';
import { ScDungeonFieldBacklog } from './src/components/play-area/ScDungeonFieldBacklog.js';
import { ScPlayField } from './src/components/play-area/ScPlayField.js';
import { ScPlayArea } from './src/components/play-area/ScPlayArea.js';

window.customElements.define('sc-lost-deck-bar-item', ScLostDeckBarItem);
window.customElements.define('sc-discard-deck-bar-item', ScDiscardDeckBarItem);
window.customElements.define('sc-draw-deck-bar-item', ScDrawDeckBarItem);

window.customElements.define('sc-card-value', ScCardValue);
window.customElements.define('sc-player-hand-card', ScPlayerHandCard);
window.customElements.define('sc-player-hand', ScPlayerHand);

window.customElements.define('sc-target-minion-ability-cover', ScTargetMinionAbilityCover);
window.customElements.define('sc-place-minion-cover', ScPlaceMinionCover);
window.customElements.define('sc-attack-card-cover', ScAttackCardCover);
window.customElements.define('sc-cover-field-card', ScCoverFieldCard);

window.customElements.define('sc-minion-card', ScMinionCard);
window.customElements.define('sc-minion-field-slot', ScMinionFieldSlot);

window.customElements.define('sc-dungeon-slot-backlog', ScDungeonSlotBacklog);
window.customElements.define('sc-dungeon-field-backlog', ScDungeonFieldBacklog);
window.customElements.define('sc-play-field', ScPlayField);
window.customElements.define('sc-play-area', ScPlayArea);
