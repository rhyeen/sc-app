import { LitElement, html, css } from 'lit-element';
import { APP_COLORS } from '../../../sc-app-styles.js';

const HOST_REVEAL_DELAY_SECONDS = 0.75;
const HOST_REVEAL_DURATION_SECONDS = 0.5;

const slowRevealStyles = css`
  :host {
    animation-name: host-reveal;
    animation-duration: ${HOST_REVEAL_DURATION_SECONDS}s;
    animation-delay: ${HOST_REVEAL_DELAY_SECONDS}s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-fill-mode: both;
  }

  @-webkit-keyframes host-reveal {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const CUBE_FOLD_DURATION_SECONDS = 2.4;

// @SOURCE: https://tobiasahlin.com/spinkit
const foldingCubeStyles = css`
  .sk-folding-cube {
    margin: 20px auto;
    width: 40px;
    height: 40px;
    position: relative;
    transform: rotateZ(45deg);
  }

  .sk-folding-cube .sk-cube {
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    transform: scale(1.1);
  }

  .sk-folding-cube .sk-cube:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${APP_COLORS.HINT_GRAY};
    animation-name: sk-foldCubeAngle;
    animation-duration: ${CUBE_FOLD_DURATION_SECONDS}s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-fill-mode: both;
    transform-origin: 100% 100%;
  }

  .sk-folding-cube .sk-cube2 {
    transform: scale(1.1) rotateZ(90deg);
  }

  .sk-folding-cube .sk-cube3 {
    transform: scale(1.1) rotateZ(180deg);
  }

  .sk-folding-cube .sk-cube4 {
    transform: scale(1.1) rotateZ(270deg);
  }

  .sk-folding-cube .sk-cube2:before {
    animation-delay: ${CUBE_FOLD_DURATION_SECONDS / 8}s;
  }

  .sk-folding-cube .sk-cube3:before {
    animation-delay: ${(CUBE_FOLD_DURATION_SECONDS / 8) * 2}s;
  }

  .sk-folding-cube .sk-cube4:before {
    animation-delay: ${(CUBE_FOLD_DURATION_SECONDS / 8) * 3}s;
  }

  @-webkit-keyframes sk-foldCubeAngle {
    0%,
    10% {
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0;
    }
    25%,
    75% {
      transform: perspective(140px) rotateX(0deg);
      opacity: 1;
    }
    90%,
    100% {
      transform: perspective(140px) rotateY(180deg);
      opacity: 0;
    }
  }

  @keyframes sk-foldCubeAngle {
    0%,
    10% {
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0;
    }
    25%,
    75% {
      transform: perspective(140px) rotateX(0deg);
      opacity: 1;
    }
    90%,
    100% {
      transform: perspective(140px) rotateY(180deg);
      opacity: 0;
    }
  }
`;

const ELLIPSIS_STEP_DELAY_SECONDS = 0.3;

// @SOURCE: http://jsfiddle.net/benbrandt22/k23sn
const ellipsisStyles = css`
  .ellipsis-anim span {
    opacity: 0;
    animation: ellipsis-dot ${ELLIPSIS_STEP_DELAY_SECONDS * 5}s infinite;
  }

  .ellipsis-anim span:nth-child(1) {
    animation-delay: 0s;
  }
  .ellipsis-anim span:nth-child(2) {
    animation-delay: ${ELLIPSIS_STEP_DELAY_SECONDS}s;
  }
  .ellipsis-anim span:nth-child(3) {
    animation-delay: ${ELLIPSIS_STEP_DELAY_SECONDS * 2}s;
  }

  @-webkit-keyframes ellipsis-dot {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export class ScLoading extends LitElement {
  static get styles() {
    return [
      css`
        .loading-text {
          font-size: 20px;
          color: ${APP_COLORS.HINT_GRAY};
        }
      `,
      slowRevealStyles,
      foldingCubeStyles,
      ellipsisStyles,
    ];
  }

  render() {
    return html`
      ${this._getHtml()}
    `;
  }

  constructor() {
    super();
    this._showContent = false;
    setTimeout(() => {
      this._showContent = true;
      this.requestUpdate();
    }, HOST_REVEAL_DELAY_SECONDS * 1000);
  }

  static get properties() {
    return {
      text: { type: String },
      _showContent: { type: Boolean }
    };
  }

  _getHtml() {
    if (!this._showContent) {
      return html``;
    }
    return html`
      <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>
      <div class="loading-text">
        <span>${this.text}</span
        ><span class="ellipsis-anim"><span>.</span><span>.</span><span>.</span></span>
      </div>
    `;
  }
}
