import './src/state/reducers.js';
import './src/state/sagas.js';

import { ScForgeSlotMold } from './src/components/crafting-area/cards/ScForgeSlotMold.js';
import { ScDraftCard } from './src/components/crafting-area/cards/ScDraftCard.js';
import { ScBaseDraftCardSlot } from './src/components/crafting-area/cards/ScBaseDraftCardSlot.js';
import { ScForgeSlot } from './src/components/crafting-area/cards/ScForgeSlot.js';

import { ScCraftingPart } from './src/components/crafting-parts/ScCraftingPart.js';
import { ScCraftingParts } from './src/components/crafting-parts/ScCraftingParts.js';

import { ScCraftingField } from './src/components/crafting-area/ScCraftingField.js';
import { ScCraftingArea } from './src/components/crafting-area/ScCraftingArea.js';

window.customElements.define('sc-forge-slot-mold', ScForgeSlotMold);
window.customElements.define('sc-draft-card', ScDraftCard);
window.customElements.define('sc-base-draft-card-slot', ScBaseDraftCardSlot);
window.customElements.define('sc-forge-slot', ScForgeSlot);

window.customElements.define('sc-crafting-part', ScCraftingPart);
window.customElements.define('sc-crafting-parts', ScCraftingParts);

window.customElements.define('sc-crafting-field', ScCraftingField);
window.customElements.define('sc-crafting-area', ScCraftingArea);
