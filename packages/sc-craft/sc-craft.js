import './src/state/reducers.js';
import './src/state/sagas.js';

import { ScForgeSlotMold } from './src/components/crafting-area/cards/ScForgeSlotMold.js';
import { ScReducedDraftCardAbilitySlots } from './src/components/crafting-area/cards/ScReducedDraftCardAbilitySlots.js';
import { ScReducedDraftCard } from './src/components/crafting-area/cards/ScReducedDraftCard.js';
import { ScBaseDraftCardSlot } from './src/components/crafting-area/cards/ScBaseDraftCardSlot.js';
import { ScForgeSlot } from './src/components/crafting-area/cards/ScForgeSlot.js';

import { ScCraftingPart } from './src/components/crafting-parts/ScCraftingPart.js';
import { ScCraftingParts } from './src/components/crafting-parts/ScCraftingParts.js';

import { ScCraftingField } from './src/components/crafting-area/ScCraftingField.js';
import { ScCraftingArea } from './src/components/crafting-area/ScCraftingArea.js';

import { ScDraftCardSlotValue } from './src/components/selected-crafting-component/ScDraftCardSlotValue.js';
import { ScFullDraftCardAbilitySlots } from './src/components/selected-crafting-component/ScFullDraftCardAbilitySlots.js';
import { ScFullDraftCard } from './src/components/selected-crafting-component/ScFullDraftCard.js';
import { ScFullFinalizedCard } from './src/components/selected-crafting-component/ScFullFinalizedCard.js';

import { ScCoverForgeCard } from './src/components/crafting-area/covers/ScCoverForgeCard.js';
import { ScCoverBaseDraftCard } from './src/components/crafting-area/covers/ScCoverBaseDraftCard.js';


window.customElements.define('sc-forge-slot-mold', ScForgeSlotMold);
window.customElements.define('sc-reduced-draft-card-ability-slots', ScReducedDraftCardAbilitySlots);
window.customElements.define('sc-reduced-draft-card', ScReducedDraftCard);
window.customElements.define('sc-base-draft-card-slot', ScBaseDraftCardSlot);
window.customElements.define('sc-forge-slot', ScForgeSlot);

window.customElements.define('sc-crafting-part', ScCraftingPart);
window.customElements.define('sc-crafting-parts', ScCraftingParts);

window.customElements.define('sc-crafting-field', ScCraftingField);
window.customElements.define('sc-crafting-area', ScCraftingArea);

window.customElements.define('sc-draft-card-slot-value', ScDraftCardSlotValue);
window.customElements.define('sc-full-draft-card-ability-slots', ScFullDraftCardAbilitySlots);
window.customElements.define('sc-full-draft-card', ScFullDraftCard);
window.customElements.define('sc-full-finalized-card', ScFullFinalizedCard);

window.customElements.define('sc-cover-forge-card', ScCoverForgeCard);
window.customElements.define('sc-cover-base-draft-card', ScCoverBaseDraftCard);

