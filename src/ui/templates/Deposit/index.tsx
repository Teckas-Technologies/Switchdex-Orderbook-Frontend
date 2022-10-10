import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { intlFormat } from "date-fns";

import * as S from "./styles";

import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import {
  Button,
  InputLine,
  Table,
  Tooltip,
  TooltipContent,
  TooltipHeader,
  EmptyData,
  Loading,
} from "@polkadex/orderbook-ui/molecules";
import { withdrawValidations } from "@polkadex/orderbook/validations";
import { Decimal, Icons, Tokens } from "@polkadex/orderbook-ui/atoms";
import {
  depositsFetch,
  selectCurrentMainAccount,
  selectDepositsLoading,
  Transaction,
} from "@polkadex/orderbook-modules";
import { useHistory, useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  isAssetPDEX,
  selectAllAssets,
  selectGetAsset,
} from "@polkadex/orderbook/modules/public/assets";
import { POLKADEX_ASSET } from "@polkadex/web-constants";
import { useOnChainBalance } from "@polkadex/orderbook/hooks/useOnChainBalance";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";

export const DepositTemplate = () => {
  const [state, setState] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(POLKADEX_ASSET);

  const currMainAcc = useReduxSelector(selectCurrentMainAccount);
  const assets = useReduxSelector(selectAllAssets);
  const getAsset = useReduxSelector(selectGetAsset);
  const loading = useReduxSelector(selectDepositsLoading);

  const dispatch = useDispatch();
  const router = useRouter();
  const { deposits } = useHistory();

  const { onChainBalance, onChainBalanceLoading } = useOnChainBalance(selectedAsset?.asset_id);
  const routedAsset = router.query.id as string;
  const shortAddress =
    currMainAcc?.address?.slice(0, 15) +
    "..." +
    currMainAcc?.address?.slice(currMainAcc?.address?.length - 15);

  useEffect(() => {
    const initialAsset = assets.find(
      (asset) => asset.name.includes(routedAsset) || asset.symbol.includes(routedAsset)
    );
    if (initialAsset) {
      setSelectedAsset(initialAsset);
    }
  }, [assets, routedAsset]);

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      amount: 0.0,
      asset: selectedAsset,
    },
    // TODO: re-add the validations
    validationSchema: withdrawValidations,
    onSubmit: (values) => {
      const asset = isAssetPDEX(selectedAsset.asset_id)
        ? { polkadex: null }
        : { asset: selectedAsset.asset_id };
      dispatch(
        depositsFetch({
          asset: asset,
          amount: values.amount,
          mainAccount: currMainAcc,
        })
      );
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
        <title>Deposit | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu isWallet handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Title type="button" onClick={() => router.back()}>
            <div>
              <Icons.SingleArrowLeft />
            </div>
            Overview
          </S.Title>
          <S.Container>
            <S.Column>
              <div>
                <h1>Deposit Crypto</h1>
                <p>
                  Polkadex is a fully non-custodial platform, so the assets in your wallet are
                  always under your control.
                </p>
              </div>
            </S.Column>
            <S.Box>
              <S.Form>
                <Loading
                  message="Block finalization will take a few mins."
                  isVisible={loading}>
                  <S.SelectAccount>
                    <div>
                      <Icons.Avatar />
                    </div>
                    <div>
                      <strong>{currMainAcc?.name || "Wallet not selected"}</strong>
                      <span>{shortAddress}</span>
                    </div>
                  </S.SelectAccount>
                  <form onSubmit={handleSubmit}>
                    <S.SelectInput>
                      <span>Select a coin</span>
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
                            {assets.map((asset) => (
                              <Dropdown.Item
                                key={asset.asset_id}
                                onAction={() => setSelectedAsset(asset)}>
                                {asset.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </S.SelectInputContainer>
                      <S.Available>
                        Available{" "}
                        <strong>
                          {onChainBalanceLoading ? "Loading..." : onChainBalance}
                        </strong>
                      </S.Available>
                    </S.SelectInput>
                    <InputLine
                      name="amount"
                      label="Token Amount"
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
                      disabled={!(isValid && dirty) || loading}
                      isFull
                      isLoading={loading}>
                      Deposit
                    </Button>
                  </form>
                </Loading>
              </S.Form>

              <S.History>
                <h2>History</h2>
                {deposits.length ? (
                  <S.HistoryContent>
                    <Table
                      aria-label="Polkadex Deposit History Table"
                      style={{ width: "100%" }}>
                      <Table.Header fill="none">
                        <Table.Column>
                          <S.HeaderColumn style={{ paddingLeft: 10 }}>Name</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Date</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Status</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Amount</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Fee</S.HeaderColumn>
                        </Table.Column>
                      </Table.Header>
                      <Table.Body striped>
                        {deposits.map((item, i) => (
                          <Table.Row key={i}>
                            <Table.Cell>
                              <S.CellName>
                                <span>{getAsset(item.asset)?.symbol}</span>
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