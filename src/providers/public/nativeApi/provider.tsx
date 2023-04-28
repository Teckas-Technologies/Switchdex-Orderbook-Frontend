import { useCallback, useReducer } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";

import { Provider } from "./context";
import { nativeApiReducer, initialState } from "./reducer";
import * as T from "./types";
import * as A from "./actions";

import { defaultConfig } from "@polkadex/orderbook-config";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const NativeApiProvider: T.NativeApiComponent = ({ children }) => {
  const [state, dispatch] = useReducer(nativeApiReducer, initialState);
  const { onHandleError } = useSettingsProvider();

  // Actions
  const onConnectNativeApi = useCallback(async () => {
    let api: ApiPromise;
    dispatch(A.nativeApiConnectFetch());
    try {
      /* Checking if the extension is installed. */
      const { web3Enable } = await import("@polkadot/extension-dapp");
      const extensions = await web3Enable("Polkadex Orderbook");
      if (extensions.length === 0) dispatch(A.nativeApiNoExtension());

      const createWs = () => {
        const provider = new WsProvider(defaultConfig.polkadexChain);
        api = new ApiPromise({ provider, types: T.orderbookTypes });

        api.on("ready", () => dispatch(A.nativeApiConnectData(api)));

        api.on("disconnected", () =>
          setTimeout(() => {
            console.log(`Reconnecting to ${defaultConfig.polkadexChain}`);
            createWs();
          }, defaultConfig.reconnectRangerTime)
        );

        api.on("error", () => {
          onHandleError(`Polkadex can't connect to ${defaultConfig.polkadexChain}`);
          dispatch(A.nativeApiConnectError());
        });
      };

      createWs();
      return () => {
        api.disconnect();
      };
    } catch (error) {
      onHandleError(`Error connecting to Polkadex chain: ${error?.message ?? error}`);
    }
  }, [onHandleError]);

  return (
    <Provider
      value={{
        ...state,
        onConnectNativeApi,
      }}>
      {children}
    </Provider>
  );
};