import './src/state/reducers.js';
import './src/state/sagas.js';

// @NOTE: load dependent web component packages.
import '../sc-cards/sc-cards.js';
import '../sc-craft/sc-craft.js';
import '../sc-status/sc-status.js';

import { ScGameMenuBarItem } from './src/components/bar-items/ScGameMenuBarItem.js';

import { ScGameMenuOverlay } from './src/components/overlay/ScGameMenuOverlay.js';
import { ScPreviewHandCardOverlay } from './src/components/overlay/ScPreviewHandCardOverlay.js';
import { ScPreviewDungeonMinionOverlay } from './src/components/overlay/ScPreviewDungeonMinionOverlay.js';
import { ScPreviewPlayerMinionOverlay } from './src/components/overlay/ScPreviewPlayerMinionOverlay.js';
import { ScPreviewCardAbilitiesOverlay } from './src/components/overlay/ScPreviewCardAbilitiesOverlay.js';
import { ScPlaceMinionOverlay } from './src/components/overlay/ScPlaceMinionOverlay.js';
import { ScAttackMinionOverlay } from './src/components/overlay/ScAttackMinionOverlay.js';
import { ScPreviewBaseDraftCardOverlay } from './src/components/overlay/ScPreviewBaseDraftCardOverlay.js';
import { ScForgeBaseDraftCardOverlay } from './src/components/overlay/ScForgeBaseDraftCardOverlay.js';
import { ScGameOverlay } from './src/components/game-area/ScGameOverlay.js';

import { ScGameFooter } from './src/components/game-area/ScGameFooter.js';
import { ScGameHeader } from './src/components/game-area/ScGameHeader.js';
import { ScGameView } from './src/components/game-area/ScGameView.js';
import { ScGame } from './src/ScGame.js';

window.customElements.define('sc-game-menu-bar-item', ScGameMenuBarItem);

window.customElements.define('sc-game-menu-overlay', ScGameMenuOverlay);
window.customElements.define('sc-preview-hand-card-overlay', ScPreviewHandCardOverlay);
window.customElements.define('sc-preview-dungeon-minion-overlay', ScPreviewDungeonMinionOverlay);
window.customElements.define('sc-preview-player-minion-overlay', ScPreviewPlayerMinionOverlay);
window.customElements.define('sc-preview-card-abilities-overlay', ScPreviewCardAbilitiesOverlay);
window.customElements.define('sc-attack-minion-overlay', ScAttackMinionOverlay);
window.customElements.define('sc-place-minion-overlay', ScPlaceMinionOverlay);
window.customElements.define('sc-preview-base-draft-card-overlay', ScPreviewBaseDraftCardOverlay);
window.customElements.define('sc-forge-base-draft-card-overlay', ScForgeBaseDraftCardOverlay);
window.customElements.define('sc-game-overlay', ScGameOverlay);

window.customElements.define('sc-game-footer', ScGameFooter);
window.customElements.define('sc-game-header', ScGameHeader);
window.customElements.define('sc-game-view', ScGameView);
window.customElements.define('sc-game', ScGame);
