import * as mutation from "@orderbook/core/graphql/mutations";
import {
  sendQueryToAppSync,
  SignatureEnumSr25519,
} from "@orderbook/core/helpers";
import { Codec } from "@polkadot/types/types";

export const getNewClientId = () => {
  // 32 byte Uint8Array of random string with "webapp-" prefix
  const clientOrderId = new Uint8Array(32);
  clientOrderId.set(new TextEncoder().encode("webapp-"));
  for (let i = 9; i < 32; i++) {
    clientOrderId[i] = Math.floor(Math.random() * 256);
  }
  return clientOrderId;
};

export const executePlaceOrder = async (
  orderPayload: [Codec, SignatureEnumSr25519],
  proxyAddress: string
) => {
  const payloadStr = JSON.stringify({ PlaceOrder: orderPayload });
  const res = await sendQueryToAppSync({
    query: mutation.place_order,
    variables: { input: { payload: payloadStr } },
    token: proxyAddress,
  });

  return res;
};

export const parseMutationError = (err: unknown) => {
  if (err instanceof Error) {
    return err.message;
  }
  if (typeof err === "string") {
    return err;
  } else {
    return JSON.stringify(err);
  }
};

export const executeCancelOrder = async (
  cancelOrderPayload: [string, string, string, string, SignatureEnumSr25519],
  proxyAddress: string
) => {
  const payload = JSON.stringify({ CancelOrder: cancelOrderPayload });
  const res = await sendQueryToAppSync({
    query: mutation.cancel_order,
    variables: { input: { payload } },
    token: proxyAddress,
  });
  return res;
};
