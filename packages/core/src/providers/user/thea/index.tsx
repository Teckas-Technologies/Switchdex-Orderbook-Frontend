"use client";

import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getChainConnector,
  Thea,
  Chain,
  Asset,
  AssetAmount,
  BaseChainAdapter,
  TransferConfig,
} from "@polkadex/thea";
import { defaultConfig } from "@orderbook/core/config";
import { ExtensionAccount } from "@polkadex/react-providers";
import {
  Transactions,
  networks,
  useTheaBalances,
  useTheaConfig,
  useTheaTransactions,
} from "@orderbook/core/hooks";
import { isIdentical } from "@orderbook/core/helpers";
import { EXISTENTIAL } from "@orderbook/core/constants";

import { useConnectWalletProvider } from "../connectWalletProvider";
const {
  disabledTheaChains,
  defaultTheaDestinationChain,
  defaultTheaSourceChain,
} = defaultConfig;
export type GenericStatus = "error" | "idle" | "success" | "loading";
export type CustomAccount = { name: string; address: string };
export { useTheaProvider } from "./useThea";
export const TheaProvider = ({
  initialAssetTicker,
  initialSourceName,
  initialDestinationName,
  children,
}: PropsWithChildren<{
  initialAssetTicker: string | null;
  initialSourceName: string | null;
  initialDestinationName: string | null;
}>) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [sourceChain, setSourceChain] = useState<Chain | null>(null);
  const [destinationChain, setDestinationChain] = useState<Chain | null>(null);
  const [sourceAccount, setSourceAccount] = useState<ExtensionAccount>();
  const [destinationAccount, setDestinationAccount] = useState<CustomAccount>();
  const { selectedWallet } = useConnectWalletProvider();

  const { getAllChains } = useMemo(() => new Thea(), []);

  const sourceAccountSelected = useMemo(
    () => sourceAccount ?? selectedWallet,
    [sourceAccount, selectedWallet]
  );

  const destinationAccountSelected = useMemo(
    () => destinationAccount ?? selectedWallet,
    [destinationAccount, selectedWallet]
  );

  const chains = useMemo(
    () =>
      getAllChains()?.filter((e) => !disabledTheaChains.includes(e.genesis)),
    [getAllChains]
  );

  const sourceConnector = useMemo(
    () => sourceChain && getChainConnector(sourceChain.genesis),
    [sourceChain]
  );

  const destinationConnector = useMemo(
    () => destinationChain && getChainConnector(destinationChain.genesis),
    [destinationChain]
  );

  const polkadexConnector = useMemo(
    () => destinationChain && getChainConnector(networks[0]),
    [destinationChain]
  );

  const sourceAssets = useMemo(
    () => (sourceConnector ? sourceConnector.getSupportedAssets() : []),
    [sourceConnector]
  );

  const polkadexAssets = useMemo(
    () => (polkadexConnector ? polkadexConnector.getSupportedAssets() : []),
    [polkadexConnector]
  );

  const destinationAssets = useMemo(
    () =>
      destinationConnector ? destinationConnector.getSupportedAssets() : [],
    [destinationConnector]
  );

  const supportedAssets = useMemo(
    () =>
      sourceAssets && destinationAssets
        ? sourceAssets?.filter((e) =>
            destinationAssets?.some((x) => e?.ticker === x?.ticker)
          )
        : [],
    [sourceAssets, destinationAssets]
  );

  const initialAsset = useMemo(() => {
    if (supportedAssets) {
      const asset =
        initialAssetTicker &&
        isIdentical(supportedAssets, initialAssetTicker, "ticker");
      return asset || supportedAssets[0];
    }
  }, [initialAssetTicker, supportedAssets]);

  const initialSource = useMemo(() => {
    if (chains) {
      return !!initialSourceName && initialSourceName !== initialDestinationName
        ? isIdentical(chains, initialSourceName, "name")
        : isIdentical(chains, defaultTheaSourceChain, "name");
    }
  }, [initialSourceName, chains, initialDestinationName]);

  const initialDestination = useMemo(() => {
    if (chains) {
      return !!initialDestinationName &&
        initialSourceName !== initialDestinationName
        ? isIdentical(chains, initialDestinationName, "name")
        : isIdentical(chains, defaultTheaDestinationChain, "name");
    }
  }, [initialDestinationName, initialSourceName, chains]);

  useEffect(() => {
    if (initialDestination && !destinationChain)
      setDestinationChain(initialDestination);
  }, [initialDestination, destinationChain]);

  useEffect(() => {
    if (initialSource && !sourceChain) setSourceChain(initialSource);
  }, [initialSource, sourceChain]);

  useEffect(() => {
    if (!selectedAsset && destinationChain && sourceChain && supportedAssets)
      setSelectedAsset(initialAsset || supportedAssets[0]);
  }, [
    initialAsset,
    selectedAsset,
    destinationChain,
    sourceChain,
    supportedAssets,
  ]);

  const {
    data: sourceBalances = [],
    isLoading: sourceBalancesLoading,
    isFetching: sourceBalancesFetching,
    isSuccess: sourceBalancesSuccess,
    refetch: sourceBalancesRefetch,
  } = useTheaBalances({
    connector: sourceConnector,
    sourceAddress: sourceAccountSelected?.address,
    assets: sourceAssets,
    chain: sourceChain?.genesis,
  });

  const onRefetchSourceBalances = useCallback(async () => {
    await sourceBalancesRefetch();
  }, [sourceBalancesRefetch]);

  const { data: polkadexDestinationBalances = [] } = useTheaBalances({
    connector: polkadexConnector,
    sourceAddress: destinationAccountSelected?.address,
    assets: polkadexAssets,
    chain: networks[0],
  });

  const {
    data: destinationBalances = [],
    isLoading: destinationBalancesLoading,
    isFetching: destinationBalancesFetching,
    isSuccess: destinationBalancesSuccess,
  } = useTheaBalances({
    connector: destinationConnector,
    sourceAddress: sourceAccountSelected?.address,
    assets: destinationAssets,
    chain: destinationChain?.genesis,
  });

  const selectedAssetSupported = useMemo(
    () =>
      !!selectedAsset &&
      supportedAssets?.find((e) => e.ticker.includes(selectedAsset.ticker)),
    [selectedAsset, supportedAssets]
  );

  useEffect(() => {
    if (
      selectedAsset &&
      sourceChain &&
      destinationChain &&
      supportedAssets &&
      !selectedAssetSupported
    ) {
      setSelectedAsset(null);
    }
  }, [
    destinationChain,
    selectedAsset,
    selectedAssetSupported,
    sourceChain,
    supportedAssets,
  ]);

  const [
    {
      data: deposits = [],
      isLoading: depositsLoading,
      isFetching: depositsFetching,
      isSuccess: depositsSuccess,
      isRefetching: depositsRefetching,
      refetch: onDepositsRefetch,
    },
    {
      data: withdrawals = [],
      isLoading: withdrawalsLoading,
      isFetching: withdrawalsFetching,
      isSuccess: withdrawalsSuccess,
      isRefetching: withdrawalsRefetching,
      refetch: onWithdrawalsRefetch,
    },
  ] = useTheaTransactions({
    sourceAddress: sourceAccountSelected?.address,
    assets: polkadexAssets,
    chains,
  });

  const onRefreshTransactions = useCallback(async () => {
    await onWithdrawalsRefetch();
    await onDepositsRefetch();
  }, [onWithdrawalsRefetch, onDepositsRefetch]);

  const existential = useMemo(
    () =>
      sourceChain?.genesis
        ? EXISTENTIAL[sourceChain?.genesis as keyof typeof EXISTENTIAL]
            .existential
        : 0,
    [sourceChain?.genesis]
  );

  const selectedAssetAmount = useMemo(
    () =>
      selectedAsset && sourceBalances
        ? sourceBalances.find((e) => e.ticker === selectedAsset?.ticker)
            ?.amount ?? 0
        : 0,
    [selectedAsset, sourceBalances]
  );

  const selectedAssetBalance = useMemo(
    () =>
      selectedAssetAmount >= existential
        ? selectedAssetAmount - existential
        : 0,
    [selectedAssetAmount, existential]
  );

  const transactionsRefetching = useMemo(
    () => withdrawalsRefetching || depositsRefetching,
    [withdrawalsRefetching, depositsRefetching]
  );

  const isPolkadexChain = useMemo(
    () => !!(sourceChain?.genesis === networks[0]),
    [sourceChain?.genesis]
  );

  const destinationPDEXBalance = useMemo(
    () =>
      polkadexDestinationBalances
        ? polkadexDestinationBalances.find((e) => e.ticker === "PDEX")
            ?.amount ?? 0 // Remove static data
        : 0,
    [polkadexDestinationBalances]
  );

  const sourcePDEXBalance = useMemo(
    () =>
      isPolkadexChain
        ? sourceBalances.find((e) => e.ticker === "PDEX")?.amount ?? 0 // Remove static data
        : 0,
    [isPolkadexChain, sourceBalances]
  );

  const {
    data: transferConfig,
    isLoading: transferConfigLoading,
    isFetching: transferConfigFetching,
    isSuccess: transferConfigSuccess,
  } = useTheaConfig({
    connector: sourceConnector,
    destinationAddress: destinationAccountSelected?.address,
    sourceAddress: destinationAccountSelected?.address,
    selectedAsset,
    destinationChain,
  });

  return (
    <Provider
      value={{
        sourceConnector,
        destinationConnector,

        sourceAccount: sourceAccountSelected,
        setSourceAccount,
        destinationAccount: destinationAccountSelected,
        setDestinationAccount,

        sourceChain,
        setSourceChain,
        destinationChain,
        setDestinationChain,
        chains,

        supportedAssets,
        destinationAssets,
        sourceAssets,
        polkadexAssets,

        selectedAsset,
        setSelectedAsset,
        selectedAssetBalance,
        selectedAssetAmount,

        sourceBalances,
        sourceBalancesLoading: sourceBalancesLoading && sourceBalancesFetching,
        sourceBalancesSuccess,
        onRefetchSourceBalances,

        destinationBalances,
        destinationBalancesLoading:
          destinationBalancesLoading && destinationBalancesFetching,
        destinationBalancesSuccess,

        deposits,
        depositsLoading: depositsLoading && depositsFetching,
        depositsSuccess,

        withdrawals,
        withdrawalsLoading: withdrawalsLoading && withdrawalsFetching,
        withdrawalsSuccess,

        transferConfig,
        transferConfigLoading: transferConfigLoading && transferConfigFetching,
        transferConfigSuccess,

        existential,
        onRefreshTransactions,
        transactionsRefetching,
        destinationPDEXBalance,
        sourcePDEXBalance,
        isPolkadexChain,
      }}
    >
      {children}
    </Provider>
  );
};

