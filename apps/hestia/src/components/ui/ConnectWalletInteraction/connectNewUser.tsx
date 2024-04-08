"use client";

import { Multistep } from "@polkadex/ux";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { MINIMUM_PDEX_REQUIRED } from "@orderbook/core/constants";

import { NewUser } from "../ConnectWallet/newUser";
import { NewTradingAccount } from "../ConnectWallet/newTradingAccount";
import { InsufficientBalance } from "../ConnectWallet/insufficientBalance";

export const ConnectNewUser = ({
  onNext,
  onClose,
}: {
  onClose: () => void;
  onNext: (v: "Connect" | "TradingAccountSuccessfull") => void;
}) => {
  const {
    onResetWallet,
    onResetExtension,
    selectedWallet,
    onRegisterTradeAccount,
    registerStatus,
    registerError,
    selectedExtension,
    walletBalance,
  } = useConnectWalletProvider();

  const handleCloseInteraction = () => {
    onResetWallet?.();
    onResetExtension?.();
    onNext("Connect");
  };

  return (
    <Multistep.Interactive resetOnUnmount>
      {(props) => (
        <>
          <Multistep.Trigger>
            <NewUser
              onContinue={() =>
                props?.onPage(
                  (walletBalance ?? 0) >= MINIMUM_PDEX_REQUIRED
                    ? "NewTradingAccount"
                    : "InsufficientBalance",
                  true
                )
              }
              onReadMore={() =>
                window.open(
                  "https://docs.polkadex.trade/orderbookPolkadexFAQHowToTradeStep3",
                  "_blank",
                  "noopener, noreferrer"
                )
              }
              onBack={handleCloseInteraction}
              onClose={onClose}
            />
          </Multistep.Trigger>
          <Multistep.Content>
            <NewTradingAccount
              key="NewTradingAccount"
              onCreateAccount={async (e) =>
                await onRegisterTradeAccount?.({
                  ...e,
                  main: selectedWallet?.address as string,
                })
              }
              loading={registerStatus === "loading"}
              fundWalletPresent={!!Object.keys(selectedWallet ?? {})?.length}
              errorTitle="Error"
              errorMessage={(registerError as Error)?.message ?? registerError}
              selectedExtension={selectedExtension}
              onCreateCallback={() => onNext("TradingAccountSuccessfull")}
              onClose={() => props?.onChangeInteraction(false)}
            />
            <InsufficientBalance
              key="InsufficientBalance"
              balance={walletBalance}
              onClose={() => props?.onChangeInteraction(false)}
            />
          </Multistep.Content>
        </>
      )}
    </Multistep.Interactive>
  );
};