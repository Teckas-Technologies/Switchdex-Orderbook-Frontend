import { TradingView as TradingViewConstants } from "@orderbook/core/constants";

// import { ResolutionString } from "../../../../public/static/charting_library/charting_library";

import { supported_resolutions } from "./config";

const DEFAULT_RESOLUTION = "60" as any;

export const getLastUsedReslution = (): any => {
  const lastUsedResolution = (localStorage.getItem(
    TradingViewConstants.lastResolution
  ) ?? DEFAULT_RESOLUTION) as any;

  // Check if supported resolution
  if (!supported_resolutions.map(({ id }) => id).includes(lastUsedResolution)) {
    localStorage.setItem(
      TradingViewConstants.lastResolution,
      DEFAULT_RESOLUTION
    );
    return DEFAULT_RESOLUTION;
  }

  return lastUsedResolution;
};
