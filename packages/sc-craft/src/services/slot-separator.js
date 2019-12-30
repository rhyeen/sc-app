export function separateSlotsWithAbilities(abilitySlots) {
  const slotsWithAbilities = [];
  const slotsWithoutAbilities = [];
  if (!abilitySlots || !abilitySlots.length) {
    return { slotsWithAbilities, slotsWithoutAbilities };
  }
  for (const slot of abilitySlots) {
    if (slot.isFilled()) {
      slotsWithAbilities.push(slot);
    } else {
      slotsWithoutAbilities.push(slot);
    }
  }
  return { slotsWithAbilities, slotsWithoutAbilities };
}