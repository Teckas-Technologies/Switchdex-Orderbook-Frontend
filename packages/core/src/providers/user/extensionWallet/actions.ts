import { USER_EVENTS } from "@orderbook/core";

import { CommonError, ExtensionAccount } from "../../types";

import {
  POLKADOT_EXTENSION_WALLET_FETCH,
  POLKADOT_EXTENSION_WALLET_ERROR,
  POLKADOT_EXTENSION_WALLET_DATA,
  REGISTER_MAIN_ACCOUNT_RESET,
  REGISTER_MAIN_ACCOUNT_FETCH,
  REGISTER_MAIN_ACCOUNT_DATA,
  REGISTER_MAIN_ACCOUNT_ERROR,
  REGISTER_MAIN_ACCOUNT_UPDATE_DATA,
  REGISTER_MAIN_ACCOUNT_UPDATE_FETCH,
  REGISTER_MAIN_ACCOUNT_LINK_EMAIL,
} from "./constants";

export interface ExtensionWalletFetch {
  type: typeof POLKADOT_EXTENSION_WALLET_FETCH;
}

export interface ExtensionWalletError {
  type: typeof POLKADOT_EXTENSION_WALLET_ERROR;
  error: CommonError;
}

export interface ExtensionWalletData {
  type: typeof POLKADOT_EXTENSION_WALLET_DATA;
  payload: {
    allAccounts: ExtensionAccount[];
  };
}

export interface ResetExtensionWallet {
  type: typeof REGISTER_MAIN_ACCOUNT_RESET;
}

export interface RegisterMainAccountFetch {
  type: typeof REGISTER_MAIN_ACCOUNT_FETCH;
  payload: {
    mainAccount: string;
    tradeAddress: string;
    password: string;
    mnemonic: string;
  };
}

export interface RegisterMainAccountLinkEmailFetch {
  type: typeof REGISTER_MAIN_ACCOUNT_LINK_EMAIL;
  payload: { mainAccount: string };
}

export interface RegisterMainAccountData {
  type: typeof REGISTER_MAIN_ACCOUNT_DATA;
}
export interface RegisterMainAccountReset {
  type: typeof REGISTER_MAIN_ACCOUNT_RESET;
}

export interface RegisterMainAccountError {
  type: typeof REGISTER_MAIN_ACCOUNT_ERROR;
}

export interface RegisterMainAccountUpdateEvent {
  type: typeof REGISTER_MAIN_ACCOUNT_UPDATE_FETCH;
  payload: {
    type: typeof USER_EVENTS.RegisterAccount;
    event_id: number;
    main: string;
    proxy: string;
  };
}

export interface RegisterMainAccountUpdateData {
  type: typeof REGISTER_MAIN_ACCOUNT_UPDATE_DATA;
  payload: any;
}

export type GetExtensionWalletAction =
  | ExtensionWalletFetch
  | ExtensionWalletError
  | ExtensionWalletData
  | ResetExtensionWallet
  | RegisterMainAccountFetch
  | RegisterMainAccountData
  | RegisterMainAccountError
  | RegisterMainAccountUpdateEvent
  | RegisterMainAccountReset
  | RegisterMainAccountUpdateData;

export const extensionWalletData = (
  payload: ExtensionWalletData["payload"],
): ExtensionWalletData => ({
  type: POLKADOT_EXTENSION_WALLET_DATA,
  payload,
});

export const extensionWalletError = (
  error: CommonError,
): ExtensionWalletError => ({
  type: POLKADOT_EXTENSION_WALLET_ERROR,
  error,
});

export const extensionWalletFetch = (): ExtensionWalletFetch => ({
  type: POLKADOT_EXTENSION_WALLET_FETCH,
});

export const registerMainAccountFetch = (
  payload: RegisterMainAccountFetch["payload"],
): RegisterMainAccountFetch => ({
  type: REGISTER_MAIN_ACCOUNT_FETCH,
  payload,
});

export const registerMainAccountLinkEmail = (
  payload: RegisterMainAccountLinkEmailFetch["payload"],
) => ({
  type: REGISTER_MAIN_ACCOUNT_LINK_EMAIL,
  payload,
});

export const registerMainAccountData = (): RegisterMainAccountData => ({
  type: REGISTER_MAIN_ACCOUNT_DATA,
});

export const registerMainAccountError = (): RegisterMainAccountError => ({
  type: REGISTER_MAIN_ACCOUNT_ERROR,
});

export const registerMainAccountUpdateEvent = (
  payload: RegisterMainAccountUpdateEvent["payload"],
) => ({
  type: REGISTER_MAIN_ACCOUNT_UPDATE_FETCH,
  payload,
});

export const registerMainAccountUpdateData = (
  payload: RegisterMainAccountUpdateData["payload"],
) => ({
  type: REGISTER_MAIN_ACCOUNT_UPDATE_DATA,
  payload,
});

export const registerMainAccountReset = (): RegisterMainAccountReset => ({
  type: REGISTER_MAIN_ACCOUNT_RESET,
});