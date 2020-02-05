export function separateSlotsWithAbilities(abilitySlots) {
  const slotsWithAbilities = [];
  const slotsWithoutAbilities = [];
  if (!abilitySlots || !abilitySlots.length) {
    return { slotsWithAbilities, slotsWithoutAbilities };
  }
  abilitySlots.forEach(slot => {
    if (slot.isFilled()) {
      slotsWithAbilities.push(slot);
    } else {
      slotsWithoutAbilities.push(slot);
    }
  });
  return { slotsWithAbilities, slotsWithoutAbilities };
}
