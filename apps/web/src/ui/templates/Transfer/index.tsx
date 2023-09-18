import Head from "next/head";
import {
  AssetsInteraction,
  Header,
  Menu,
  DepositHistory,
  TransferFormDeposit,
  TransferFormWithdraw,
  WithdrawHistory,
} from "@polkadex/orderbook-ui/organisms";
import { Footer, Loading, Switch } from "@polkadex/orderbook-ui/molecules";
import { useTranslation } from "react-i18next";

import * as S from "./styles";
import { useTransfer } from "./useTransfer";

export const TransferTemplate = () => {
  const { t } = useTranslation("transfer");

  const {
    loading,
    assetsInteraction,
    onAssetsInteraction,
    onChangeAsset,
    selectedAsset,
    onChangeIsDeposit,
    otherPolkadexAccount,
    onChangeOtherPolkadexAccount,
    otherPolkadexAccountSelected,
  } = useTransfer();

  return (
    <>
      <AssetsInteraction
        open={assetsInteraction}
        selectedAssetId={selectedAsset?.assetId}
        onClose={onAssetsInteraction}
        onChangeAsset={onChangeAsset}
      />
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </Head>
      <S.Main>
        <Header />
        <S.Flex>
          <Menu open />
          <S.Wrapper>
            <S.ContainerMain>
              <S.Header>
                <h1>Transfer</h1>
                <h2>
                  Simply dummy text of the printing and typesetting industry.
                </h2>
              </S.Header>
              <S.Content>
                <Loading
                  style={{ maxWidth: "100rem" }}
                  isVisible={loading}
                  hasBg={false}
                  message=""
                  spinner="Keyboard"
                >
                  <S.Form>
                    <S.Title>
                      <Switch
                        isActive={otherPolkadexAccount}
                        onChange={onChangeOtherPolkadexAccount}
                      />
                      <span>Transfer for other Polkadex accounts</span>
                    </S.Title>
                    <S.Container>
                      {otherPolkadexAccountSelected ? (
                        <TransferFormDeposit
                          otherPolkadexAccount={otherPolkadexAccount}
                          onTransferInteraction={onChangeIsDeposit}
                          onOpenAssets={onAssetsInteraction}
                          selectedAsset={selectedAsset}
                        />
                      ) : (
                        <TransferFormWithdraw
                          onTransferInteraction={onChangeIsDeposit}
                          onOpenAssets={onAssetsInteraction}
                          selectedAsset={selectedAsset}
                        />
                      )}
                    </S.Container>
                  </S.Form>
                </Loading>

                <S.History>
                  {otherPolkadexAccountSelected ? (
                    <DepositHistory selectedAsset={selectedAsset} />
                  ) : (
                    <WithdrawHistory selectedAsset={selectedAsset} />
                  )}
                </S.History>
              </S.Content>
            </S.ContainerMain>
            <Footer />
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};
