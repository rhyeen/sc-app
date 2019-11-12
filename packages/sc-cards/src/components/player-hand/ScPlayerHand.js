import { html, css, LitElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { Game } from '@shardedcards/sc-types/dist/game/entities/game';
import { localStore } from '../../state/store.js';
import * as Selector from '../../state/selectors.js';
import { selectCardFromHand } from '../../state/actions.js';
import { AREAS, CARDS } from '../../../sc-cards-styles.js';

export class ScPlayerHand extends connect(localStore)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          width: calc(100% - ${AREAS.PLAYER_HAND.MARGIN});
          /** @DEBUG: no idea why this is not AREAS.PLAYER_HAND.WIDTH... */
          max-width: ${CARDS.HAND.WIDTH};
          flex: 0 0 ${AREAS.PLAYER_HAND.HEIGHT};
        }

        sc-player-hand-card {
          position: absolute;
          /** @DEBUG: no idea why this is not CARDS.HAND.WIDTH... */
          width: calc(100% - 42px); /* @DEBUG: no idea about the 42... */
          transition: height 0.1s, margin-top 0.1s;
          transition-timing-function: ease-in;
        }

        /** @DEBUG: is this still needed? **/
        sc-player-hand-card[active] {
          opacity: 0;
        }

        .hand-card-0 {
          margin-top: 0;
          height: ${AREAS.PLAYER_HAND.HEIGHT};
        }

        .hand-card-0:hover {
          margin-top: calc(-1*${CARDS.HAND.HOVER_RAISE_HEIGHT});
          height: calc(${AREAS.PLAYER_HAND.HEIGHT} + ${CARDS.HAND.HOVER_RAISE_HEIGHT});
        }

        .hand-card-1 {
          margin-top: ${CARDS.HAND.HEIGHT};
          height: calc(${AREAS.PLAYER_HAND.HEIGHT} - ${CARDS.HAND.HEIGHT});
        }

        .hand-card-1:hover {
          margin-top: calc(${CARDS.HAND.HEIGHT} - ${CARDS.HAND.HOVER_RAISE_HEIGHT});
          height: calc(${AREAS.PLAYER_HAND.HEIGHT} + ${CARDS.HAND.HOVER_RAISE_HEIGHT} - ${CARDS.HAND.HEIGHT});
        }

        .hand-card-2 {
          margin-top: calc(2*${CARDS.HAND.HEIGHT});
          height: calc(${AREAS.PLAYER_HAND.HEIGHT} - 2*${CARDS.HAND.HEIGHT});
        }

        .hand-card-2:hover {
          margin-top: calc(2*${CARDS.HAND.HEIGHT} - ${CARDS.HAND.HOVER_RAISE_HEIGHT});
          height: calc(${AREAS.PLAYER_HAND.HEIGHT} + ${CARDS.HAND.HOVER_RAISE_HEIGHT} - 2*${CARDS.HAND.HEIGHT});
        }

        .hand-card-3 {
          margin-top: calc(3*${CARDS.HAND.HEIGHT});
          height: calc(${AREAS.PLAYER_HAND.HEIGHT} - 3*${CARDS.HAND.HEIGHT});
        }

        .hand-card-3:hover {
          margin-top: calc(3*${CARDS.HAND.HEIGHT} - ${CARDS.HAND.HOVER_RAISE_HEIGHT});
          height: calc(${AREAS.PLAYER_HAND.HEIGHT} + ${CARDS.HAND.HOVER_RAISE_HEIGHT} - 3*${CARDS.HAND.HEIGHT});
        }

        .hand-card-4 {
          margin-top: calc(4*${CARDS.HAND.HEIGHT});
          height: calc(${AREAS.PLAYER_HAND.HEIGHT} - 4*${CARDS.HAND.HEIGHT});
        }

        .hand-card-4:hover {
          margin-top: calc(4*${CARDS.HAND.HEIGHT} - ${CARDS.HAND.HOVER_RAISE_HEIGHT});
          height: calc(${AREAS.PLAYER_HAND.HEIGHT} + ${CARDS.HAND.HOVER_RAISE_HEIGHT} - 4*var(${CARDS.HAND.HEIGHT});
        }
      `,
    ];
  }

  render() {
    return html`
      ${this._playerHandCardsHtml()}
    `;
  }

  static get properties() {
    return {
      game: { type: Game },
      _selectedCard: { type: Object }
    };
  }

  _playerHandCardsHtml() {
    return this.game.player.hand.cards.map(
      (_, index) => html`
        <sc-player-hand-card
          class="hand-card-${index}"
          .handCardIndex="${index}"
          @click="${() => ScPlayerHand._selectCard(index)}"
          ?active="${this._isActiveCard(index)}"
        ></sc-player-hand-card>
      `,
    );
  }

  static _selectCard(index) {
    localStore.dispatch(selectCardFromHand(index));
  }

  _isActiveCard(handCardIndex) {
    return this._selectedCard.handIndex === handCardIndex;
  }

  stateChanged(state) {
    this._selectedCard = Selector.getSelectedCard(state);
  }
}
