import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { depthData, orderBookData, orderBookError, OrderBookFetch } from "../actions";

import { getDepthFromOrderbook } from "./helper";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const orderBookOptions: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* orderBookSaga(action: OrderBookFetch) {
  try {
    // TODO: make dynamic with market
    const market = action.payload;
    const res = yield call(API.get(orderBookOptions), `/fetch_orderbook`);
    if (!res.Fine) {
      throw new Error(res.Bad);
    }
    const data = res.Fine;
    const { asks, bids } = getDepthFromOrderbook(data);
    yield put(orderBookData(data));
    yield put(depthData({ asks, bids }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "console",
        extraOptions: {
          actionError: orderBookError,
        },
      })
    );
  }
}
