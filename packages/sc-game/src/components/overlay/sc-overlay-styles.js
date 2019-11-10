import { css } from 'lit-element';

export const ScOverlayStyles = css`
  :host {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
