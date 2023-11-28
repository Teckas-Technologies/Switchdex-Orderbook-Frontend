/**
 * This hook manages state and actions related to:
 * - Sorting the table
 * - Filter transactions by selected token
 * - Adapt deposit data, including balance retrieval, wallet details, and token information
 * - Retrieve column header text
 */

import { useTransactions } from "@orderbook/core/hooks";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import { useMemo, useState } from "react";
import { SortingState } from "@tanstack/react-table";
import { useTranslation } from "next-i18next";
import { intlFormat } from "date-fns";

import { columns as getColumns } from "./columns";
import * as T from "./types";

import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export function useDepositHistory({
  selectedAsset,
}: {
  selectedAsset?: FilteredAssetProps;
}) {
  const { t } = useTranslation("transfer");

  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { selectedAccount } = useProfile();
  const { allAccounts } = useExtensionWallet();
  const { deposits, loading } = useTransactions();

  const { mainAddress } = selectedAccount;
  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const data = useMemo(
    () =>
      deposits
        ?.filter((e) => {
          if (showSelectedCoins) {
            const assetName = e.asset.name;
            return assetName === selectedAsset?.name;
          }
          return e;
        })
        ?.map((e) => {
          return {
            ...e,
            main_account: mainAddress,
            time: intlFormat(
              new Date(e.timestamp),
              {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
              { locale: "EN" }
            ),
            token: {
              ticker: e.asset?.ticker,
              name: e.asset?.name,
            },
            wallets: {
              fromWalletName: fundingWallet?.account?.meta?.name ?? "",
              fromWalletAddress: fundingWallet?.account?.address ?? "",
              toWalletType: t("trading.type"),
            },
          } as T.Props;
        }),
    [
      deposits,
      fundingWallet?.account?.meta?.name,
      fundingWallet?.account?.address,
      selectedAsset?.name,
      showSelectedCoins,
      t,
      mainAddress,
    ]
  );

  const columns = useMemo(
    () =>
      getColumns([
        t("tableHeader.date"),
        t("tableHeader.name"),
        t("tableHeader.amount"),
        t("tableHeader.fees"),
        t("tableHeader.transfer"),
      ]),
    [t]
  );

  return {
    showSelectedCoins,
    onShowSelectedCoins: () => setShowSelectedCoins(!showSelectedCoins),
    sorting,
    setSorting,
    columns,
    data,
    loading,
  };
}
