import './src/state/reducers.js';
import './src/state/sagas.js';

import { ScLostPileBarItem } from './src/components/bar-items/ScLostPileBarItem.js';
import { ScDiscardPileBarItem } from './src/components/bar-items/ScDiscardPileBarItem.js';
import { ScDrawPileBarItem } from './src/components/bar-items/ScDrawPileBarItem.js';
import { ScPlayerHand } from './src/components/player-hand/ScPlayerHand.js';
import { ScPlayerHandCard } from './src/components/player-hand/ScPlayerHandCard.js';
import { ScCardValue } from './src/components/card-parts/ScCardValue.js';

window.customElements.define('sc-lost-pile-bar-item', ScLostPileBarItem);
window.customElements.define('sc-discard-pile-bar-item', ScDiscardPileBarItem);
window.customElements.define('sc-draw-pile-bar-item', ScDrawPileBarItem);
window.customElements.define('sc-card-value', ScCardValue);
window.customElements.define('sc-player-hand-card', ScPlayerHandCard);
window.customElements.define('sc-player-hand', ScPlayerHand);
