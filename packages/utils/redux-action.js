/**
 * Base structure derived from:
 * https://github.com/redux-saga/redux-saga/blob/master/examples/real-world/_actions/index.js
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export class ReduxAction {
  constructor(componentTag) {
    this.componentTag = componentTag;
  }

  createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
      acc[type] = `${this.componentTag}_${base}_${type}`;
      return acc;
    }, {});
  }

  createRequestRaw(base) {
    return `${this.componentTag}_${base}`;
  }

  static action(type, payload = {}) {
    return { type, ...payload };
  }
}
