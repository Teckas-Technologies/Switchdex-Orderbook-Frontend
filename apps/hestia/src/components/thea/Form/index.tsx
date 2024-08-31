import {
  Button,
  Input,
  Token,
  TokenAppearance,
  Tooltip,
  Typography,
  ResponsiveCard,
  HoverInformation,
  AccountCombobox,
} from "@polkadex/ux";
import {
  RiArrowDownSLine,
  RiArrowLeftRightLine,
  RiInformationFill,
  RiLoader2Line,
  RiWalletLine,
} from "@remixicon/react";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useTheaProvider } from "@orderbook/core/providers";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import classNames from "classnames";
import { bridgeValidations } from "@orderbook/core/validations";
import { ChainType } from "@polkadex/thea";

import { SelectAsset } from "../selectAsset";
import { ConnectAccount } from "../connectAccount";
import { ConfirmTransaction } from "../confirmTransaction";

import { WalletCard } from "./walletCard";
import { SelectNetwork } from "./selectNetwork";

import { createQueryString, formatAmount } from "@/helpers";
import { useQueryPools } from "@/hooks";
const initialValues = {
  amount: "",
};
export const Form = () => {
  const [openAsset, setOpenAsset] = useState(false);
  const [openFeeModal, setOpenFeeModal] = useState(false);
  const [openSourceModal, setOpenSourceModal] = useState(false);

  const {
    sourceChain,
    onSelectSourceChain,
    destinationChain,
    onSelectDestinationChain,
    sourceAccount,
    setSourceAccount,
    destinationAccount,
    setDestinationAccount,
    selectedAsset,
    transferConfigLoading,
    sourceBalancesLoading,
    transferConfig,
    selectedAssetBalance,
    supportedSourceChains,
    supportedDestinationChains,
    onSwitchChain: onSwitch,
    selectedAssetIdPolkadex,
    isDestinationPolkadex,
    destinationPDEXBalance,
    isDestinationPDEXBalanceLoading,
  } = useTheaProvider();
  const { destinationFee, sourceFee, max, min } = transferConfig ?? {};
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const { pools, poolsLoading } = useQueryPools();

  const poolReserve = useMemo(() => {
    return pools?.find((p) => p.id === selectedAssetIdPolkadex);
  }, [pools, selectedAssetIdPolkadex]);

  const onSwitchChain = () => {
    onSwitch();
    resetForm();
  };

  const loading = useMemo(() => {
    if (!sourceAccount || !destinationAccount) return false;
    const isLoading = transferConfigLoading || sourceBalancesLoading;
    if (!isDestinationPolkadex) return isLoading;
    return isLoading || poolsLoading || isDestinationPDEXBalanceLoading;
  }, [
    sourceAccount,
    destinationAccount,
    poolsLoading,
    sourceBalancesLoading,
    transferConfigLoading,
    isDestinationPDEXBalanceLoading,
    isDestinationPolkadex,
  ]);

  const minAmount = useMemo(() => {
    const configMin = min?.amount || 0;
    const destFee =
      destinationFee?.ticker === selectedAsset?.ticker
        ? destinationFee?.amount || 0
        : 0;
    return Math.max(configMin, destFee);
  }, [
    destinationFee?.amount,
    destinationFee?.ticker,
    min?.amount,
    selectedAsset?.ticker,
  ]);

  const {
    handleSubmit,
    errors,
    getFieldProps,
    isValid,
    dirty,
    values,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: bridgeValidations(
      minAmount,
      max?.amount,
      destinationPDEXBalance,
      selectedAssetBalance,
      isDestinationPolkadex,
      poolReserve?.reserve || 0
    ),
    onSubmit: () => setOpenFeeModal(true),
  });
  const disabled = useMemo(
    () =>
      !selectedAsset ||
      !sourceAccount ||
      !sourceChain ||
      !destinationAccount ||
      !destinationChain ||
      !(isValid && dirty),
    [
      selectedAsset,
      sourceAccount,
      sourceChain,
      destinationAccount,
      destinationChain,
      dirty,
      isValid,
    ]
  );

  const onChangeMax = () => {
    const formattedAmount = formatAmount(max?.amount ?? 0);
    setFieldValue("amount", formattedAmount);
  };

  const balanceAmount = useMemo(
    () => formatAmount(selectedAssetBalance),
    [selectedAssetBalance]
  );

  const [
    destinationFeeAmount,
    destinationFeeTicker,
    sourceFeeAmount,
    sourceFeeTicker,
  ] = useMemo(() => {
    const destValue = destinationFee?.amount;
    const sourceValue = sourceFee?.amount;

    return [
      destValue ? `~ ${formatAmount(destValue)}` : "Ø",
      destValue ? destinationFee?.ticker : "",
      sourceValue ? `~ ${formatAmount(sourceValue)}` : "Ø",
      sourceValue ? sourceFee?.ticker : "",
    ];
  }, [
    destinationFee?.amount,
    destinationFee?.ticker,
    sourceFee?.amount,
    sourceFee?.ticker,
  ]);

  useEffect(() => {
    const data = [
      { name: "from", value: sourceChain?.name },
      { name: "to", value: destinationChain?.name },
      { name: "asset", value: selectedAsset?.ticker },
    ];
    createQueryString({
      data,
      pathname,
      searchParams,
      push,
    });
  }, [
    destinationChain?.name,
    pathname,
    push,
    searchParams,
    selectedAsset?.ticker,
    sourceChain?.name,
  ]);

  const [isFirstDropdownOpen, setIsFirstDropdownOpen] = useState(false);
  const [firstSelectedItem, setFirstSelectedItem] = useState({
    text: "Switchdex",
    imgSrc: "img/dark_switchdex_logo.jpg",
  });

  const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false);
  const [secondSelectedItem, setSecondSelectedItem] = useState({
    text: "MYID",
    imgSrc: "img/myid.png",
  });

  const toggleFirstDropdown = () => {
    setIsFirstDropdownOpen(!isFirstDropdownOpen);
    setIsSecondDropdownOpen(false);
  };

  const toggleSecondDropdown = () => {
    setIsSecondDropdownOpen(!isSecondDropdownOpen);
    setIsFirstDropdownOpen(false);
  };

  const handleFirstSelectItem = (item) => {
    setFirstSelectedItem(item);
    setIsFirstDropdownOpen(false);
  };

  const handleSecondSelectItem = (item) => {
    setSecondSelectedItem(item);
    setIsSecondDropdownOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event:any) => {
    if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
      setIsFirstDropdownOpen(false);
      setIsSecondDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Fragment>
      <ConfirmTransaction
        openFeeModal={openFeeModal}
        setOpenFeeModal={setOpenFeeModal}
        amount={Number(values.amount)}
        onSuccess={() => {
          resetForm();
          setOpenFeeModal(false);
        }}
      />
      <SelectAsset open={openAsset} onOpenChange={setOpenAsset} />
      <ConnectAccount
        open={openSourceModal}
        onOpenChange={setOpenSourceModal}
        setAccount={setSourceAccount}
        evm={sourceChain?.type !== ChainType.Substrate}
      />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 flex-1 max-w-[900px] mx-auto py-8 w-full px-2"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Typography.Heading>Networks</Typography.Heading>
            <div className="flex max-lg:flex-col gap-2">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2">
                  <Typography.Text appearance="primary">From</Typography.Text>

                  <div className="relative">
                    <button
                      id="dropdownUsersButton"
                      onClick={toggleFirstDropdown}
                      className="text-white w-full bg-transperent hover:bg-level-1 border border-secondary font-bold py-3 text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
                      type="button"
                    >
                      <div className="asset flex items-center gap-2">
                        <img
                          src={firstSelectedItem.imgSrc}
                          className={`${firstSelectedItem.text !== "Ethereum" ? "object-cover" : "object-contain"} h-8 w-8 rounded-full`}
                          alt={firstSelectedItem.text}
                        />
                        <h2 className="text-xl">{firstSelectedItem.text}</h2>
                      </div>
                      <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                      </svg>
                    </button>

                    {isFirstDropdownOpen && (
                      <div id="dropdownUsers" className="z-10 bg-level-0 absolute w-full border border-secondary rounded-lg shadow w-60 dark:bg-gray-700" ref={dropdownRef}>
                        <ul className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                          <li>
                            <span
                              onClick={() => handleFirstSelectItem({ text: 'MYID', imgSrc: 'img/myid.png' })}
                              className="text-white w-full bg-transperent hover:bg-level-1 border border-secondary font-bold py-3 text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 cursor-pointer"
                            >
                              <img className="w-8 h-8 object-cover me-2 rounded-full" src="img/myid.png" alt="MYID logo" />
                              <h2>MYID</h2>
                            </span>
                          </li>
                          <li>
                            <span
                              onClick={() => handleFirstSelectItem({ text: 'Switchdex', imgSrc: 'img/dark_switchdex_logo.jpg' })}
                              className="text-white w-full bg-transperent hover:bg-level-1 border border-secondary font-bold py-3 text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 cursor-pointer"
                            >
                              <img className="w-8 h-8 object-cover me-2 rounded-full" src="img/dark_switchdex_logo.jpg" alt="Switchdex logo" />
                              <h2>Switchdex</h2>
                            </span>
                          </li>
                          <li>
                            <span
                              onClick={() => handleFirstSelectItem({ text: 'Bitcoin', imgSrc: 'img/btc.png' })}
                              className="text-white w-full bg-transperent hover:bg-level-1 border border-secondary font-bold py-3 text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 cursor-pointer"
                            >
                              <img className="w-8 h-8 object-cover me-2 rounded-full" src="img/btc.png" alt="Bitcoin logo" />
                              <h2>Bitcoin</h2>
                            </span>
                          </li>
                          <li>
                            <span
                              onClick={() => handleFirstSelectItem({ text: 'Ethereum', imgSrc: 'img/eth.png' })}
                              className="text-white w-full bg-transperent hover:bg-level-1 border border-secondary font-bold py-3 text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 cursor-pointer"
                            >
                              <img className="w-7 h-8 object-contain me-2 rounded-full" src="img/eth.png" alt="Ethereum logo" />
                              <h2 className="ml-1">Ethereum</h2>
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>


                  {/* <SelectNetwork
                    // name={sourceChain?.name}
                    name="MYID"
                    icon={sourceChain?.logo}
                  >
                    {supportedSourceChains.map((e) => {
                      return (
                        <SelectNetwork.Card
                          key={e.genesis}
                          icon={e.logo}
                          value={e.name}
                          onSelect={() => {
                            onSelectSourceChain(e);
                            if (e.type !== ChainType.Substrate)
                              setOpenSourceModal(true);
                          }}
                        />
                      );
                    })}
                  </SelectNetwork> */}
                </div>
                {sourceAccount ? (
                  <WalletCard
                    name={sourceAccount.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenSourceModal(true);
                    }}
                  >
                    {sourceAccount.address}
                  </WalletCard>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <RiWalletLine className="w-3.5 h-3.5 text-actionInput" />
                      <Typography.Text>Account not present</Typography.Text>
                    </div>
                    <Button.Solid
                      className="bg-newBase"
                      appearance="secondary"
                      size="xs"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   e.stopPropagation();
                      //   setOpenSourceModal(true);
                      // }}
                    >
                      Connect wallet
                    </Button.Solid>
                  </div>
                )}
              </div>
              <Button.Icon
                type="button"
                variant="outline"
                className="lg:mt-9 h-10 w-10 p-3 max-lg:self-center max-lg:rotate-90"
                onClick={onSwitchChain}
              >
                <RiArrowLeftRightLine className="w-full h-full" />
              </Button.Icon>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2">
                  <Typography.Text appearance="primary">To</Typography.Text>
                  <div className="relative">
                    <button
                      id="dropdownUsersButton"
                      onClick={toggleSecondDropdown}
                      className="text-white w-full bg-transperent hover:bg-level-1 border border-secondary font-bold py-3 text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
                      type="button"
                    >
                      <div className="asset flex items-center gap-2">
                        <img
                          src={secondSelectedItem.imgSrc}
                          className={`${secondSelectedItem.text !== "Ethereum" ? "object-cover" : "object-contain"} h-8 w-8 rounded-full`}
                          alt={secondSelectedItem.text}
                        />
                        <h2 className="text-xl">{secondSelectedItem.text}</h2>
                      </div>
                      <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                      </svg>
                    </button>

                    {isSecondDropdownOpen && (
                      <div id="dropdownUsers" className="z-10 bg-level-0 absolute w-full border border-secondary rounded-lg shadow w-60 dark:bg-gray-700"  ref={dropdownRef}>
                        <ul className="h-auto py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                          <li>
                            <span
                              onClick={() => handleSecondSelectItem({ text: 'MYID', imgSrc: 'img/myid.png' })}
                              className="text-white w-full bg-transperent hover:bg-level-1 border border-secondary font-bold py-3 text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 cursor-pointer"
                            >
                              <img className="w-8 h-8 object-cover me-2 rounded-full" src="img/myid.png" alt="Bitcoin logo" />
                              <h2>MYID</h2>
                            </span>
                          </li>
                          {/* <li>
                            <span
                              onClick={() => handleSecondSelectItem({ text: 'Switchdex', imgSrc: 'img/dark_switchdex_logo.jpg' })}
                              className="text-white w-full bg-transperent hover:bg-level-1 border border-secondary font-bold py-3 text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 cursor-pointer"
                            >
                              <img className="w-7 h-8 object-contain me-2 rounded-full" src="img/dark_switchdex_logo.jpg" alt="Ethereum logo" />
                              <h2 className="ml-1">Switchdex</h2>
                            </span>
                          </li> */}
                        </ul>
                      </div>
                    )}
                  </div>
                  {/* <SelectNetwork
                    name={destinationChain?.name}
                    icon={destinationChain?.logo}
                  >
                    {supportedDestinationChains.map((e) => {
                      return (
                        <SelectNetwork.Card
                          key={e.genesis}
                          icon={e.logo}
                          value={e.name}
                          onSelect={() => onSelectDestinationChain(e)}
                        />
                      );
                    })}
                  </SelectNetwork> */}
                </div>
                <AccountCombobox
                  account={destinationAccount}
                  setAccount={(e) => e && setDestinationAccount(e)}
                  evm={destinationChain?.type !== ChainType.Substrate}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography.Heading>Asset</Typography.Heading>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <Typography.Text appearance="primary">Amount</Typography.Text>
                <HoverInformation>
                  <HoverInformation.Trigger
                    loading={sourceBalancesLoading}
                    className="min-w-20"
                  >
                    <RiInformationFill className="w-3 h-3 text-actionInput" />
                    <Typography.Text size="xs" appearance="primary">
                      {/* Available: {balanceAmount} {selectedAsset?.ticker} */}
                      Available: 0 MYID
                    </Typography.Text>
                  </HoverInformation.Trigger>
                  <HoverInformation.Content
                    className={classNames(!loading && "hidden")}
                  >
                    <ResponsiveCard label="Source fee" loading={loading}>
                      {sourceFeeAmount} {sourceFeeTicker}
                    </ResponsiveCard>
                    <ResponsiveCard label="Destination fee" loading={loading}>
                      {destinationFeeAmount} {destinationFeeTicker}
                    </ResponsiveCard>
                    <ResponsiveCard label="Available" loading={loading}>
                      {/* {balanceAmount} {selectedAsset?.ticker} */}
                      0 MYID
                    </ResponsiveCard>
                  </HoverInformation.Content>
                </HoverInformation>
              </div>
              <div className="flex item-center border border-primary rounded-sm">
                <Tooltip open={!!errors.amount}>
                  <Tooltip.Trigger asChild>
                    <div
                      className={classNames(
                        "w-full pr-4",
                        errors.amount && "border-danger-base border"
                      )}
                    >
                      <Input.Vertical
                        type="text"
                        autoComplete="off"
                        placeholder="Enter an amount"
                        {...getFieldProps("amount")}
                        className="max-sm:focus:text-[16px] w-full pl-4 py-4"
                      >
                        {sourceAccount && max?.amount && !loading && (
                          <Input.Action
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              onChangeMax();
                            }}
                          >
                            MAX
                          </Input.Action>
                        )}
                      </Input.Vertical>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content className="bg-level-5 z-[2] p-1">
                    {errors.amount}
                  </Tooltip.Content>
                </Tooltip>
                <Button.Outline
                  type="button"
                  appearance="secondary"
                  className="gap-1 px-2 justify-between h-full"
                  onClick={() => setOpenAsset(true)}
                  disabled={!sourceChain || !destinationChain}
                >
                  <div className="flex items-center gap-2">
                    {selectedAsset ? (
                      <img src="img/myid.png" className="h-8 w-8" alt="" />
                      // <Token
                      //   name={selectedAsset.ticker}
                      //   size="md"
                      //   appearance={selectedAsset.ticker as TokenAppearance}
                      //   className="rounded-full border border-primary"
                      // />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-level-5" />
                    )}

                    <Typography.Text size="md">
                      {/* {selectedAsset ? selectedAsset.ticker : "Select token"} */}
                      <h2>MYID</h2>
                    </Typography.Text>
                  </div>
                  <RiArrowDownSLine className="w-4 h-4" />
                </Button.Outline>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <Button.Solid
            className="w-full py-5 flex items-center gap-1 opacity-60"
            size="md"
            disabled
          >
            <RiLoader2Line className="w-5 h-5 animate-spin" />
            Connecting...
          </Button.Solid>
        ) : (
          <Button.Solid className="w-full py-5" size="md" disabled={disabled}>
            Bridge
          </Button.Solid>
        )}
      </form>
    </Fragment>
  );
};
