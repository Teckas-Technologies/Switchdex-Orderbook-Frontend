import { useReducer } from "react";
import BigNumber from "bignumber.js";
import { ApiPromise } from "@polkadot/api";

import { ExtensionAccount } from "../../types";

import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { depositsReducer, initialState } from "./reducer";

import { useSettingsProvider } from "@/providers/public/settings";
import { useNativeApi } from "@/providers/public/nativeApi";
import { ExtrinsicResult, signAndSendExtrinsic } from "@/helpers";
import { UNIT_BN } from "@/constants";

export const DepositProvider: T.DepositsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(depositsReducer, initialState);

  const { connected: isApiReady, api } = useNativeApi();
  const { onHandleError, onHandleNotification } = useSettingsProvider();

  const onFetchDeposit = async ({ asset, amount, mainAccount }) => {
    try {
      if (api && isApiReady && mainAccount?.account?.address !== "") {
        onHandleNotification({
          type: "Information",
          message: "Processing Deposit...",
        });
        dispatch(A.depositsFetch());

        const res = await depositToEnclave(api, mainAccount, asset, amount);

        if (res.isSuccess) {
          dispatch(A.depositsData());
          onHandleNotification({
            type: "Success",
            message:
              "Congratulations! You have successfully deposited assets to your trading account.",
          });

          dispatch(A.depositsReset());
        } else {
          throw new Error("Deposit failed");
        }
      }
    } catch (error) {
      console.log(error, "error");
      onHandleError(error?.message ?? error);
      dispatch(A.depositsError(error));
    }
  };

  async function depositToEnclave(
    api: ApiPromise,
    account: ExtensionAccount,
    asset: Record<string, string | null>,
    amount: string | number,
  ): Promise<ExtrinsicResult> {
    const amountStr = new BigNumber(amount).multipliedBy(UNIT_BN).toString();
    const ext = api.tx.ocex.deposit(asset, amountStr);
    const res = await signAndSendExtrinsic(
      api,
      ext,
      { signer: account.signer },
      account?.account.address,
      true,
    );
    return res;
  }

  return (
    <Provider
      value={{
        ...state,
        onFetchDeposit,
      }}
    >
      {children}
    </Provider>
  );
};
