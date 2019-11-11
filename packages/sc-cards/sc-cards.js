import './src/state/reducers.js';
import './src/state/sagas.js';

import { ScLostPileBarItem } from './src/components/bar-items/ScLostPileBarItem.js';
import { ScDiscardPileBarItem } from './src/components/bar-items/ScDiscardPileBarItem.js';
import { ScDrawPileBarItem } from './src/components/bar-items/ScDrawPileBarItem.js';

import { ScCardValue } from './src/components/card-parts/ScCardValue.js';
import { ScPlayerHandCard } from './src/components/player-hand/ScPlayerHandCard.js';
import { ScPlayerHand } from './src/components/player-hand/ScPlayerHand.js';

import { ScTargetMinionAbilityCover } from './src/components/play-area/covers/ScTargetMinionAbilityCover.js';
import { ScPlaceMinionCover } from './src/components/play-area/covers/ScPlaceMinionCover.js';
import { ScAttackCardCover } from './src/components/play-area/covers/ScAttackCardCover.js';
import { ScCoverFieldCard } from './src/components/play-area/covers/ScCoverFieldCard.js';

import { ScMinionCard } from './src/components/play-area/cards/ScMinionCard.js';
import { ScMinionFieldCard } from './src/components/play-area/cards/ScMinionFieldCard.js';

import { ScOpponentSlotBacklog } from './src/components/play-area/ScOpponentSlotBacklog.js';
import { ScOpponentFieldBacklog } from './src/components/play-area/ScOpponentFieldBacklog.js';
import { ScPlayField } from './src/components/play-area/ScPlayField.js';
import { ScPlayArea } from './src/components/play-area/ScPlayArea.js';

window.customElements.define('sc-lost-pile-bar-item', ScLostPileBarItem);
window.customElements.define('sc-discard-pile-bar-item', ScDiscardPileBarItem);
window.customElements.define('sc-draw-pile-bar-item', ScDrawPileBarItem);

window.customElements.define('sc-card-value', ScCardValue);
window.customElements.define('sc-player-hand-card', ScPlayerHandCard);
window.customElements.define('sc-player-hand', ScPlayerHand);

window.customElements.define('sc-target-minion-ability-cover', ScTargetMinionAbilityCover);
window.customElements.define('sc-place-minion-cover', ScPlaceMinionCover);
window.customElements.define('sc-attack-card-cover', ScAttackCardCover);
window.customElements.define('sc-cover-field-card', ScCoverFieldCard);

window.customElements.define('sc-minion-card', ScMinionCard);
window.customElements.define('sc-minion-field-card', ScMinionFieldCard);

window.customElements.define('sc-opponent-slot-backlog', ScOpponentSlotBacklog);
window.customElements.define('sc-opponent-field-backlog', ScOpponentFieldBacklog);
window.customElements.define('sc-play-field', ScPlayField);
window.customElements.define('sc-play-area', ScPlayArea);
