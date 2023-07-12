import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { intlFormat } from "date-fns";
import { useTranslation } from "react-i18next";

import * as S from "./styles";

import {
  Dropdown,
  Button,
  InputLine,
  Table,
  Tooltip,
  TooltipContent,
  TooltipHeader,
  EmptyData,
  Loading,
} from "@polkadex/orderbook-ui/molecules";
import { getDigitsAfterDecimal } from "@polkadex/orderbook/helpers";
import { withdrawValidations } from "@polkadex/orderbook/validations";
import { Decimal, Icons, Tokens } from "@polkadex/orderbook-ui/atoms";
import {
  MAX_DIGITS_AFTER_DECIMAL,
  POLKADEX_ASSET,
  ErrorMessages,
} from "@polkadex/web-constants";
import { useOnChainBalance } from "@polkadex/orderbook/hooks/useOnChainBalance";
import { Header, Menu } from "@polkadex/orderbook-ui/organisms";
import { useDepositProvider } from "@polkadex/orderbook/providers/user/depositProvider/useDepositProvider";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { useTransactionsProvider } from "@polkadex/orderbook/providers/user/transactionsProvider/useTransactionProvider";
import { Transaction } from "@polkadex/orderbook/providers/user/transactionsProvider";

export const DepositTemplate = () => {
  const { t } = useTranslation("deposit");
  const { t: tc } = useTranslation("common");

  const [selectedAsset, setSelectedAsset] = useState(POLKADEX_ASSET);
  const { selectedAccount: currentAccount } = useProfile();

  const { list, selectGetAsset } = useAssetsProvider();

  const extensionWalletState = useExtensionWallet();

  const currMainAcc =
    currentAccount.mainAddress &&
    extensionWalletState.allAccounts?.find(
      ({ account }) =>
        account?.address?.toLowerCase() === currentAccount.mainAddress?.toLowerCase()
    );
  const { loading, onFetchDeposit } = useDepositProvider();

  const router = useRouter();
  const { deposits } = useTransactionsProvider();

  const { onChainBalance, onChainBalanceLoading } = useOnChainBalance(selectedAsset?.assetId);

  const routedAsset = router.query.id as string;
  const shortAddress =
    currMainAcc?.account?.address?.slice(0, 15) +
    "..." +
    currMainAcc?.account?.address?.slice(currMainAcc?.account?.address?.length - 15);

  useEffect(() => {
    const initialAsset = list.find(
      (asset) => asset.name.includes(routedAsset) || asset.symbol.includes(routedAsset)
    );
    if (initialAsset) {
      setSelectedAsset(initialAsset);
    }
  }, [list, routedAsset]);

  // A custom validation function. This must return an object
  // which keys are symmetrical to our values/initialValues
  const validate = (values) => {
    const errors = {} as any;
    if (values?.amount?.includes("e") || values?.amount?.includes("o")) {
      errors.amount = ErrorMessages.CHECK_VALID_AMOUNT;
    }
    if (/\s/.test(String(values.amount))) {
      errors.amount = ErrorMessages.WHITESPACE_NOT_ALLOWED;
    }
    const balanceAfterDeposit = Number(onChainBalance) - Number(values.amount);
    if (isAssetPDEX(selectedAsset?.assetId) && balanceAfterDeposit < 1) {
      errors.amount = ErrorMessages.REMAINING_BALANCE;
    }

    if (+values.amount > onChainBalance) {
      errors.amount = ErrorMessages.CHECK_BALANCE;
    }

    if (getDigitsAfterDecimal(values.amount) > MAX_DIGITS_AFTER_DECIMAL)
      errors.amount = ErrorMessages.MAX_EIGHT_DIGIT_AFTER_DECIMAL;

    return errors;
  };

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty, validateForm } =
    useFormik({
      initialValues: {
        amount: 0.0,
        asset: selectedAsset,
      },
      // TODO: re-add the validations
      validationSchema: withdrawValidations(onChainBalance),
      validate,
      onSubmit: (values) => {
        const asset = isAssetPDEX(selectedAsset.assetId)
          ? { polkadex: null }
          : { asset: selectedAsset.assetId };

        onFetchDeposit({
          asset: asset,
          amount: values.amount,
          mainAccount: currMainAcc,
        });
      },
    });

  const getColor = (status: Transaction["status"]) => {
    switch (status) {
      case "CONFIRMED":
        return "green";
      case "PENDING":
        return "orange";
      default:
        return "primary";
    }
  };

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Header />
        <S.Flex>
          <Menu />
          <S.Wrapper>
            <S.Title type="button" onClick={() => router.back()}>
              <div>
                <Icons.SingleArrowLeft />
              </div>
              {t("overview")}
            </S.Title>
            <S.Container>
              <S.Column>
                <div>
                  <h1>{t("heading")}</h1>
                  <p>{t("description")}</p>
                </div>
              </S.Column>
              <S.Box>
                <S.Form>
                  <Loading message={tc("blockFinalizationMessage")} isVisible={loading}>
                    <S.SelectAccount>
                      <div>
                        <Icons.Avatar />
                      </div>
                      <div>
                        <strong>
                          {currMainAcc?.account?.meta?.name || t("walletNotPresent")}
                        </strong>
                        <span>{shortAddress}</span>
                      </div>
                    </S.SelectAccount>
                    <form onSubmit={handleSubmit}>
                      <S.SelectInput>
                        <span>{t("selectCoin")}</span>
                        <S.SelectInputContainer>
                          <Dropdown>
                            <Dropdown.Trigger>
                              <S.DropdownHeader>
                                <div>
                                  <span>
                                    <Tokens.PDEX />
                                  </span>
                                  {selectedAsset?.name}
                                </div>
                                <div>
                                  <span>
                                    <Icons.ArrowBottom />
                                  </span>
                                </div>
                              </S.DropdownHeader>
                            </Dropdown.Trigger>
                            <Dropdown.Menu fill="secondaryBackgroundSolid">
                              {list.map((asset) => (
                                <Dropdown.Item
                                  key={asset.assetId}
                                  onAction={() => setSelectedAsset(asset)}>
                                  {asset.name}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </S.SelectInputContainer>
                        <S.Available>
                          {tc("available")}{" "}
                          <strong>
                            {onChainBalanceLoading ? t("loading") : onChainBalance}
                          </strong>
                        </S.Available>
                      </S.SelectInput>
                      <InputLine
                        name="amount"
                        label={t("inputLabel")}
                        placeholder="0.00"
                        error={errors.amount && touched.amount && errors.amount}
                        {...getFieldProps("amount")}
                      />
                      <Button
                        type="submit"
                        size="extraLarge"
                        background="green"
                        hoverColor="green"
                        color="white"
                        disabled={!(isValid && dirty) || loading || !currMainAcc}
                        isFull
                        isLoading={loading}>
                        {currMainAcc ? tc("deposit") : t("accountNotFound")}
                      </Button>
                    </form>
                  </Loading>
                </S.Form>

                <S.History>
                  <h2>{t("history")}</h2>
                  {deposits.length ? (
                    <S.HistoryContent>
                      <Table
                        aria-label="Polkadex Deposit History Table"
                        style={{ width: "100%" }}>
                        <Table.Header fill="none">
                          <Table.Column>
                            <S.HeaderColumn style={{ paddingLeft: 10 }}>
                              {t("table.name")}
                            </S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>{t("table.date")}</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>{t("table.status")}</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>{t("table.amount")}</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>{t("table.fee")}</S.HeaderColumn>
                          </Table.Column>
                        </Table.Header>
                        <Table.Body striped border="squared">
                          {deposits.map((item, i) => (
                            <Table.Row key={i}>
                              <Table.Cell>
                                <S.CellName>
                                  <span>{selectGetAsset(item.asset)?.symbol}</span>
                                </S.CellName>
                              </Table.Cell>
                              <Table.Cell>
                                <S.Cell>
                                  <span>
                                    {intlFormat(
                                      new Date(item.time),
                                      {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      },
                                      { locale: "EN" }
                                    )}
                                  </span>
                                </S.Cell>
                              </Table.Cell>
                              <Table.Cell>
                                <S.Cell>
                                  <S.Status color={getColor(item.status)}>
                                    {item.status}
                                  </S.Status>
                                </S.Cell>
                              </Table.Cell>
                              <Table.Cell>
                                <S.Cellamount>
                                  <Decimal fixed={5}>{item.amount}</Decimal>
                                </S.Cellamount>
                              </Table.Cell>
                              <Table.Cell>
                                <S.Cell>
                                  <Decimal fixed={5}>{item.fee}</Decimal>
                                </S.Cell>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </S.HistoryContent>
                  ) : (
                    <EmptyData />
                  )}
                </S.History>
              </S.Box>
            </S.Container>
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};

const Copy = ({ copyData }) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy to clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyData);
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.Cell>
      <Tooltip>
        <TooltipHeader>
          <button type="button" onClick={handleCopy} onMouseOut={handleOnMouseOut}>
            <Icons.Copy />
          </button>
          {copyData}
        </TooltipHeader>
        <TooltipContent>
          <p ref={buttonRef}>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </S.Cell>
  );
};
