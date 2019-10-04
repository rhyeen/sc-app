import './src/state/reducers.js';
import './src/state/sagas.js';

import { ScApp } from './src/ScApp.js';
import { Sc404 } from './src/components/Sc404.js';
import { ScBtn } from './src/components/shared/ScBtn.js';

window.customElements.define('sc-404', Sc404);
window.customElements.define('sc-btn', ScBtn);
window.customElements.define('sc-app', ScApp);
