import { StaticCardAbilityId, VariableCardAbilityId } from "@shardedcards/sct-card/dist/browser/enums/card-ability.js";
import { CardConditionsKey } from "@shardedcards/sct-card/dist/browser/enums/card-conditions.js";
import { CardStatKey } from "@shardedcards/sct-card/dist/browser/enums/card-stat.js";
import { Localize } from '../../../utils/localizer.js';

import { 
  EnergizeIcon,
  HasteIcon,
  SpellshotIcon,
  ReachIcon,
  ExhaustedIcon, 
  AttackIcon,
  HealthIcon,
  RangeIcon,
  ShieldIcon,
  EnergyIcon } from "../../../sc-app/src/components/shared/ScIcons.js";

export const Ability = {};
const abilityMap = {};

abilityMap[VariableCardAbilityId.Energize] = {
  name: Localize.localeMap.ABILITY.ENERGIZE.NAME,
  descriptionFn: Localize.localeMap.ABILITY.ENERGIZE.DESCRIPTION,
  modifiedDescriptionFn: Localize.localeMap.ABILITY.ENERGIZE.MODIFIED_DESCRIPTION,
  iconFn: EnergizeIcon
};

abilityMap[StaticCardAbilityId.Haste] = {
  name: Localize.localeMap.ABILITY.HASTE.NAME,
  descriptionFn: Localize.localeMap.ABILITY.HASTE.DESCRIPTION,
  iconFn: HasteIcon
};

abilityMap[VariableCardAbilityId.Spellshot] = {
  name: Localize.localeMap.ABILITY.SPELLSHOT.NAME,
  descriptionFn: Localize.localeMap.ABILITY.SPELLSHOT.DESCRIPTION,
  modifiedDescriptionFn: Localize.localeMap.ABILITY.SPELLSHOT.MODIFIED_DESCRIPTION,
  iconFn: SpellshotIcon
};

abilityMap[VariableCardAbilityId.Reach] = {
  name: Localize.localeMap.ABILITY.REACH.NAME,
  descriptionFn: Localize.localeMap.ABILITY.REACH.DESCRIPTION,
  modifiedDescriptionFn: Localize.localeMap.ABILITY.REACH.MODIFIED_DESCRIPTION,
  iconFn: ReachIcon
};

Ability.getName = (abilityId) => abilityMap[abilityId].name;

Ability.getDescription = (abilityId, amount) => abilityMap[abilityId].descriptionFn(amount);

Ability.getModifiedDescription = (abilityId, amount, modifiedAmount) => {
  if (modifiedAmount === amount) {
    return Ability.getDescription(abilityId, amount);
  }
  let modifier = modifiedAmount - amount;
  if (modifier > 0) {
    modifier = `+${  modifier}`;
  }
  return abilityMap[abilityId].modifiedDescriptionFn(amount, modifier);
}

Ability.getIcon = (abilityId, args) => abilityMap[abilityId].iconFn(args);

export const Condition = {};
const conditionMap = {};
conditionMap[CardConditionsKey.Exhausted] = {
  name: Localize.localeMap.CONDITION.EXHAUSTED.NAME,
  descriptionFn: Localize.localeMap.CONDITION.EXHAUSTED.DESCRIPTION,
  iconFn: ExhaustedIcon
};

conditionMap[CardConditionsKey.Shield] = {
  name: Localize.localeMap.CONDITION.SHIELD.NAME,
  descriptionFn: Localize.localeMap.CONDITION.SHIELD.DESCRIPTION,
  iconFn: ShieldIcon
};

Condition.getName = (condition) => conditionMap[condition].name;

Condition.getDescription = (condition) => conditionMap[condition].descriptionFn();

Condition.getIcon = (condition, args) => conditionMap[condition].iconFn(args);

export const CardStat = {};
const cardStatMap = {};

cardStatMap[CardStatKey.Attack] = {
  name: Localize.localeMap.CARD_STAT.ATTACK.NAME,
  descriptionFn: Localize.localeMap.CARD_STAT.ATTACK.DESCRIPTION,
  iconFn: AttackIcon
};

cardStatMap[CardStatKey.Health] = {
  name: Localize.localeMap.CARD_STAT.HEALTH.NAME,
  descriptionFn: Localize.localeMap.CARD_STAT.HEALTH.DESCRIPTION,
  iconFn: HealthIcon
};

cardStatMap[CardStatKey.Range] = {
  name: Localize.localeMap.CARD_STAT.RANGE.NAME,
  descriptionFn: Localize.localeMap.CARD_STAT.RANGE.DESCRIPTION,
  iconFn: RangeIcon
};

cardStatMap[CardStatKey.Cost] = {
  name: Localize.localeMap.CARD_STAT.COST.NAME,
  descriptionFn: Localize.localeMap.CARD_STAT.COST.DESCRIPTION,
  iconFn: EnergyIcon
};

CardStat.getName = (statId) => cardStatMap[statId].name;

CardStat.getDescription = (statId, amount) => cardStatMap[statId].descriptionFn(amount);

CardStat.getIcon = (statId, args) => cardStatMap[statId].iconFn(args);