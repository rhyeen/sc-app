import { css } from "lit-element";
import { APP_COLORS } from "../../../../sc-app/sc-app-styles";

export const ScCardAbilityConditionStyles = css`
  [card-ability],
  [card-condition] {
    display: flex;
    align-items: center;
    font-size: 18px;
    padding: 5px 0;
    margin: 5px 0;
  }

  [card-ability] .tooltip,
  [card-condition] .tooltip {
    margin-left: 15px;
  }

  [card-ability] .tooltip-title,
  [card-condition] .tooltip-title {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 300;
  }

  [card-ability] .tooltip-description,
  [card-condition] .tooltip-description {
    font-size: 12px;
    color: ${APP_COLORS.HINT_GRAY};
  }

  [card-ability].proposed .tooltip-title,
  [card-ability].proposed .tooltip-description {
    color: ${APP_COLORS.PRIMARY_BLUE};
  }

  [card-ability].proposed .icon [svg-icon] {
    fill: ${APP_COLORS.PRIMARY_BLUE};
  }

  [card-ability] .modifier {
    color: ${APP_COLORS.PRIMARY_BLUE};
  }

`;