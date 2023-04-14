import { all, call } from "redux-saga/effects";
import { combineReducers } from "redux";

import { GlobalSettingsState } from "./public/globalSettings";
import { rootHandleAlertSaga, AlertState } from "./public/alertHandler";
import { ErrorHandlerState, rootErrorHandlerSaga } from "./public/errorHandler";
import { KlineState, rootKlineFetchSaga } from "./public/kline";
import { RangerState, rootRangerSaga } from "./public/ranger";
import {
  DepthIncrementState,
  DepthState,
  OrderBookState,
  rootOrderBookSaga,
} from "./public/orderBook";
import { OrdersState, rootOrdersSaga } from "./user/orders";
import { TradeAccountsState, rootTradeAccountsSaga } from "./user/tradeWallet";
import { publicReducer, userReducer } from "./app";
import { rootTradesSaga, TradesState } from "./user/trades";
import { NotificationState, rootNotificationSaga } from "./user/notificationHandler";

export * from "./user/orders";
export * from "./user/trades";
export * from "./user/notificationHandler";
export * from "./user/tradeWallet";
export * from "./public/errorHandler";
export * from "./public/globalSettings";
export * from "./public/alertHandler";
export * from "./public/kline";
export * from "./public/orderBook";
export * from "./public/ranger";

export interface RootState {
  public: {
    alerts: AlertState;
    globalSettings: GlobalSettingsState;
    depth: DepthState;
    errorHandler: ErrorHandlerState;
    incrementDepth: DepthIncrementState;
    kline: KlineState;
    orderBook: OrderBookState;
    ranger: RangerState;
  };
  user: {
    tradeWallet: TradeAccountsState;
    orders: OrdersState;
    trades: TradesState;
    notifications: NotificationState;
  };
}

export const rootReducer = combineReducers({
  public: publicReducer,
  user: userReducer,
});

export function* rootSaga() {
  yield all([
    call(rootNotificationSaga),
    call(rootErrorHandlerSaga),
    call(rootHandleAlertSaga),
    call(rootKlineFetchSaga),
    call(rootRangerSaga),
    call(rootOrderBookSaga),
    call(rootOrdersSaga),
    call(rootTradeAccountsSaga),
    call(rootTradesSaga),
    call(rootNotificationSaga),
  ]);
}
