"use client";

import {
  Button,
  Copy,
  Dropdown,
  Interaction,
  Loading,
  Modal,
  Skeleton,
  Typography,
  truncateString,
} from "@polkadex/ux";
import {
  RiExternalLinkLine,
  RiFileCopyLine,
  RiGasStationLine,
} from "@remixicon/react";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useResizeObserver } from "usehooks-ts";
import Link from "next/link";
import {
  FeeAssetReserve,
  enabledFeatures,
  useFunds,
} from "@orderbook/core/index";
import { useTheaProvider } from "@orderbook/core/providers";

import { useBridge, usePool } from "@/hooks";
import {
  ErrorMessage,
  GenericHorizontalItem,
  Terms,
} from "@/components/ui/ReadyToUse";
const { payWithAnotherFee } = enabledFeatures;

interface Props {
  openFeeModal: boolean;
  setOpenFeeModal: Dispatch<SetStateAction<boolean>>;
  amount: number;
  onSuccess: () => void;
}
const initialValue = {
  id: "PDEX",
  name: "PDEX",
};
export const ConfirmTransaction = ({
  openFeeModal,
  setOpenFeeModal,
  amount,
  onSuccess,
}: Props) => {
  const [tokenFee, setTokenFee] = useState<FeeAssetReserve>(initialValue);

  const {
    selectedAssetBalance,
    sourceAccount,
    destinationAccount,
    transferConfig,
    transferConfigLoading,
    PDEXBalance,
    selectedAsset,
    isPolkadexChain,
    polkadexAssets,
  } = useTheaProvider();

  const sourceFee = transferConfig?.sourceFee?.amount ?? 0;

  const ref = useRef<HTMLButtonElement>(null);

  const { width = 0 } = useResizeObserver({
    ref,
    box: "border-box",
  });

  const showAutoSwap = useMemo(
    () => !isPolkadexChain && !PDEXBalance,
    [isPolkadexChain, PDEXBalance]
  );

  const selectedAssetId = useMemo(
    () =>
      polkadexAssets?.find((e) =>
        e.ticker.includes(selectedAsset?.ticker ?? "")
      )?.id,
    [polkadexAssets, selectedAsset?.ticker]
  );
  const isPDEX = useMemo(() => tokenFee?.id === "PDEX", [tokenFee?.id]);

  const {
    swapPrice = 0,
    swapLoading,
    poolReserves,
    poolReservesSuccess,
  } = usePool({
    asset: isPolkadexChain ? tokenFee?.id : selectedAssetId,
    amount: isPolkadexChain ? transferConfig?.sourceFee.amount : 1.5,
    enabled: isPolkadexChain ? !isPDEX : !PDEXBalance,
  });

  const { balances, loading: balancesLoading } = useFunds();

  const error = useMemo(
    () =>
      isPolkadexChain
        ? tokenFee?.id && isPDEX
          ? PDEXBalance < sourceFee
          : selectedAssetBalance < swapPrice
        : false,
    [
      isPDEX,
      selectedAssetBalance,
      swapPrice,
      tokenFee?.id,
      sourceFee,
      PDEXBalance,
      isPolkadexChain,
    ]
  );

  const shortSourceAddress = useMemo(
    () => truncateString(sourceAccount?.address ?? "", 4),
    [sourceAccount?.address]
  );

  const shortDestinationAddress = useMemo(
    () => truncateString(destinationAccount?.address ?? "", 4),
    [destinationAccount?.address]
  );
  const { mutateAsync, isLoading } = useBridge({ onSuccess });

  const disabled = useMemo(
    () => !!error || !tokenFee || isLoading,
    [error, tokenFee, isLoading]
  );

  useEffect(() => {
    return () => setTokenFee(initialValue);
  }, []);

  return (
    <Modal
      open={openFeeModal}
      onOpenChange={setOpenFeeModal}
      placement="center left"
      className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Modal.Content>
        <Loading.Spinner active={isLoading}>
          <Interaction className="w-full gap-2 md:min-w-[24rem] md:max-w-[24rem]">
            <Interaction.Title
              onClose={{ onClick: () => setOpenFeeModal(false) }}
            >
              Confirm Transaction
            </Interaction.Title>
            <Interaction.Content className="flex flex-col p-3">
              <div className="flex flex-col border-b border-primary">
                <GenericHorizontalItem label="Amount">
                  <Typography.Text>
                    {amount} {selectedAsset?.ticker}
                  </Typography.Text>
                </GenericHorizontalItem>
                <GenericHorizontalItem label="Sending wallet">
                  <Skeleton
                    loading={!sourceAccount}
                    className="min-h-4 max-w-24"
                  >
                    <Copy value={sourceAccount?.address ?? ""}>
                      <div className="flex items-center gap-1">
                        <RiFileCopyLine className="w-3 h-3 text-secondary" />
                        <Typography.Text>
                          {sourceAccount?.name} • {shortSourceAddress}
                        </Typography.Text>
                      </div>
                    </Copy>
                  </Skeleton>
                </GenericHorizontalItem>
                <GenericHorizontalItem label="Destination wallet">
                  <Copy value={destinationAccount?.address ?? ""}>
                    <div className="flex items-center gap-1">
                      <RiFileCopyLine className="w-3 h-3 text-secondary" />
                      <Typography.Text>
                        {destinationAccount?.name} • {shortDestinationAddress}
                      </Typography.Text>
                    </div>
                  </Copy>
                </GenericHorizontalItem>
                {showAutoSwap && (
                  <GenericHorizontalItem
                    label="Swap required"
                    tooltip="In order to bridge your funds and sign transactions on Polkadex, you must have at least 1.5 PDEX in your wallet. Your current balance is 0.00 PDEX.
                  A small part of your transfer will be auto-swapped to PDEX to meet this requirement"
                  >
                    <div className="flex items-center gap-1">
                      <RiGasStationLine className="w-3.5 h-3.5 text-secondary" />
                      <Skeleton loading={swapLoading} className="min-h-4 w-10">
                        <div className="flex items-center gap-1">
                          <Typography.Text>
                            {swapPrice.toFixed(4)}{" "}
                            {transferConfig?.sourceFee.ticker}
                          </Typography.Text>
                          <Typography.Text appearance="primary">
                            ≈
                          </Typography.Text>
                          <Skeleton
                            loading={transferConfigLoading}
                            className="min-h-4 max-w-24"
                          >
                            <Typography.Text appearance="primary">
                              1.5 PDEX
                            </Typography.Text>
                          </Skeleton>
                        </div>
                      </Skeleton>
                    </div>
                  </GenericHorizontalItem>
                )}
                {!!tokenFee && isPolkadexChain ? (
                  <GenericHorizontalItem
                    label="Estimated fee"
                    tooltip="Swap using Polkapool"
                  >
                    <div className="flex items-center gap-1">
                      <RiGasStationLine className="w-3.5 h-3.5 text-secondary" />
                      <Skeleton
                        loading={transferConfigLoading}
                        className="min-h-4 w-10"
                      >
                        <div className="flex items-center gap-1">
                          {!isPDEX && (
                            <Fragment>
                              <Typography.Text>
                                {swapPrice.toFixed(4)} {tokenFee?.name}
                              </Typography.Text>
                              <Typography.Text appearance="primary">
                                ≈
                              </Typography.Text>
                            </Fragment>
                          )}

                          <Typography.Text appearance="primary">
                            {sourceFee.toFixed(4)}{" "}
                            {transferConfig?.sourceFee.ticker}
                          </Typography.Text>
                        </div>
                      </Skeleton>
                    </div>
                  </GenericHorizontalItem>
                ) : (
                  <GenericHorizontalItem label="Estimated fee">
                    <div className="flex items-center gap-1">
                      <RiGasStationLine className="w-3.5 h-3.5 text-secondary" />
                      <Skeleton
                        loading={transferConfigLoading}
                        className="min-h-4 min-w-14"
                      >
                        <Typography.Text>
                          {sourceFee.toFixed(4)}{" "}
                          {transferConfig?.sourceFee.ticker}
                        </Typography.Text>
                      </Skeleton>
                    </div>
                  </GenericHorizontalItem>
                )}
                {isPolkadexChain && (
                  <Dropdown>
                    <Dropdown.Trigger
                      ref={ref}
                      className=" px-3 py-3 bg-level-1 border border-primary"
                      disabled={!payWithAnotherFee}
                    >
                      <div className="flex-1 w-full flex items-cneter justify-between gap-2">
                        <Typography.Text appearance="primary">
                          Pay fee with
                        </Typography.Text>
                        <Typography.Text>
                          {tokenFee ? tokenFee.name : "Select token"}
                        </Typography.Text>
                      </div>
                      <Dropdown.Icon />
                    </Dropdown.Trigger>
                    <Dropdown.Content
                      style={{
                        minWidth: width,
                        maxHeight: 250,
                        overflow: "auto",
                      }}
                      className="scrollbar-hide min-w-56"
                    >
                      {!poolReservesSuccess ? (
                        <div className="flex flex-col gap-2 p-4">
                          {new Array(3).fill("").map((_, i) => (
                            <Skeleton key={i} className="min-h-10" loading />
                          ))}
                        </div>
                      ) : (
                        <Fragment>
                          {poolReserves?.map((e) => {
                            const balance = balances?.find(
                              (bal) => bal.asset.id === e.id
                            );

                            const disableDropdown =
                              !payWithAnotherFee && e?.id !== "PDEX";

                            return (
                              <Dropdown.Item
                                key={e.id}
                                onSelect={() => setTokenFee(e)}
                                className="flex justify-between items-center gap-2"
                                disabled={!e.poolReserve || disableDropdown}
                              >
                                {e.poolReserve ? (
                                  <div className="flex items-center justify-between gap-1 w-full">
                                    <Typography.Text>{e.name}</Typography.Text>
                                    <div className="flex items-center gap-1">
                                      <Typography.Text appearance="primary">
                                        Balance:
                                      </Typography.Text>
                                      <Skeleton
                                        loading={balancesLoading}
                                        className="min-h-5"
                                      >
                                        <Typography.Text appearance="primary">
                                          {Number(
                                            balance?.onChainBalance
                                          ).toFixed(4)}
                                        </Typography.Text>
                                      </Skeleton>
                                    </div>
                                  </div>
                                ) : (
                                  <Fragment>
                                    <div className="flex items-center gap-1">
                                      <Typography.Text appearance="primary">
                                        {e.name}
                                      </Typography.Text>
                                      <Typography.Text appearance="primary">
                                        (Insufficient liquidity)
                                      </Typography.Text>
                                    </div>
                                    <Button.Solid
                                      size="xs"
                                      appearance="secondary"
                                    >
                                      <Link
                                        target="_blank"
                                        href="https://polkapool-test.netlify.app/pools"
                                      >
                                        Add liquidity
                                      </Link>
                                    </Button.Solid>
                                  </Fragment>
                                )}
                              </Dropdown.Item>
                            );
                          })}
                        </Fragment>
                      )}
                    </Dropdown.Content>
                  </Dropdown>
                )}

                {error && (
                  <ErrorMessage className="p-3">
                    Your balance is not enough to pay the fee.
                  </ErrorMessage>
                )}
              </div>
              <div className="flex flex-col gap-3 px-3 pt-4">
                <Link
                  href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
                  className="flex items-center gap-1"
                  target="_blank"
                >
                  <Typography.Text appearance="secondary" bold>
                    Terms and conditions
                  </Typography.Text>
                  <RiExternalLinkLine className="w-3 h-3 text-secondary" />
                </Link>
                <div className="overflow-hidden relative">
                  <div className=" max-h-24 overflow-auto pb-6">
                    <Terms />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-[45px] bg-gradient-to-t from-level-0 to-transparent" />
                </div>
              </div>
            </Interaction.Content>
            <Interaction.Footer>
              <Interaction.Action
                disabled={disabled}
                appearance={disabled ? "secondary" : "primary"}
                onClick={async () =>
                  await mutateAsync({
                    amount,
                    tokenFeeId: tokenFee?.id ?? "PDEX",
                  })
                }
              >
                Sign and Submit
              </Interaction.Action>
              <Interaction.Close onClick={() => setOpenFeeModal(false)}>
                Close
              </Interaction.Close>
            </Interaction.Footer>
          </Interaction>
        </Loading.Spinner>
      </Modal.Content>
    </Modal>
  );
};
