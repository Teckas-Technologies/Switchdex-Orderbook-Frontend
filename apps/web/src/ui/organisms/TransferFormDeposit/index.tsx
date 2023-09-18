import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import {
  transformAddress,
  useProfile,
} from "@orderbook/core/providers/user/profile";
import { useFormik } from "formik";
import { depositValidationsTest } from "@orderbook/core/validations";
import { isAssetPDEX, trimFloat } from "@orderbook/core/helpers";
import { useDepositProvider } from "@orderbook/core/providers/user/depositProvider";
import { ExtensionAccount } from "@orderbook/core/providers/types";
import { useAssetTransfer } from "@orderbook/core/index";

import { CustomAddress } from "../TransferFormWithdraw/types";

import * as S from "./styles";
import * as T from "./types";

import { AccountSelect, Popover, TokenCard, WalletCard } from "@/ui/molecules";
import { Icons, Tokens } from "@/ui/atoms";

const initialValues = { amount: 0.0 };

export const TransferFormDeposit = ({
  onTransferInteraction,
  onOpenAssets,
  selectedAsset,
  otherPolkadexAccount,
}: T.Props) => {
  const { allAccounts } = useExtensionWallet();
  const { loading, onFetchDeposit } = useDepositProvider();
  const { selectedAccount } = useProfile();

  const { mutate } = useAssetTransfer();
  const { mainAddress } = selectedAccount;

  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const amountRef = useRef<HTMLInputElement | null>(null);

  const existentialBalance = useMemo(
    () => (isAssetPDEX(selectedAsset?.assetId) ? 1 : 0.1),
    [selectedAsset?.assetId]
  );

  const handleMax = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const onChainBalance = Number(selectedAsset?.onChainBalance);
    if (onChainBalance > existentialBalance) {
      const balance = onChainBalance - existentialBalance;
      const trimmedBalance = trimFloat({ value: balance });
      setFieldValue("amount", trimmedBalance);
    }
    // TODO: Handle Error...
  };

  const fundingWalletName = fundingWallet?.account?.meta.name ?? "";
  const fundingWalletAddress = useMemo(
    () => transformAddress(fundingWallet?.account?.address ?? ""),
    [fundingWallet?.account?.address]
  );

  const [selectedWallet, setSelectedWallet] = useState<
    ExtensionAccount | CustomAddress
  >();

  const [toQuery, setToQuery] = useState("");

  const filteredWallets: ExtensionAccount[] | CustomAddress[] = useMemo(() => {
    if (toQuery === "") return allAccounts;

    const filteredAccounts = allAccounts?.filter((e) => {
      const { address, meta } = e.account;
      const queryRes = toQuery.toLowerCase();
      return (
        address.toLowerCase().includes(queryRes) ||
        meta?.name?.toLowerCase().includes(queryRes)
      );
    });

    if (filteredAccounts.length) return filteredAccounts;

    const customAddress = {
      account: {
        address: toQuery,
      },
    };

    setSelectedWallet(customAddress);
    return [...allAccounts, customAddress];
  }, [toQuery, allAccounts]);

  const [selectedFundingWallet, setSelectedFundingWallet] =
    useState<ExtensionAccount | null>(fundingWallet ?? null);

  const [fromQuery, setFromQuery] = useState("");
  const filteredFundingWallets: ExtensionAccount[] = useMemo(() => {
    const queryRes = allAccounts?.filter((e) => {
      const { address, meta } = e.account;
      return (
        address?.toLowerCase().includes(fromQuery) ||
        meta?.name?.toLowerCase().includes(fromQuery)
      );
    });

    if (fromQuery === "" || !queryRes?.length) return allAccounts;
    return queryRes;
  }, [fromQuery, allAccounts]);

  const {
    handleSubmit,
    resetForm,
    errors,
    getFieldProps,
    isValid,
    dirty,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: depositValidationsTest,
    validateOnBlur: true,
    onSubmit: async ({ amount }) => {
      if (!fundingWallet) return;
      // TODO: Handle Error...

      try {
        const address = otherPolkadexAccount
          ? selectedWallet?.account.address
          : fundingWallet.account.address;

        const account = otherPolkadexAccount
          ? selectedFundingWallet
          : fundingWallet;

        const asset: T.GenericAsset = isAssetPDEX(selectedAsset?.assetId)
          ? { polkadex: null }
          : { asset: selectedAsset?.assetId || null };

        // TODO: Fix types or Handle Error
        if (!address || !account) return;

        if (otherPolkadexAccount) {
          mutate({
            asset,
            dest: address,
            amount: amount.toString(),
            account,
          });
        } else {
          await onFetchDeposit({
            asset,
            amount,
            account,
          });
        }
      } finally {
        resetForm({ values: initialValues });
      }
    },
  });

  useEffect(() => {
    if (otherPolkadexAccount) resetForm();
  }, [otherPolkadexAccount, resetForm]);

  return (
    <S.Content onSubmit={handleSubmit}>
      <S.Wallets>
        <WalletCard
          searchable={otherPolkadexAccount}
          label="From"
          walletTypeLabel="Extension wallet"
          walletType="Funding account"
          walletName={fundingWalletName}
          walletAddress={fundingWalletAddress}
        >
          {otherPolkadexAccount && (
            <AccountSelect
              pasteable={false}
              selectedAccount={selectedFundingWallet}
              onQuery={(e) => setFromQuery(e)}
              onSelectAccount={setSelectedFundingWallet}
              data={filteredFundingWallets}
              placeholder="Select your Polkadex address"
            />
          )}
        </WalletCard>

        <S.WalletsButton
          disabled={otherPolkadexAccount}
          type="button"
          onClick={onTransferInteraction}
        >
          <div>
            <Icons.Trading />
          </div>
          <span>Switch</span>
        </S.WalletsButton>
        <WalletCard
          searchable={otherPolkadexAccount}
          label="To"
          walletTypeLabel="Orderbook"
          walletType="Trading account"
          walletName="Balance available across all trading accounts."
        >
          {otherPolkadexAccount && (
            <AccountSelect
              selectedAccount={selectedWallet}
              onQuery={(e) => setToQuery(e)}
              onSelectAccount={setSelectedWallet}
              data={filteredWallets}
            />
          )}
        </WalletCard>
      </S.Wallets>
      <S.Form>
        <TokenCard
          tokenIcon={(selectedAsset?.symbol as keyof typeof Tokens) ?? ""}
          tokenTicker={selectedAsset?.symbol ?? ""}
          availableAmount={selectedAsset?.onChainBalance ?? "0.00"}
          onAction={onOpenAssets}
        />
        <S.Amount onClick={() => amountRef.current?.focus()}>
          <div>
            <Popover placement="top left" isOpen={!!errors.amount}>
              <Popover.Trigger>
                <div />
              </Popover.Trigger>
              <Popover.Content>
                <S.Errors>
                  <div>
                    <Icons.Alert />
                  </div>
                  {errors.amount && <p>{errors.amount}</p>}
                </S.Errors>
              </Popover.Content>
            </Popover>
            <input
              ref={amountRef}
              placeholder="Enter an amount"
              {...getFieldProps("amount")}
            />
            <span>$0.00</span>
          </div>
          <button type="button" onClick={handleMax}>
            MAX
          </button>
        </S.Amount>
      </S.Form>
      <S.Footer>
        <button disabled={!(isValid && dirty) || loading} type="submit">
          Transfer
        </button>
      </S.Footer>
    </S.Content>
  );
};
