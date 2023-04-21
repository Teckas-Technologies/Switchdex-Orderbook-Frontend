import { FC, PropsWithChildren } from "react";

import { CommonError, ExtensionAccount } from "@polkadex/orderbook/providers/types";
// todo: replace when providers are ready

export interface DepositsState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
}

export interface onFetchDeposit {
  asset: Record<string, string | null>;
  amount: string | number;
  mainAccount: ExtensionAccount;
}

export type DepositContextProps = DepositsState & {
  onFetchDeposit: (value: onFetchDeposit) => void;
};

export type DepositProviderProps = PropsWithChildren<{
  value: DepositContextProps;
}>;

export interface DepositsProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type DepositsComponent = FC<PropsWithChildren<DepositsProps>>;
