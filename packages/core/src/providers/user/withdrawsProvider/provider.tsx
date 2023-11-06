import { useReducer } from "react";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";
import * as mutations from "@orderbook/core/graphql/mutations";
import { useNativeApi } from "@orderbook/core/providers/public//nativeApi";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import {
  createWithdrawSigningPayload,
  ExtrinsicResult,
  signAndSendExtrinsic,
  getNonce,
  sendQueryToAppSync,
  signPayload,
} from "@orderbook/core/helpers";

import { useProfile, UserAccount } from "../profile";
import { useExtensionWallet } from "../extensionWallet";
import { selectTradeAccount } from "../tradeWallet/helper";
import { useTradeWallet } from "../tradeWallet";
import { useBalancesProvider } from "../balancesProvider";

import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { initialState, withdrawsReducer } from "./reducer";

export const WithdrawsProvider: T.WithdrawsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(withdrawsReducer, initialState);
  const { onChangeChainBalance } = useBalancesProvider();
  const profileState = useProfile();
  const nativeApiState = useNativeApi();
  const settingsState = useSettingsProvider();
  const { selectMainAccount } = useExtensionWallet();
  const currentAccount: UserAccount = profileState.selectedAccount;
  const { mainAddress, tradeAddress } = currentAccount;
  const { allBrowserAccounts } = useTradeWallet();
  const keyringPair = selectTradeAccount(tradeAddress, allBrowserAccounts);

  type UserActionLambdaResp = {
    is_success: boolean;
    body: string;
  };
  const onFetchWithdraws = async ({ asset, amount }) => {
    dispatch(A.withdrawsFetch({ asset, amount }));
    try {
      const nonce = getNonce();
      const api = nativeApiState.api;

      // TODO: Handle error or fix types
      if (tradeAddress !== "" && keyringPair && api) {
        const payload = { asset_id: { asset }, amount, timestamp: nonce };
        const signingPayload = createWithdrawSigningPayload(
          api,
          asset,
          amount,
          nonce
        );
        const signature = signPayload(api, keyringPair, signingPayload);
        const res = await executeWithdraw(
          [mainAddress, tradeAddress, payload, signature],
          tradeAddress
        );
        if (res.data.withdraw) {
          const resp: UserActionLambdaResp = JSON.parse(res.data.withdraw);
          if (!resp.is_success) {
            dispatch(A.withdrawsData());
            settingsState.onHandleError(resp.body);
            return;
          }
        }
        dispatch(A.withdrawsData());
        settingsState.onHandleNotification({
          type: "Success",
          message:
            "Your withdrawal is being processed and will be available for you to claim in a few minutes",
        });
      }
    } catch (error) {
      dispatch(A.withdrawsData());
      settingsState.onHandleError(error?.message ?? error);
    }
  };

  const executeWithdraw = async (withdrawPayload, address) => {
    const payload = JSON.stringify({ Withdraw: withdrawPayload });
    return await sendQueryToAppSync({
      query: mutations.withdraw,
      variables: { input: { payload } },
      token: address,
    });
  };

  const onFetchClaimWithdraw = async ({
    sid,
    assetIds = [],
  }: A.WithdrawsClaimFetch["payload"]) => {
    try {
      const api = nativeApiState.api;
      const currentAccount: UserAccount = profileState.selectedAccount;
      const extensionAccount = selectMainAccount(currentAccount.mainAddress);
      const isApiReady = nativeApiState.connected;
      if (
        api &&
        isApiReady &&
        extensionAccount?.account?.address !== "" &&
        extensionAccount?.signer
      ) {
        // TODO: Move this toast as callback to signAndSendExtrinsic,
        settingsState.onHandleNotification({
          type: "Information",
          message:
            "Processing Claim Withdraw, please wait while the withdraw is processed and the block is finalized. This may take a few mins.",
        });
        dispatch(A.withdrawsClaimFetch({ sid, assetIds }));

        const res = await claimWithdrawal(
          api,
          extensionAccount.signer,
          extensionAccount.account.address,
          sid
        );
        if (res.isSuccess) {
          dispatch(A.withdrawsClaimData({ sid }));
          // TODO?: Check delay
          // for ux
          setTimeout(() => {
            settingsState.onHandleNotification({
              type: "Success",
              message:
                "Congratulations! You have successfully withdrawn your assets to your funding account.",
            });

            dispatch(A.withdrawClaimReset());
          }, 3000);
        } else {
          throw new Error("Claim Withdraw failed");
        }
      }
    } catch (error) {
      dispatch(A.withdrawClaimCancel(sid));
      settingsState.onHandleError(error?.message ?? error);
      dispatch(A.withdrawsError(error));
    } finally {
      for (const assetId of assetIds) {
        await onChangeChainBalance(assetId);
      }
    }
  };

  async function claimWithdrawal(
    api: ApiPromise,
    signer: Signer,
    account: string,
    sid: number
  ): Promise<ExtrinsicResult> {
    const ext = api.tx.ocex.claimWithdraw(sid, account);
    return await signAndSendExtrinsic(api, ext, { signer }, account, true);
  }

  return (
    <Provider
      value={{
        ...state,
        onFetchWithdraws,
        onFetchClaimWithdraw,
      }}
    >
      {children}
    </Provider>
  );
};