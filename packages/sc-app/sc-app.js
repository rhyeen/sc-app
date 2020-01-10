import './src/state/reducers.js';
import './src/state/sagas.js';

import { ScApp } from './src/ScApp.js';
import { Sc404 } from './src/components/Sc404.js';
import { ScBtn } from './src/components/shared/ScBtn.js';
import { ScLoading } from './src/components/shared/ScLoading.js';
import { ScDropdown } from './src/components/shared/ScDropdown.js';

window.customElements.define('sc-404', Sc404);
window.customElements.define('sc-btn', ScBtn);
window.customElements.define('sc-app', ScApp);
window.customElements.define('sc-loading', ScLoading);
window.customElements.define('sc-dropdown', ScDropdown);
