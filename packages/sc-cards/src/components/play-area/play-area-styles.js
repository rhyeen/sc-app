import { css } from 'lit-element';

export const FieldSlotStyles = css`
  [field-slot] {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  [field-slot-separator] {
    flex: 0 0 2px;
    background-color: #eeeeee;
  }

  [field-slot-separator][overlay] {
    background: none;
  }
`;
