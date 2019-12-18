import './src/state/reducers.js';
import './src/state/sagas.js';

// @NOTE: load dependent web component packages.
import '../sc-cards/sc-cards.js';
import '../sc-craft/sc-craft.js';
import '../sc-status/sc-status.js';

import { ScGameMenuBarItem } from './src/components/bar-items/ScGameMenuBarItem.js';

import { ScGameMenuOverlay } from './src/components/overlay/ScGameMenuOverlay.js';
import { ScSelectHandCardOverlay } from './src/components/overlay/ScSelectHandCardOverlay.js';
import { ScSelectDungeonFieldSlotCardOverlay } from './src/components/overlay/ScSelectDungeonFieldSlotCardOverlay.js';
import { ScSelectPlayerFieldSlotCardOverlay } from './src/components/overlay/ScSelectPlayerFieldSlotCardOverlay.js';
import { ScUseCardAbilityOverlay } from './src/components/overlay/ScUseCardAbilityOverlay.js';
import { ScPlaceMinionOverlay } from './src/components/overlay/ScPlaceMinionOverlay.js';
import { ScGameOverlay } from './src/components/game-area/ScGameOverlay.js';

import { ScGameFooter } from './src/components/game-area/ScGameFooter.js';
import { ScGameHeader } from './src/components/game-area/ScGameHeader.js';
import { ScGameView } from './src/components/game-area/ScGameView.js';
import { ScGame } from './src/ScGame.js';

window.customElements.define('sc-game-menu-bar-item', ScGameMenuBarItem);

window.customElements.define('sc-game-menu-overlay', ScGameMenuOverlay);
window.customElements.define('sc-select-hand-card-overlay', ScSelectHandCardOverlay);
window.customElements.define('sc-select-dungeon-field-slot-card-overlay', ScSelectDungeonFieldSlotCardOverlay);
window.customElements.define('sc-select-player-field-slot-card-overlay', ScSelectPlayerFieldSlotCardOverlay);
window.customElements.define('sc-use-card-ability-overlay', ScUseCardAbilityOverlay);
window.customElements.define('sc-place-minion-overlay', ScPlaceMinionOverlay);
window.customElements.define('sc-game-overlay', ScGameOverlay);

window.customElements.define('sc-game-footer', ScGameFooter);
window.customElements.define('sc-game-header', ScGameHeader);
window.customElements.define('sc-game-view', ScGameView);
window.customElements.define('sc-game', ScGame);
