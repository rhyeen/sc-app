const LETTER_RUNES = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';

export class IdGenerator {
  static generateGuid(prefix, length) {
    const randomCharacters = length - prefix.length - 1;
    if (randomCharacters <= 0) {
      return prefix;
    }
    return `${prefix}_${IdGenerator._getRandomString(randomCharacters)}`;
  }

  static _getRandomString(length) {
    let str = '';
    for (let i = 0; i < length; i += 1) {
      str += IdGenerator._getRandomItemFromArray(LETTER_RUNES);
    }
    return str;
  }

  static _getRandomItemFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
