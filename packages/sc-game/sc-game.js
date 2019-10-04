import './src/state/reducers.js';
import './src/state/sagas.js';

import { ScGame } from './src/ScGame.js';
import { ScGameFooter } from './src/components/game-area/ScGameFooter.js';
import { ScGameHeader } from './src/components/game-area/ScGameHeader.js';
import { ScGameView } from './src/components/game-area/ScGameView.js';

window.customElements.define('sc-game-footer', ScGameFooter);
window.customElements.define('sc-game-header', ScGameHeader);
window.customElements.define('sc-game-view', ScGameView);
window.customElements.define('sc-game', ScGame);
