import { LitElement, css, html } from 'lit-element';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game.js';
import { ScCoverForgeCardStyles, DRAFT_CARDS } from './sc-cover-forge-card-styles.js';
import { ScIconsStyles, RemoveIcon, ForgeIcon } from '../../../../../sc-app/src/components/shared/ScIcons.js';
import { SELECTED_CRAFTING_COMPONENT_SOURCES } from '../../../state/state-specifiers.js';
import { Ability, CardStat } from '../../../../../sc-cards/src/entities/card-aspects.js';

export class ScCoverForgeCard extends LitElement {
  static get styles() {
    return [
      ScIconsStyles,
      ScCoverForgeCardStyles,
      css`
        :host {
          border: ${DRAFT_CARDS.FORGE_COVER.FORGE_BASE_DRAFT_CARD_BORDER};
        }

        [minion-cover-separator] {
          border-bottom: ${DRAFT_CARDS.FORGE_COVER.FORGE_BASE_DRAFT_CARD_BORDER};
        }
      `,
    ];
  }

  render() {
    return html`
      <style>
        [minion-cover-separator] {
          opacity: ${this._getCardSeparatorOpacity()};
        }
      </style>
      <div minion-cover-top>${this._getReplacedResultHtml()}</div>
      <div minion-cover-separator></div>
      <div minion-cover-bottom>${this._getReplacerResultHtml()}</div>
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

  _getForgeSlotCard() {
    return this.game.player.craftingTable.forge[this.forgeSlotIndex].card;
  }

  _getCardSeparatorOpacity() {
    return this._noCardToReplace() ? css`0` : css`1`;
  }

  _noCardToReplace() {
    return !this._getForgeSlotCard();
  }

  _getReplacedResultHtml() {
    if (this._addingCraftingPart) {
      return ForgeIcon();
    }
    return this._noCardToReplace() ? html`` : RemoveIcon();
  }

  get _addingCraftingPart() {
    return this.selectedCraftingComponent.source === SELECTED_CRAFTING_COMPONENT_SOURCES.SELECT_CRAFTING_PART;
  }

  _getReplacerResultHtml() {
    if (this._addingCraftingPart) {
      return this._getCraftingPartIcon();
    }
    return this._noCardToReplace() ? html`` : ForgeIcon();
  }

  _getSeletedCraftingPart() {
    return this.game.player.craftingTable.craftingParts[this.selectedCraftingComponent.craftingPartIndex];
  }

  _getCraftingPartIcon() {
    const craftingPart = this._getSeletedCraftingPart();
    if (craftingPart.type) {
      return html`${CardStat.getIcon(craftingPart.type)}`;
    }
    return html`${Ability.getIcon(craftingPart.ability.id)}`;
  }
}
