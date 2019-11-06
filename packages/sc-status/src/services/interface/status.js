import { INTERFACE_STATE, InterfaceState } from 'interface-handler/src/interface-state.js';
import * as CallHttp from './firebase/status.js';

export function getPlayerStatus() {
  switch (InterfaceState.get()) {
    case INTERFACE_STATE.HTTP:
      return CallHttp.getPlayerStatus();
    default:
      return InterfaceState.invalid();
  }
}
