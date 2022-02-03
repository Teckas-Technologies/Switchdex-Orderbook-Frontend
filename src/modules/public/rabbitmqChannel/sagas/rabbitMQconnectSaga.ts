import { call, put } from "redux-saga/effects";

import { alertPush } from "../../alertHandler";
import { orderBookChannelFetch } from "../../orderBook";
import { rabbitmqChannelData } from "../actions";

import AMQPWebSocketClient from "./amqp-websocket-client";

import {
  balanceChannelFetch,
  klineFetchChannelFetch,
  recentTradesChannelFetch,
} from "@polkadex/orderbook-modules";

const url = `wss://roedeer.rmq.cloudamqp.com/ws/amqp`;

export function* rabbitmqConnectionSaga() {
  try {
    const amqp = new AMQPWebSocketClient(
      url,
      "uwkbvyaj",
      "uwkbvyaj",
      "ZkWyU-ZFryl7QFz3WAZR6PWMMhhx43Rk"
    );
    const channel = yield call(() => fetchrabbitmqChannelAsync(amqp));
    yield put(rabbitmqChannelData(channel));
    yield put(balanceChannelFetch());
    yield put(recentTradesChannelFetch());
    yield put(klineFetchChannelFetch());
    yield put(orderBookChannelFetch());
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
async function fetchrabbitmqChannelAsync(amqp) {
  const connection = await amqp.connect();
  const channel = await connection.channel();
  return channel;
}