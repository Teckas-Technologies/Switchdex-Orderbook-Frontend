import { put } from "redux-saga/effects";

import { OrderUpdateEvent, orderUpdateEventData } from "../actions";
import { SetOrder } from "../types";

import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";
import { OrderCommon } from "@polkadex/orderbook/modules/types";

export function* orderUpdatesSaga(action: OrderUpdateEvent) {
  try {
    const order = processOrderData(action.payload);
    yield put(orderUpdateEventData(order));
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (order updates channel)...",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

function processOrderData(eventData: SetOrder): OrderCommon {
  const base = eventData.pair.base_asset;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const quote = eventData.pair.quote_asset;

  return {
    main_account: eventData.user,
    id: eventData.id.toString(),
    client_order_id: eventData.client_order_id,
    time: new Date(Number(eventData.timestamp) * 1000).toISOString(),
    m: `${base}-${quote}`, // marketid
    side: eventData.side,
    order_type: eventData.order_type,
    status: eventData.status.toUpperCase(),
    price: Number(eventData.price),
    qty: Number(eventData.qty),
    avg_filled_price: eventData.avg_filled_price.toString(),
    filled_quantity: eventData.filled_quantity.toString(),
    fee: eventData.fee.toString(),
  };
}