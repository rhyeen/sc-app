import './src/state/reducers.js';
import './src/state/sagas.js';

import { ScLostPileBarItem } from './src/components/bar-items/ScLostPileBarItem.js';
import { ScDiscardPileBarItem } from './src/components/bar-items/ScDiscardPileBarItem.js';
import { ScDrawPileBarItem } from './src/components/bar-items/ScDrawPileBarItem.js';
import { ScPlayerHand } from './src/components/player-hand/ScPlayerHand.js';
import { ScPlayerHandCard } from './src/components/player-hand/ScPlayerHandCard.js';
import { ScCardValue } from './src/components/card-parts/ScCardValue.js';
import { ScPlayArea } from './src/components/play-area/ScPlayArea.js';
import { ScPlayField } from './src/components/play-area/ScPlayField.js';
import { ScOpponentFieldBacklog } from './src/components/play-area/ScOpponentFieldBacklog.js';
import { ScOpponentSlotBacklog } from './src/components/play-area/ScOpponentSlotBacklog.js';
import { ScMinionFieldCard } from './src/components/play-area/cards/ScMinionFieldCard.js';
import { ScMinionCard } from './src/components/play-area/cards/ScMinionCard.js';

window.customElements.define('sc-lost-pile-bar-item', ScLostPileBarItem);
window.customElements.define('sc-discard-pile-bar-item', ScDiscardPileBarItem);
window.customElements.define('sc-draw-pile-bar-item', ScDrawPileBarItem);
window.customElements.define('sc-card-value', ScCardValue);
window.customElements.define('sc-player-hand-card', ScPlayerHandCard);
window.customElements.define('sc-player-hand', ScPlayerHand);
window.customElements.define('sc-minion-card', ScMinionCard);
window.customElements.define('sc-minion-field-card', ScMinionFieldCard);
window.customElements.define('sc-play-field', ScPlayField);
window.customElements.define('sc-opponent-slot-backlog', ScOpponentSlotBacklog);
window.customElements.define('sc-opponent-field-backlog', ScOpponentFieldBacklog);
window.customElements.define('sc-play-area', ScPlayArea);
