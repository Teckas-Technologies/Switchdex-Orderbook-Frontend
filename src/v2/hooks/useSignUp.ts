import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";

import {
  selectExtensionWalletAccounts,
  selectExtensionWalletLoading,
  selectExtensionWalletSuccess,
  selectMainExtensionAccount,
  selectSignUpLoading,
  selectSignUpSuccess,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { defaultConfig } from "@polkadex/orderbook-config";

export function useSignUp() {
  const router = useRouter();
  const componentRef = useRef();
  const signUpSuccess = useReduxSelector(selectSignUpSuccess);
  const signUpLoading = useReduxSelector(selectSignUpLoading);
  const isLoading = useReduxSelector(selectExtensionWalletLoading);
  const isSuccess = useReduxSelector(selectExtensionWalletSuccess);
  const selectedExtensionAccount = useReduxSelector(selectMainExtensionAccount);
  const extensionAccounts = useReduxSelector(selectExtensionWalletAccounts);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const isPublicBranch = defaultConfig.polkadexFeature === "none";

  useEffect(() => {
    if (signUpSuccess) router.push("/connectToPhone");
  }, [signUpSuccess, router]);

  return {
    isSuccess,
    signUpLoading,
    isLoading,
    handlePrint,
    isPublicBranch,
    signUpSuccess,
    componentRef,
    selectedExtensionAccount,
    extensionAccounts,
  };
}