type State = {
  sourceConnector: BaseChainAdapter | null;
  destinationConnector: BaseChainAdapter | null;

  sourceAccount?: ExtensionAccount;
  setSourceAccount: Dispatch<SetStateAction<ExtensionAccount | undefined>>;
  chains: Chain[];

  destinationAccount?: CustomAccount;
  setDestinationAccount: Dispatch<SetStateAction<CustomAccount | undefined>>;

  destinationChain: Chain | null;
  setDestinationChain: Dispatch<SetStateAction<Chain | null>>;
  sourceChain: Chain | null;
  setSourceChain: Dispatch<SetStateAction<Chain | null>>;

  supportedAssets: Asset[];
  destinationAssets: Asset[];
  sourceAssets: Asset[];
  polkadexAssets: Asset[];

  selectedAsset: Asset | null;
  setSelectedAsset: Dispatch<SetStateAction<Asset | null>>;
  selectedAssetBalance: number;
  selectedAssetAmount: number;

  sourceBalances: AssetAmount[];
  sourceBalancesLoading: boolean;
  sourceBalancesSuccess: boolean;
  onRefetchSourceBalances: () => Promise<void>;

  destinationBalances: AssetAmount[];
  destinationBalancesLoading: boolean;
  destinationBalancesSuccess: boolean;

  deposits: Transactions;
  depositsLoading: boolean;
  depositsSuccess: boolean;

  withdrawals: Transactions;
  withdrawalsLoading: boolean;
  withdrawalsSuccess: boolean;

  transferConfig: TransferConfig | undefined;
  transferConfigLoading: boolean;
  transferConfigSuccess: boolean;

  existential: number;
  transactionsRefetching: boolean;
  onRefreshTransactions: () => Promise<void>;
  destinationPDEXBalance: number;
  sourcePDEXBalance: number;
  isPolkadexChain: boolean;
};
export const Context = createContext<State>({
  sourceConnector: null,
  destinationConnector: null,

  sourceAccount: undefined,
  setSourceAccount: () => {},
  destinationAccount: undefined,
  setDestinationAccount: () => {},

  destinationChain: null,
  setDestinationChain: () => {},
  sourceChain: null,
  setSourceChain: () => {},
  chains: [],

  supportedAssets: [],
  destinationAssets: [],
  sourceAssets: [],
  polkadexAssets: [],

  selectedAsset: null,
  setSelectedAsset: () => {},
  selectedAssetBalance: 0,
  selectedAssetAmount: 0,

  sourceBalances: [],
  sourceBalancesLoading: false,
  sourceBalancesSuccess: false,
  onRefetchSourceBalances: async () => {},

  destinationBalances: [],
  destinationBalancesLoading: false,
  destinationBalancesSuccess: false,

  deposits: [],
  depositsLoading: false,
  depositsSuccess: false,

  withdrawals: [],
  withdrawalsLoading: false,
  withdrawalsSuccess: false,

  transferConfig: undefined,
  transferConfigLoading: false,
  transferConfigSuccess: false,

  existential: 0,
  transactionsRefetching: false,
  onRefreshTransactions: async () => {},
  destinationPDEXBalance: 0,
  sourcePDEXBalance: 0,
  isPolkadexChain: false,
});

const Provider = ({ value, children }: PropsWithChildren<{ value: State }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
