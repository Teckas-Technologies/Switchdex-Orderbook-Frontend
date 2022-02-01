import { put, delay, call } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import { KeyringPair } from "@polkadot/keyring/types";

import { sendError, alertPush } from "../../../";
import { signUpData, signUpError, SignUpFetch } from "../actions";
import { notificationPush } from "../../notificationHandler";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";

const registerUserOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* signUpSaga(action: SignUpFetch) {
  try {
    const { mnemonic, password, accountName } = action.payload;
    const { pair } = keyring.addUri(mnemonic, password, { name: accountName });
    const proxyAddress = pair.address;
    yield call(() => registerAccount(pair, proxyAddress));
    // TODO: Check if registerAccount has been successful
    yield put(
      notificationPush({
        type: "Loading",
        message: {
          title: "Your Account has been created",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        },
      })
    );
    yield delay(2000);
    yield put(signUpData());
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: signUpError,
        },
      })
    );
  }
}
// TODO: Check if registerAccount has been successful
export const registerAccount = async (userKeyring: KeyringPair, proxyAddress: string) => {
  const payload = { main_account: proxyAddress, proxy_account: proxyAddress };
  const signature = await signMessage(userKeyring, JSON.stringify(payload));
  const data = {
    signature: {
      Sr25519: signature.trim().slice(2),
    },
    payload,
  };
  console.log(data);
  const res: any = await API.post(registerUserOption)("/register", data);
  console.log(res);
  if (res.Bad && !res.Bad.includes("AccountAlreadyRegistered")) {
    throw new Error(res.Bad);
  }
};
