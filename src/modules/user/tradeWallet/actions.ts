import { CommonError, TradeAccount } from "../../types";

import {
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNTS_DATA,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_REGISTER_TRADE_ACCOUNT_DATA,
  USER_REGISTER_TRADE_ACCOUNT_ERROR,
  REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
  USER_REGISTER_TRADE_ACCOUNT_RESET,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA,
  USER_TRADE_ACCOUNT_UNLOCK,
  USER_TRADE_ACCOUNT_IMPORT_ERROR,
  USER_TRADE_ACCOUNT_IMPORT_FETCH,
  USER_TRADE_ACCOUNT_IMPORT_DATA,
  USER_TRADE_ACCOUNT_PUSH,
  USER_TRADE_ACCOUNT_MODAL_ACTIVE,
  USER_TRADE_ACCOUNT_MODAL_CANCEL,
} from "./constants";

export interface PolkadotWalletFetchPayload {
  allAccounts: TradeAccount[];
}

export interface TradeAccountsFetch {
  type: typeof USER_TRADE_ACCOUNTS_FETCH;
}

export interface TradeAccountsData {
  type: typeof USER_TRADE_ACCOUNTS_DATA;
  payload: PolkadotWalletFetchPayload;
}

export interface TradeAccountsError {
  type: typeof USER_TRADE_ACCOUNTS_ERROR;
  error: CommonError;
}
export interface RegisterTradeAccountFetch {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_FETCH;
  payload: {
    address: string;
    password?: string;
    name?: string;
  };
}

export interface RegisterTradeAccountData {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_DATA;
  payload: {
    mnemonic: string;
    account: {
      name: string;
      address: string;
    };
  };
}
export interface RegisterTradeAccountModalActive {
  type: typeof USER_TRADE_ACCOUNT_MODAL_ACTIVE;
  payload?: {
    name: string;
    address: string;
  };
}
export interface RegisterTradeAccountModalCancel {
  type: typeof USER_TRADE_ACCOUNT_MODAL_CANCEL;
}
export interface RegisterTradeAccountError {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_ERROR;
  error: CommonError;
}

export interface RegisterTradeAccountReset {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_RESET;
}

export interface RemoveTradeAccountFromBrowser {
  type: typeof REMOVE_TRADE_ACCOUNT_FROM_BROWSER;
  payload: { address: string };
}

export interface RemoveProxyAccountFromChainFetch {
  type: typeof USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH;
  payload: { address: string };
}

export interface RemoveProxyAccountFromChainData {
  type: typeof USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA;
  payload: { address: string };
}

export interface UnlockTradeAccount {
  type: typeof USER_TRADE_ACCOUNT_UNLOCK;
  payload: {
    address: string;
    password: string;
  };
}

export interface ImportTradeAccountFetch {
  type: typeof USER_TRADE_ACCOUNT_IMPORT_FETCH;
  payload: {
    mnemonic: string;
    name: string;
    password?: string;
  };
}
export interface ImportTradeAccountData {
  type: typeof USER_TRADE_ACCOUNT_IMPORT_DATA;
}
export interface ImportTradeAccountError {
  type: typeof USER_TRADE_ACCOUNT_IMPORT_ERROR;
  error: CommonError;
}

export interface TradeAccountPush {
  type: typeof USER_TRADE_ACCOUNT_PUSH;
  payload: { pair: TradeAccount };
}

export type TradeAccountsAction =
  | TradeAccountsFetch
  | TradeAccountsError
  | TradeAccountsData
  | RegisterTradeAccountFetch
  | RegisterTradeAccountData
  | RegisterTradeAccountError
  | RemoveTradeAccountFromBrowser
  | RegisterTradeAccountReset
  | RemoveProxyAccountFromChainFetch
  | RemoveProxyAccountFromChainData
  | UnlockTradeAccount
  | ImportTradeAccountFetch
  | ImportTradeAccountData
  | ImportTradeAccountError
  | TradeAccountPush
  | RegisterTradeAccountModalActive
  | RegisterTradeAccountModalCancel;

export const tradeAccountsFetch = (): TradeAccountsFetch => ({
  type: USER_TRADE_ACCOUNTS_FETCH,
});

export const tradeAccountsData = (payload: PolkadotWalletFetchPayload): TradeAccountsData => ({
  type: USER_TRADE_ACCOUNTS_DATA,
  payload,
});

export const tradeAccountsError = (error: CommonError): TradeAccountsError => ({
  type: USER_TRADE_ACCOUNTS_ERROR,
  error,
});
export const registerTradeAccountFetch = (
  payload: RegisterTradeAccountFetch["payload"]
): RegisterTradeAccountFetch => ({
  type: USER_REGISTER_TRADE_ACCOUNT_FETCH,
  payload,
});

export const registerTradeAccountData = (
  payload: RegisterTradeAccountData["payload"]
): RegisterTradeAccountData => ({
  type: USER_REGISTER_TRADE_ACCOUNT_DATA,
  payload,
});

export const registerTradeAccountReset = (): RegisterTradeAccountReset => ({
  type: USER_REGISTER_TRADE_ACCOUNT_RESET,
});

export const registerTradeAccountError = (error: CommonError): RegisterTradeAccountError => ({
  type: USER_REGISTER_TRADE_ACCOUNT_ERROR,
  error,
});

export const removeTradeAccountFromBrowser = (
  payload: RemoveTradeAccountFromBrowser["payload"]
): RemoveTradeAccountFromBrowser => ({
  type: REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
  payload,
});

export const removeProxyAccountFromChainFetch = (
  payload: RemoveProxyAccountFromChainFetch["payload"]
): RemoveProxyAccountFromChainFetch => ({
  type: USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  payload,
});

export const removeProxyAccountFromChainData = (
  payload: RemoveProxyAccountFromChainData["payload"]
): RemoveProxyAccountFromChainData => ({
  type: USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA,
  payload,
});

export const unlockTradeAccount = (
  payload: UnlockTradeAccount["payload"]
): UnlockTradeAccount => ({
  type: USER_TRADE_ACCOUNT_UNLOCK,
  payload: payload,
});

export const importTradeAccountFetch = (
  payload: ImportTradeAccountFetch["payload"]
): ImportTradeAccountFetch => ({
  type: USER_TRADE_ACCOUNT_IMPORT_FETCH,
  payload: payload,
});

export const importTradeAccountData = (): ImportTradeAccountData => ({
  type: USER_TRADE_ACCOUNT_IMPORT_DATA,
});

export const importTradeAccountError = (error: CommonError): ImportTradeAccountError => ({
  type: USER_TRADE_ACCOUNT_IMPORT_ERROR,
  error: error,
});

export const tradeAccountPush = (payload: TradeAccountPush["payload"]): TradeAccountPush => ({
  type: USER_TRADE_ACCOUNT_PUSH,
  payload,
});

export const registerAccountModalActive = (
  payload?: RegisterTradeAccountModalActive["payload"]
): RegisterTradeAccountModalActive => ({
  type: USER_TRADE_ACCOUNT_MODAL_ACTIVE,
  payload,
});

export const registerAccountModalCancel = (): RegisterTradeAccountModalCancel => ({
  type: USER_TRADE_ACCOUNT_MODAL_CANCEL,
});