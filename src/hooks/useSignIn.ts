import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { selectSignInLoading, selectSignInSuccess, signInFetch } from "../modules/user/auth";
import { userChangeInitBanner } from "../modules/user/profile";

import { useReduxSelector } from "./useReduxSelector";

import { defaultConfig } from "@polkadex/orderbook-config";

export const useSignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loading = useReduxSelector(selectSignInLoading);
  const isSuccess = useReduxSelector(selectSignInSuccess);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getIsAuthenticated = async () => {
    try {
      const { attributes } = await Auth.currentAuthenticatedUser();
      if (attributes.email) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIsAuthenticated();
  }, []);

  useEffect(() => {
    if (isSuccess || isAuthenticated) {
      dispatch(userChangeInitBanner(true));
      router.push("/trading/" + defaultConfig.landingPageMarket);
    }
  }, [isAuthenticated, isSuccess, router, dispatch]);

  const signIn = (email: string, password: string) => {
    dispatch(signInFetch({ email, password }));
  };

  return { signIn, loading };
};