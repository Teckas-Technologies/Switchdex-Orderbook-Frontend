import { useTheaProvider } from "@orderbook/core/providers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useMutation } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { signAndSendExtrinsic, sleep } from "@orderbook/core/helpers";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";

// TEMP
const withdrawMessage =
  "After withdrawal initiation, expect tokens on the destination chain in 2-3 minutes";
const depositMessage =
  "Deposit Success. Processed transactions take up to 20 minutes to appear on the History";

export function useBridge({ onSuccess }: { onSuccess: () => void }) {
  const { api } = useNativeApi();
  const { onHandleAlert, onHandleError } = useSettingsProvider();
  const {
    transferConfig,
    sourceAccount,
    isPolkadexChain,
    onRefreshTransactions,
    onRefetchSourceBalances,
  } = useTheaProvider();
  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      // const decimales =
      //   networks.find((x) => x.id === transferConfig?.sourceChain.genesis)
      //     ?.decimals ?? 12;
      // const formatedAmount = toPlanck(amount, decimales).toNumber();

      if (!transferConfig || !sourceAccount || !api) {
        onHandleError?.("Bridge issue");
        return;
      }

      const ext = await transferConfig.transfer<SubmittableExtrinsic>(amount);

      await signAndSendExtrinsic(
        api,
        ext,
        { signer: sourceAccount.signer },
        sourceAccount.address,
        true
      );
      onSuccess();
      onHandleAlert(isPolkadexChain ? withdrawMessage : depositMessage);
      if (isPolkadexChain) {
        await sleep(3000);
        await onRefreshTransactions();
      }
      await onRefetchSourceBalances();
    },
    onError: (error: Error) => onHandleError?.(error.message),
  });
}
