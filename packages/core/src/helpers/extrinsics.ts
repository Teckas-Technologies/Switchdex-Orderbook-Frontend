import {
  AddToTxQueue,
  ExtrinsicResult,
  signAndSendExtrinsic,
} from "@orderbook/core/helpers/signAndSendExtrinsic";
import { Signer } from "@polkadot/types/types";
import { ApiPromise } from "@polkadot/api";

export const addProxyToAccount = async (
  addToTxQueue: AddToTxQueue,
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string,
  assetId?: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.addProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(
    addToTxQueue,
    api,
    ext,
    { signer },
    mainAddress,
    true,
    assetId
  );
  return res;
};

export const removeProxyFromAccount = async (
  addToTxQueue: AddToTxQueue,
  api: ApiPromise,
  proxyAddress: string,
  signer: Signer,
  mainAddress: string,
  assetId?: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.removeProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(
    addToTxQueue,
    api,
    ext,
    { signer },
    mainAddress,
    true,
    assetId
  );
  return res;
};
