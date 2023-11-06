export const positions = [
  "top",
  "topCenter",
  "right",
  "bottom",
  "bottomCenter",
  "left",
];

export type Positions =
  | "top"
  | "topCenter"
  | "right"
  | "bottom"
  | "bottomCenter"
  | "left";

export const colors = [
  "primary",
  "secondary",
  "primaryBackground",
  "primaryBackgroundOpacity",
  "secondaryBackground",
  "secondaryBackgroundOpacity",
  "secondaryBackgroundSolid",
  "teriaryBackgroundOpacity",
  "quaternaryBackground",
  "popupBackground",
  "gradientBackground",
  "gradientGreen",
  "gradientRed",
  "white",
  "black",
  "text",
  "gradient",
  "green",
  "orange",
  "purple",
  "blue",
  "transparent",
  "overlayOpacity",
  "none",
  "inverse",
];

export type Direction =
  | "bottom left"
  | "bottom right"
  | "bottom start"
  | "top left"
  | "top right"
  | "top start"
  | "start"
  | "start left"
  | "start right";

export type Colors =
  | "primary"
  | "primaryHover"
  | "secondary"
  | "primaryBackground"
  | "primaryBackgroundOpacity"
  | "secondaryBackground"
  | "secondaryBackgroundOpacity"
  | "secondaryBackgroundSolid"
  | "tertiaryBackground"
  | "teriaryBackgroundOpacity"
  | "secondaryBackgroundDark"
  | "quaternaryBackground"
  | "secondaryText"
  | "tertiaryText"
  | "popupBackground"
  | "gradientBackground"
  | "gradientGreen"
  | "gradientRed"
  | "white"
  | "black"
  | "text"
  | "gradient"
  | "green"
  | "orange"
  | "purple"
  | "blue"
  | "transparent"
  | "overlayOpacity"
  | "none"
  | "red"
  | "inverse";

export const sizes = [
  "small",
  "extraSmall",
  "medium",
  "extraMedium",
  "large",
  "extraLarge",
  "giant",
  "extraGiant",
  "full",
];

export type Sizes =
  | "small"
  | "extraSmall"
  | "medium"
  | "extraMedium"
  | "large"
  | "extraLarge"
  | "giant"
  | "extraGiant"
  | "full"
  | "fitContent";

export const icons = [
  "ArrowTop",
  "Verified",
  "Alert",
  "Avatar",
  "Attention",
  "ArrowBottom",
  "ArrowVerticalBottom",
  "Language",
  "Print",
  "ArrowVerticalTop",
  "Locked",
  "Calendar",
  "Buy",
  "Candles",
  "Clock",
  "Copy",
  "Mnemonic",
  "Close",
  "Dashboard",
  "Edit",
  "PolkadotJs",
  "Email",
  "Chart",
  "EN",
  "Exchange",
  "Expand",
  "Graph",
  "Dots",
  "Help",
  "History",
  "Moon",
  "Swap",
  "Export",
  "Expand",
  "IDO",
  "OrdersSell",
  "OrdersBuy",
  "OrdersAll",
  "ExchangeBuy",
  "ExchangeSell",
  "DoubleExchange",
  "Deposit",
  "News",
  "Clean",
  "Notifications",
  "ArrowRight",
  "External",
  "ArrowLeft",
  "Options",
  "Order",
  "OrderAsc",
  "OrderDes",
  "Return",
  "Search",
  "Sell",
  "Settings",
  "Star",
  "Sun",
  "Successful",
  "Error",
  "Loading",
  "Transactions",
  "Wallet",
  "En",
  "Es",
  "Fr",
  "Pt",
  "De",
];
export type Icons =
  | "ArrowTop"
  | "Menu"
  | "Information"
  | "Verified"
  | "Avatar"
  | "Alert"
  | "Attention"
  | "Successful"
  | "Error"
  | "Loading"
  | "Locked"
  | "ArrowBottom"
  | "ArrowVerticalBottom"
  | "Language"
  | "ArrowVerticalTop"
  | "Calendar"
  | "Mnemonic"
  | "Buy"
  | "Print"
  | "Candles"
  | "Clock"
  | "Copy"
  | "Close"
  | "Dashboard"
  | "Edit"
  | "PolkadotJs"
  | "Email"
  | "Chart"
  | "EN"
  | "Exchange"
  | "Expand"
  | "Graph"
  | "Dots"
  | "Help"
  | "History"
  | "Moon"
  | "Swap"
  | "Export"
  | "Expand"
  | "IDO"
  | "OrdersSell"
  | "OrdersBuy"
  | "OrdersAll"
  | "ExchangeBuy"
  | "ExchangeSell"
  | "DoubleExchange"
  | "Deposit"
  | "Withdraw"
  | "News"
  | "Clean"
  | "Notifications"
  | "ArrowRight"
  | "External"
  | "ArrowLeft"
  | "Options"
  | "Order"
  | "OrderAsc"
  | "OrderDes"
  | "Return"
  | "Search"
  | "Sell"
  | "Settings"
  | "Star"
  | "Sun"
  | "Transactions"
  | "Wallet"
  | "En"
  | "Es"
  | "Fr"
  | "Pt"
  | "De";

export const tokensTicker = [
  "INCH",
  "AAVE",
  "BAL",
  "COMP",
  "DOT",
  "ETH",
  "LINK",
  "PDEX",
  "UNI",
  "USDT",
  "BTC",
  "USD",
  "EUR",
  "ZAR",
  "DASH",
];

export type TokensTicker =
  | "INCH"
  | "AAVE"
  | "BAL"
  | "COMP"
  | "DOT"
  | "ETH"
  | "LINK"
  | "PDEX"
  | "UNI"
  | "USDT"
  | "BTC"
  | "USD"
  | "EUR"
  | "ZAR"
  | "DASH"
  | string;

export const tokensName = [
  "Polkadex",
  "Polkadot",
  "Ethereum",
  "Aave",
  "Compound",
  "Tether",
  "Uniswap",
  "Link",
  "Basic Token Atention",
  "1Inch",
  "Bitcoin",
  "Dash",
];

export type TokensName =
  | "Polkadex"
  | "Polkadot"
  | "Ethereum"
  | "Aave"
  | "Compound"
  | "Tether"
  | "Uniswap"
  | "Link"
  | "Basic Token Atention"
  | "1Inch"
  | "Bitcoin"
  | "Dash";

export type BackgroundStyle = "flat" | "ghost" | "outline" | "transparent";

export type BorderStyle = "rounded" | "semiRounded" | "squared";

export type Maybe<T> = T | null | undefined;

export type SubscanResult<T, S extends string> = {
  code: number;
  message: string;
  data: {
    count: number;
  } & {
    [K in S]: T[];
  };
};
export interface TransferHistory {
  from: string;
  to: string;
  extrinsic_index: string;
  success: boolean;
  hash: string;
  block_num: number;
  block_timestamp: number;
  module: string;
  amount: string;
  amount_v2: string;
  usd_amount: string;
  fee: string;
  nonce: number;
  asset_symbol: string;
  asset_unique_id: string;
  asset_type: string;
  item_id: any;
  from_account_display: FromAccountDisplay;
  to_account_display: ToAccountDisplay;
  event_idx: number;
  item_detail: any;
}

export interface FromAccountDisplay {
  address: string;
}

export interface ToAccountDisplay {
  address: string;
  display: string;
}