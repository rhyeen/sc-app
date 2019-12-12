import { LitElement, html, css } from 'lit-element';
import { APP_COLORS } from '../../../sc-app-styles';

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
    animation: sk-foldCubeAngle 2.4s infinite linear both;
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
    animation-delay: 0.3s;
  }

  .sk-folding-cube .sk-cube3:before {
    animation-delay: 0.6s; 
  }

  .sk-folding-cube .sk-cube4:before {
    animation-delay: 0.9s;
  }

  @-webkit-keyframes sk-foldCubeAngle {
    0%, 10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
    } 25%, 75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
    } 90%, 100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
    } 
  }

  @keyframes sk-foldCubeAngle {
    0%, 10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0; 
    } 25%, 75% {
    transform: perspective(140px) rotateX(0deg);
    opacity: 1; 
    } 90%, 100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0; 
    }
  }
`;

const ELLIPSIS_STEP_ANIMATION_DELAY = 0.3;

// @SOURCE: http://jsfiddle.net/benbrandt22/k23sn
const ellipsisStyles = css`
  .ellipsis-anim span {
    opacity: 0;
    animation: ellipsis-dot ${ELLIPSIS_STEP_ANIMATION_DELAY * 5}s infinite;
  }

  .ellipsis-anim span:nth-child(1) {
    animation-delay: 0.0s;
  }
  .ellipsis-anim span:nth-child(2) {
    animation-delay: ${ELLIPSIS_STEP_ANIMATION_DELAY}s;
  }
  .ellipsis-anim span:nth-child(3) {
    animation-delay: ${ELLIPSIS_STEP_ANIMATION_DELAY * 2}s;
  }

  @-webkit-keyframes ellipsis-dot {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
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
      foldingCubeStyles,
      ellipsisStyles,
    ];
  }

  render() {
    return html`
      <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>
      <div class="loading-text"><span>${this.text}</span><span class="ellipsis-anim"><span>.</span><span>.</span><span>.</span></span></div>
    `;
  }

  static get properties() {
    return {
      text: { type: String }
    };
  }
}
