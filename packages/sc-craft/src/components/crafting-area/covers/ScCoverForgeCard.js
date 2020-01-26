import { LitElement, css, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { DraftCardModifier } from '@shardedcards/sc-types/dist/card/services/draft-card-modifier.js';
import { ScCoverForgeCardStyles, DRAFT_CARDS } from './sc-cover-forge-card-styles.js';
import { ScIconsStyles, RemoveIcon, ForgeIcon } from '../../../../../sc-app/src/components/shared/ScIcons.js';
import { SELECTED_CRAFTING_COMPONENT_SOURCES } from '../../../state/state-specifiers.js';
import { Ability, CardStat } from '../../../../../sc-cards/src/entities/card-aspects.js';

export class ScCoverForgeCard extends LitElement {
  static get styles() {
    return [
      ScIconsStyles,
      ScCoverForgeCardStyles
    ];
  }

  render() {
    return html`
      <style>
        :host {
          border: ${this._getBorder()};
        }

        [crafting-cover-separator] {
          border-bottom: ${this._getBorder(true)};
        }
      </style>
      <div crafting-cover-top>${this._getReplacedResultHtml()}</div>
      <div crafting-cover-separator></div>
      <div crafting-cover-bottom>${this._getReplacerResultHtml()}</div>
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      gameVersion: { type: Number },
      selectedCraftingComponent: { type: Object },
      forgeSlotIndex: { type: Number },
    };
  }

  get _forgeSlotCard() {
    return this.game.player.craftingTable.forge[this.forgeSlotIndex].card;
  }

  _getBorder(isSeparator) {
    if (this._addingCraftingPart) {
      return this._cardModified ? DRAFT_CARDS.FORGE_COVER.FORGE_BASE_DRAFT_CARD_BORDER : css`none`;
    }
    if (isSeparator) {
      return this._cardInForge ? DRAFT_CARDS.FORGE_COVER.FORGE_BASE_DRAFT_CARD_BORDER : css`none`;
    }
    return  DRAFT_CARDS.FORGE_COVER.FORGE_BASE_DRAFT_CARD_BORDER;
  }

  get _cardInForge() {
    return !!this._forgeSlotCard;
  }

  get _addingCraftingPart() {
    return this.selectedCraftingComponent.source === SELECTED_CRAFTING_COMPONENT_SOURCES.SELECT_CRAFTING_PART;
  }

  get _cardModified() {
    const card = this._forgeSlotCard;
    if (!card) {
      return false;
    }
    const craftingPart = this._selectedCraftingPart;
    const { wasModified } = DraftCardModifier.addCraftingPart(card, craftingPart);
    return wasModified;
  }

  _getReplacedResultHtml() {
    if (this._addingCraftingPart) {
      return this._cardModified ? ForgeIcon() : html``;
    }
    return this._cardInForge ? RemoveIcon() : html``;
  }

  _getReplacerResultHtml() {
    if (this._addingCraftingPart) {
      return this._cardModified ? this._getCraftingPartIcon() : html``;
    }
    return this._cardInForge ? ForgeIcon(): html``;
  }

  get _selectedCraftingPart() {
    return this.selectedCraftingComponent.craftingPart;
  }

  _getCraftingPartIcon() {
    if (this._selectedCraftingPart.type) {
      return html`${CardStat.getIcon(this._selectedCraftingPart.type)}`;
    }
    return html`${Ability.getIcon(this._selectedCraftingPart.ability.id)}`;
  }
}
