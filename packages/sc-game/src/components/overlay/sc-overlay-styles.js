import { css } from 'lit-element';
import { AREAS as CARDS_AREAS } from '../../../../sc-cards/sc-cards-styles.js';
import { AREAS as CRAFT_AREAS } from '../../../../sc-craft/src/components/sc-craft-styles.js';

export const ScOverlayStyles = css`
  :host {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ScBtnGroupStyles = css`
  [btn-group-stack] {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  [btn-group-stack] [btn-group] {
    margin-bottom: 0;
  }

  [btn-group] {
    margin: 20px 0 40px 0;
  }

  [btn-group] sc-btn:first-child {
    margin-left: 0;
  }

  [btn-group] sc-btn {
    margin-left: 20px;
  }

  [btn-group].btn-group-tight sc-btn {
    margin-left: 5px;
  }

  [btn-group].btn-group-fill-bottom-up {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    height: 100%;
    margin: 0;
  }

  /** if the btn-group needs to properly fill the player hand height **/
  [btn-group].btn-group-hand-area,
  [btn-group].btn-group-crafting-parts-area {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0;
  }

  [btn-group].btn-group-hand-area {
    flex: 0 0 ${CARDS_AREAS.PLAYER_HAND.HEIGHT};
  }

  [btn-group].btn-group-crafting-parts-area {
    flex: 0 0 ${CRAFT_AREAS.CRAFTING_PARTS.HEIGHT};
  }

  sc-btn:first-child {
    margin-top: 0;
  }

  sc-btn {
    margin-top: 20px;
  }
`;

export const ScOverlayVerticalBtnsStyles = css`
  sc-btn:first-child {
    margin-top: 0;
  }

  sc-btn {
    margin-top: 20px;
  }
`;
