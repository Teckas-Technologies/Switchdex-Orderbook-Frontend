import { call, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";

import {
  registerTradeAccountError,
  removeProxyAccountFromChainData,
  RemoveProxyAccountFromChainFetch,
  removeTradeAccountFromBrowser,
} from "../actions";
import { notificationPush } from "../../notificationHandler";

import { selectRangerApi } from "@polkadex/orderbook/modules/public/ranger";
import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { selectMainAccount, selectUsingAccount } from "@polkadex/orderbook-modules";

export function* removeProxyAccountFromChainSaga(action: RemoveProxyAccountFromChainFetch) {
  try {
    const api = yield select(selectRangerApi);
    const { linkedMainAddress } = yield select(selectUsingAccount);
    const { account, signer } = yield select(selectMainAccount(linkedMainAddress));
    if (!account?.address) {
      throw new Error("Please select a main account!");
    }
    const { address: tradeAddress } = action.payload;
    if (api && account?.address) {
      yield put(
        notificationPush({
          type: "LoadingAlert",
          message: {
            title: "Processing your transaction...",
            description:
              "Please sign the transaction and wait for block finalization. This may take a few minutes",
          },
          time: new Date().getTime(),
        })
      );
      const res = yield call(() =>
        removeProxyFromAccount(api, tradeAddress, signer, account?.address)
      );
      if (res.isSuccess) {
        yield put(
          notificationPush({
            type: "SuccessAlert",
            message: {
              title: "Congratulations!",
              description: "Your trade account has been removed from the chain!",
            },
            time: new Date().getTime(),
          })
        );
        yield put(removeProxyAccountFromChainData({ address: action.payload.address }));
        yield put(removeTradeAccountFromBrowser({ address: tradeAddress }));
      } else {
        throw new Error(res.message);
      }
    }
  } catch (error) {
    yield put(removeProxyAccountFromChainData({ address: action.payload.address }));
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: registerTradeAccountError,
        },
      })
    );
  }
}

export const removeProxyFromAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.removeProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, { signer }, mainAddress, true);
  return res;
};