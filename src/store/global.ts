/* eslint-disable @typescript-eslint/no-explicit-any */
import { globalState } from "@utils/global-state";
import { create } from "zustand";

interface GlobalState {
  state: Record<string, any>;
  tempState: Record<string, any>; // Store temporary changes
  addState: (newState: { [key: string]: any }) => void;
  dispatch: (payload: any, key?: string) => void;
  reset: (payload: string | string[]) => void;
  dirty: (payload: string | string[]) => void;
  //   getSelector: (key: string | string[], defaultValue?: any) => any;
}

const initialTempState = {};

const useDispatch = create<GlobalState>((set, get) => ({
  state: {
    ...globalState,
  },
  tempState: initialTempState, // Initialize temporary state

  addState: (newState: { [key: string]: any }) => {
    const currentState = get().state;
    Object.keys(newState).forEach((key) => {
      currentState[key] = newState[key]; // Mutate directly
      get().tempState = { ...get().tempState, [key]: newState[key] };
    });
  },

  dispatch: (payload: string | object, key?: string) => {
    const { tempState } = get();

    if (Object.keys(tempState).length > 0) {
      set((state) => ({
        state: { ...state.state, ...tempState },
        tempState: initialTempState, // Reset tempState here
      }));
    }

    if (key) {
      set((state) => ({
        state: {
          ...state.state,
          [key]:
            typeof payload === "object"
              ? { ...state.state[key], ...payload }
              : payload,
        },
      }));
    } else {
      set((state) => ({
        state: {
          ...state.state,
          ...(payload as { [key: string]: any }),
        },
      }));
    }
  },

  reset: (payload: string | string[]) => {
    if (Array.isArray(payload)) {
      payload.forEach((key) => {
        set((state) => ({
          state: { ...state.state, [key]: globalState[key] },
        }));
      });
    } else {
      set((state) => ({
        state: { ...state.state, [payload]: globalState[payload] },
      }));
    }
  },

  dirty: (payload: string | string[]) => {
    set((state) => {
      const newState = { ...state.state };

      if (Array.isArray(payload)) {
        payload.forEach((k) => delete newState[k]);
      } else {
        delete newState[payload];
      }

      return { state: newState };
    });
  },

  //   getSelector: (key: string | string[], defaultValue: any = "") => {
  //     const currentState = get().state;

  //     if (Array.isArray(key)) {
  //       return key.map((k, index) => {
  //         if (!(k in currentState)) {
  //           set((state) => ({
  //             state: { ...state.state, [k]: defaultValue[index] },
  //           }));
  //         }
  //         return get().state[k] ?? defaultValue[index];
  //         // return currentState[k] ?? defaultValue[index];
  //       });
  //     }

  //     // Update state if the key does not exist
  //     if (!(key in currentState)) {
  //       set((state) => ({
  //         state: { ...state.state, [key]: defaultValue },
  //       }));
  //     }
  //     return get().state[key] ?? defaultValue;

  //     // return currentState[key] ?? defaultValue;
  //   },
}));

export default useDispatch;
