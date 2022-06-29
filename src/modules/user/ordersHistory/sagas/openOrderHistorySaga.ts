// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import { userOpenOrderHistoryData, UserOpenOrdersHistoryFetch } from "../actions";
import { alertPush } from "../../../";
import { ProxyAccount, selectUserInfo } from "../../profile";

import * as queries from "./../../../../graphql/queries";

import { OrderCommon } from "src/modules/types";

export function* openOrdersHistorySaga(action: UserOpenOrdersHistoryFetch) {
  try {
    console.log("openOrderhistory saga called");
    const account: ProxyAccount = yield select(selectUserInfo);
    if (account.address) {
      const transactions: OrderCommon[] = yield call(fetchOpenOrders, account.address);
      console.log("orders =>", transactions);

      yield put(userOpenOrderHistoryData({ list: transactions }));
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (openOrderHistory)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
const fetchOpenOrders = async (proxy_acc: string): Promise<OrderCommon[]> => {
  const res: any = await API.graphql({
    query: queries.listOpenOrdersByMainAccount,
    variables: { main_account: proxy_acc },
  });
  const orders = res.data.listOpenOrdersByMainAccount.items;
  return orders;
};