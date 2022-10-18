import { call, delay, put, select } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";
import { mnemonicGenerate } from "@polkadot/util-crypto";

import { selectExtensionWalletAccounts } from "../../extensionWallet";
import {
  registerTradeAccountData,
  registerTradeAccountError,
  RegisterTradeAccountFetch,
  removeTradeAccountFromBrowser,
  tradeAccountPush,
} from "../actions";

import { selectRangerApi } from "@polkadex/orderbook/modules/public/ranger";
import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";

let tradeAddress: string;
export function* registerTradeAccountSaga(action: RegisterTradeAccountFetch) {
  try {
    const api = yield select(selectRangerApi);
    const controllerWallets = yield select(selectExtensionWalletAccounts);
    const { password, name, address } = action.payload;
    const mnemonic = mnemonicGenerate();
    const { account, signer } = controllerWallets.find(
      ({ account }) => account.address === address
    );
    const { pair } = keyring.addUri(mnemonic, password?.length > 0 ? password : null, {
      name,
    });
    tradeAddress = pair.address;
    const res = yield call(() =>
      addProxyToAccount(api, tradeAddress, signer, account?.address)
    );
    if (res.isSuccess) {
      yield put(tradeAccountPush({ pair }));
      yield delay(2000);
      yield put(
        registerTradeAccountData({
          mnemonic,
          account: {
            name,
            address,
          },
        })
      );
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    yield put(removeTradeAccountFromBrowser({ address: tradeAddress }));
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

export const addProxyToAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.addProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, { signer }, mainAddress, true);
  return res;
};