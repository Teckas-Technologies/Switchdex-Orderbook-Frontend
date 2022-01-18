import { call, put, select } from "redux-saga/effects";

import {
  sendError,
  selectUserInfo,
  userOpenOrdersAppend,
  orderExecuteData,
  orderExecuteError,
  OrderExecuteFetch,
} from "../../..";
import { notificationPush } from "../../notificationHandler";
import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "src/helpers/formatPayload";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* ordersExecuteSaga(action: OrderExecuteFetch) {
  try {    
    const { side, price, order_type, amount } = action.payload;
    const { address, keyringPair } = yield select(selectUserInfo);
    if (address !== "" && keyringPair) {
      const payload = { symbol: [{"Asset": 0},{"Asset": 1}], order_side: side, order_type, price, amount, account: address   };
      const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
      const data = formatPayload(signature, payload);
      const res = yield call(() => API.post(ordersOption)("/place_order", data));
      if (res.Fine) {
        yield put(orderExecuteData());
        console.log(res.Fine);
        yield put(
          notificationPush({
            type: "Loading",
            message: {
              title: "Order Created",
              description: "Congrats your order has been created",
            },
          })
        );
      } else {
        throw new Error("Place order failed");
      }
    }
  } catch (error) {
    console.log({error});
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: orderExecuteError,
        },
      })
    );
  }
}
