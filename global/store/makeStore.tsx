import React, { ReactNode } from 'react';
import { retreiveFromStorage, saveToStorage } from '../functions/global.function';

export const CACHE_ACTION_KEY = 'UPDATE_FROM_STORAGE';

export const makeStore = (
  name: string,
  initial_state: any,
  reducer: (state: any, action: any) => any,
  options = { persist: false },
) => {
  const storeCtx = React.createContext<any>(initial_state);
  const dispatchCtx = React.createContext<React.Dispatch<any>>(() => null);

  const Provider = ({ children }: { children: ReactNode }) => {
    const [isInitialized, setIsInitialized] = React.useState(false);
    const [store, dispatch] = React.useReducer(reducer, initial_state);

    React.useEffect(() => {
      if (options.persist) {
        if (isInitialized) {
          saveToStorage(name, store);
        }
      }
    }, [store]);

    const asyncHack = async () => {
      const newState = await retreiveFromStorage(name);

      if (newState) {
        dispatch({
          type: CACHE_ACTION_KEY,
          payload: newState,
        });
      }
      setIsInitialized(true);
    };

    React.useEffect(() => {
      if (options.persist) {
        asyncHack();
      }
    }, []);

    return (
      <dispatchCtx.Provider value={dispatch}>
        <storeCtx.Provider value={store}>{children}</storeCtx.Provider>
      </dispatchCtx.Provider>
    );
  };

  const useStore = () => React.useContext(storeCtx);
  const useDispatch = () => React.useContext(dispatchCtx);

  if (!useStore || !useDispatch) {
    throw new Error('can not call context outside the provider');
  }

  return { useDispatch, useStore, Provider, Consumer: storeCtx.Consumer };
};
