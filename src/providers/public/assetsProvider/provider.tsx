import { useCallback, useEffect, useReducer } from "react";

import { useSettingsProvider } from "../settings";

import * as A from "./actions";
import { Provider } from "./context";
import { assetsReducer, initialState } from "./reducer";
import * as T from "./types";

import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { getAllAssets } from "@polkadex/orderbook/graphql/queries";
import { isKeyPresentInObject } from "@polkadex/orderbook/helpers/isKeyPresentInObject";
import { POLKADEX_ASSET } from "@polkadex/web-constants";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";

export const AssetsProvider: T.AssetsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(assetsReducer, initialState);
  const { onHandleError } = useSettingsProvider();

  async function fetchAllAssetMetadata(): Promise<T.IPublicAsset[]> {
    const assetEntries: any = await sendQueryToAppSync({ query: getAllAssets });

    const assets = assetEntries.data.getAllAssets.items;
    const newAssets = assets.map((asset) => {
      return {
        assetId: asset.asset_id,
        name: asset.name,
        symbol: asset.symbol,
        withdrawal_fee: asset.withdrawal_fee,
      };
    });

    return newAssets;
  }

  const fetchAssets = useCallback(async () => {
    dispatch(A.assetsFetch());
    try {
      const assetsList = await fetchAllAssetMetadata();

      dispatch(A.assetsData({ list: assetsList }));
    } catch (error) {
      console.warn("something has gone wrong with fetchassets");
      onHandleError(`Something has gone wrong, could not fetch assets ${error}`);
    }
  }, [onHandleError]);

  const selectGetAsset = useCallback(
    (assetId: string | number | Record<string, string>): T.IPublicAsset | null => {
      if (!assetId) {
        return null;
      }
      if (isKeyPresentInObject(assetId, "asset")) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        assetId = assetId.asset;
      }
      return isAssetPDEX(assetId.toString())
        ? POLKADEX_ASSET
        : state.list.find((asset) => asset.assetId === assetId.toString());
    },
    [state.list]
  );

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return (
    <Provider
      value={{
        ...state,
        fetchAssets,
        selectGetAsset,
      }}>
      {children}
    </Provider>
  );
};