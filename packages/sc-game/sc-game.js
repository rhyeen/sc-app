import './src/state/reducers.js';
import './src/state/sagas.js';

// @NOTE: load dependent web component packages.
import '../sc-cards/sc-cards.js';
import '../sc-craft/sc-craft.js';
import '../sc-status/sc-status.js';

import { ScGame } from './src/ScGame.js';
import { ScGameFooter } from './src/components/game-area/ScGameFooter.js';
import { ScGameHeader } from './src/components/game-area/ScGameHeader.js';
import { ScGameView } from './src/components/game-area/ScGameView.js';
import { ScGameMenuBarItem } from './src/components/bar-items/ScGameMenuBarItem.js';
import { ScGameOverlay } from './src/components/game-area/ScGameOverlay.js';
import { ScGameMenuOverlay } from './src/components/overlay/ScGameMenuOverlay.js';

window.customElements.define('sc-game-menu-bar-item', ScGameMenuBarItem);
window.customElements.define('sc-game-footer', ScGameFooter);
window.customElements.define('sc-game-header', ScGameHeader);
window.customElements.define('sc-game-menu-overlay', ScGameMenuOverlay);
window.customElements.define('sc-game-overlay', ScGameOverlay);
window.customElements.define('sc-game-view', ScGameView);
window.customElements.define('sc-game', ScGame);
