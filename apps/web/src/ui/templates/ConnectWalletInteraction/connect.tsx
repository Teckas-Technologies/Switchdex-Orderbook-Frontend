import { useExtensionAccounts, useExtensions } from "@polkadex/react-providers";
import { useCallback, useMemo } from "react";
import { TradeAccount } from "@orderbook/core/providers/types";
import {
  Authorization,
  ConnectWallet,
  Multistep,
  ExtensionAccounts,
} from "@polkadex/ux";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { ConnectTradingAccount } from "../ConnectWallet/connectTradingAccount";
import { ImportTradingAccount } from "../ConnectWallet/importTradingAccount";
import { ImportTradingAccountMnemonic } from "../ConnectWallet/importTradingAccountMnemonic";
import { RemoveTradingAccount } from "../ConnectWallet/removeTradingAccount";
import { ConnectTradingAccountCard } from "../ReadyToUse/connectTradingAccountCard";
import { UnlockBrowserAccount } from "../ConnectWallet/unlockBrowserAccount";

import { SwitchKeys } from ".";

export type ConnectKeys =
  | "ConnectAuthorization"
  | "ConnectWalletOrderbook"
  | "ConnectFundingWallets"
  | "ConnectTradingAccount"
  | "RemoveTradingAccount"
  | "ImportTradingAccount"
  | "ImportTradingAccountMnemonic";

export const Connect = ({
  onClose,
  onNext,
}: {
  onClose: () => void;
  onNext: (v: SwitchKeys) => void;
}) => {
  const {
    selectedExtension,
    selectedWallet,
    onSelectWallet,
    onSelectExtension,
    localTradingAccounts,
    onSelectTradingAccount,
    onImportFromFile,
    importFromFileStatus,
    onRemoveTradingAccountFromDevice,
    onSetTempTrading,
    tempTrading,
    mainProxiesAccounts,
    mainProxiesLoading,
    mainProxiesSuccess,
    onExportTradeAccount,
    onResetTempTrading,
    importFromMnemonicError,
    importFromMnemonicStatus,
    onImportFromMnemonic,
  } = useConnectWalletProvider();

  const sourceId = selectedExtension?.id;
  const hasAccount = useMemo(
    () => !!mainProxiesAccounts?.length,
    [mainProxiesAccounts?.length]
  );

  const { extensionsStatus } = useExtensions();
  const { connectExtensionAccounts, extensionAccounts } =
    useExtensionAccounts();

  const walletsFiltered = useMemo(
    () => extensionAccounts?.filter(({ source }) => source === sourceId),
    [extensionAccounts, sourceId]
  );

  const onRedirect = useCallback(
    () =>
      selectedWallet ? onNext(hasAccount ? "ExistingUser" : "NewUser") : null,
    [selectedWallet, onNext, hasAccount]
  );

  const availableOnDevice = useMemo(
    () =>
      localTradingAccounts?.some(
        (value) => value.address === tempTrading?.address
      ),
    [tempTrading?.address, localTradingAccounts]
  );

  return (
    <Multistep.Interactive resetOnUnmount>
      {(props) => (
        <>
          <Multistep.Trigger>
            <ConnectWallet
              key="ConnectWalletOrderbook"
              installedExtensions={extensionsStatus}
              onConnectProvider={(e) => onSelectExtension?.(e)}
              onBack={onClose}
              onConnectCallback={() => props?.onPage("Authorization", true)}
            >
              <ConnectTradingAccountCard
                tradingAccountLentgh={localTradingAccounts?.length ?? 0}
                onOpenInteraction={() =>
                  props?.onPage("ConnectTradingAccount", true)
                }
              />
            </ConnectWallet>
          </Multistep.Trigger>
          <Multistep.Content>
            <Authorization
              key="ConnectAuthorization"
              onAction={async () =>
                await connectExtensionAccounts(selectedExtension?.id as string)
              }
              extensionIcon={selectedExtension?.id as string}
              extensionName={selectedExtension?.title}
              onActionCallback={() => props?.onPage("ConnectFundingWallets")}
              onClose={props?.onReset}
            />
            <ExtensionAccounts
              key="ConnectFundingWallets"
              extensionAccounts={walletsFiltered}
              loading={!!mainProxiesLoading}
              success={!!mainProxiesSuccess}
              onSelectExtensionAccount={(e) => onSelectWallet?.(e)}
              onTryAgain={() =>
                selectedExtension && onSelectExtension?.(selectedExtension)
              }
              onRefresh={async () =>
                await connectExtensionAccounts(
                  selectedExtension?.title as string
                )
              }
              onClose={props?.onReset}
              onRedirect={onRedirect}
            />
            <UnlockBrowserAccount
              key="UnlockBrowserAccount"
              tempBrowserAccount={tempTrading}
              onClose={() => props?.onPage("ConnectTradingAccount")}
              onAction={(account, password) =>
                onExportTradeAccount({ account, password })
              }
              onResetTempBrowserAccount={onResetTempTrading}
            />
            <ConnectTradingAccount
              key="ConnectTradingAccount"
              accounts={localTradingAccounts}
              onSelect={(e) =>
                onSelectTradingAccount?.({ tradeAddress: e.address })
              }
              onTempBrowserAccount={(e) => onSetTempTrading?.(e)}
              onClose={() => props?.onReset()}
              onImport={() => props?.onPage("ImportTradingAccount")}
              onSelectCallback={onClose}
              onRemoveCallback={() => props?.onPage("RemoveTradingAccount")}
              onExportBrowserAccount={(account) =>
                onExportTradeAccount({ account })
              }
              onExportBrowserAccountCallback={() =>
                props?.onPage("UnlockBrowserAccount")
              }
              onImportMnemonic={() =>
                props?.onPage("ImportTradingAccountMnemonic")
              }
              enabledExtensionAccount
            />
            <ImportTradingAccount
              key="ImportTradingAccount"
              onImport={async (e) => {
                await onImportFromFile?.(e);
                onClose();
              }}
              onRedirect={() => props?.onPage("ConnectTradingAccount")}
              onClose={() => props?.onPage("ConnectTradingAccount")}
              loading={importFromFileStatus === "loading"}
            />
            <ImportTradingAccountMnemonic
              key="ImportTradingAccountMnemonic"
              onImport={async (e) => {
                await onImportFromMnemonic?.(e);
                onClose();
              }}
              onCancel={() => props?.onPage("ConnectTradingAccount")}
              loading={importFromMnemonicStatus === "loading"}
              errorMessage={
                (importFromMnemonicError as Error)?.message ??
                importFromMnemonicError
              }
            />
            <RemoveTradingAccount
              key="RemoveTradingAccount"
              tradingAccount={tempTrading as TradeAccount}
              onRemoveFromDevice={() =>
                onRemoveTradingAccountFromDevice?.(
                  tempTrading?.address as string
                )
              }
              selectedExtension={selectedExtension}
              availableOnDevice={availableOnDevice}
              onCancel={() => props?.onPage("ConnectTradingAccount")}
              enabledExtensionAccount
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};
