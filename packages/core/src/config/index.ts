import { DefaultConfig } from ".";
export * from "./types";

export const defaultConfig: DefaultConfig = {
  polkadexFeature: process.env.POLKADEX_FEATURE,
  polkadexChain: [
    process.env.POLKADEX_CHAIN as string,
    // This is a backup chain
    "wss://polkadex.public.curie.radiumblock.co/ws",
    "wss://polkadex.api.onfinality.io/public-ws",
  ],
  gaTrackerKey: process.env.GA_MEASUREMENT_ID ?? "G-PWZK8JEFLX",
  landingPageMarket: process.env.LANDING_PAGE || "DOTUSDT",
  withCredentials: false,
  incrementalOrderBook: false,
  orderBookSideLimit: 25,
  defaultStorageLimit: 100,
  defaultTradingViewInterval: 5,
  sessionCheckInterval: 15000,
  balancesFetchInterval: 3000,
  minutesUntilAutoLogout: 120,
  alertDisplayTime: 5000,
  msPricesUpdates: 1000,
  maintenanceMode: process.env.MAINTENACE_MODE === "true",
  enableLmp: process.env.ENABLE_LMP === "true",
  signUpDisabled: process.env.SIGNUP_DISABLED === "true",
  reconnectRangerTime: 30000,
  showShutdownPopup: process.env.SHOW_SHUTDOWN_POPUP === "true",
  availableRoutes: ["/trading", "/balances", "/wallets", "/transfer"],
  underMaintenance: process.env.UNDER_MAINTENACE?.split(",") ?? [],
  mainUrl: process.env.MAIN_URL || "/trading",
  blockedAssets: process.env.BLOCKED_ASSETS?.split(",") || [],
  subscanApi: process.env.SUBSCAN_API || "",
};
