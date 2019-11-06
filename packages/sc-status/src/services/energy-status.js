export class EnergyStatus {
  static getModifiedEnergy({ max, current }, maxModifier, currentModifier) {
    return {
      max: EnergyStatus.setValidEnergy(max + maxModifier),
      current: EnergyStatus.setValidEnergy(current + currentModifier),
    };
  }

  static setValidEnergy(energy) {
    if (energy < 0) {
      return 0;
    }
    return energy;
  }
}
