import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { Button, GenericMessage } from "@polkadex/ux";

export const ConnectAccountWrapper = ({
  funding = false,
}: {
  funding?: boolean;
}) => {
  const {
    onToogleConnectTrading,
    onToogleConnectExtension,
    onToogleFundWallet,
  } = useSettingsProvider();
  const { mainProxiesAccounts, selectedWallet } = useConnectWalletProvider();

  if (selectedWallet?.address && mainProxiesAccounts.length === 0) {
    return (
      <GenericMessage
        title="Please get some funds in your account to get started."
        illustration="ConnectAccount"
        className="bg-level-0"
      >
        <Button.Solid onClick={() => onToogleFundWallet()}>
          Fund Account
        </Button.Solid>
      </GenericMessage>
    );
  }

  return (
    <>
      {funding ? (
        <GenericMessage
          title="Please Connect your Funding account."
          illustration="ConnectAccount"
          className="bg-level-0"
        >
          <Button.Solid
            asChild className="bg-newBase hover:bg-newHover active:bg-newPressed cursor-pointer"
          // onClick={() => onToogleConnectExtension()}
          >
            <h2>Connect Funding Account</h2>
          </Button.Solid>
        </GenericMessage>
      ) : (
        <GenericMessage
          title="Please Connect your Trading account."
          illustration="ConnectAccount"
          className="bg-level-0"
        >
          <Button.Solid
            asChild
            className="bg-newBase hover:bg-newHover active:bg-newPressed cursor-pointer"
            // onClick={() => onToogleConnectTrading()}
          >
            <h2>Connect Trading Account</h2>
          </Button.Solid>
        </GenericMessage>
      )}
    </>
  );
};
