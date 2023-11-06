import { useCallback, useEffect, useReducer } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import router from "next/router";
import { defaultConfig } from "@orderbook/core/config";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import { Provider } from "./context";
import { authReducer, initialState } from "./reducer";
import * as T from "./types";
import { AUTH_ERROR_CODES } from "./constants";
import * as A from "./actions";

export const AuthProvider: T.AuthComponent = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const profileState = useProfile();
  const { onHandleNotification, onHandleError } = useSettingsProvider();

  // Actions
  const onSignIn = useCallback(
    async ({ email, password }: T.SignIn["fetch"]) => {
      try {
        dispatch(A.signInFetch({ email, password }));
        const user: CognitoUser = await Auth.signIn(email, password);
        dispatch(A.signInData({ user, email, isConfirmed: true }));
        profileState.onUserAuthFetch();
      } catch (error) {
        console.log("onSignIn:", error);
        const errorCode = error?.name;
        switch (errorCode) {
          case AUTH_ERROR_CODES.NOT_AUTHORIZED: {
            onHandleError(error?.message ?? error);
            dispatch(A.signInError(error));
            return;
          }
          case AUTH_ERROR_CODES.USER_NOT_CONFIRMED: {
            onHandleNotification({
              message:
                "Sign in Failed!, it looks like you have not confirmed your email. Please confirm your email and try again.",
              type: "Error",
            });
            dispatch(A.signInError(error));
            router.push(
              {
                pathname: "/codeVerification",
                query: {
                  email,
                },
              },
              "/codeVerification",
            );
            return;
          }
          default: {
            onHandleError(error?.message ?? error);
            dispatch(A.signInError(error));
          }
        }
      }
    },
    [profileState, onHandleError, onHandleNotification],
  );

  const onSignUp = useCallback(
    async ({ email, password }: T.SignUp["fetch"]) => {
      try {
        dispatch(A.signUpFetch({ email, password }));
        const { userConfirmed } = await Auth.signUp({
          username: email.toLowerCase(),
          password,
          attributes: {
            email,
          },
        });
        dispatch(A.signUpData({ userConfirmed, email }));
        onHandleNotification({
          message:
            "Account created successfully. Please check your email for a verification code to confirm your email.",
          type: "Success",
        });
        router.push(
          {
            pathname: "/codeVerification",
            query: {
              email,
            },
          },
          "/codeVerification",
        );
      } catch (error) {
        console.log("error: ", error);
        onHandleError(error?.message ?? error);
        dispatch(A.signUpError(error));
      }
    },
    [onHandleError, onHandleNotification],
  );

  const onLogout = useCallback(() => {
    try {
      Auth.signOut();
      dispatch(A.logOutData());
      onHandleNotification({
        type: "Success",
        message: "Logged out, you have been logged out",
      });
    } catch (error) {
      console.log("error: ", error);

      onHandleError(error?.message ?? error);

      dispatch(A.logOutError(error));

      if (error.message.indexOf("identity.session.not_found") > -1) {
        profileState.onUserAuthFetch();
      }
    }
  }, [onHandleError, onHandleNotification, profileState]);

  const onForgotPassword = useCallback(
    async ({ code, newPassword, email }: T.ForgotPassword) => {
      try {
        await Auth.forgotPasswordSubmit(email, code, newPassword);
        dispatch(A.forgotPasswordData());
        setTimeout(() => {
          router.push("/signIn");
          dispatch(A.forgotPasswordReset(true));
        }, 5000);
      } catch (error) {
        console.log("error:", error);
        onHandleError(error?.message ?? error);
        dispatch(A.forgotPasswordError(error));
      }
    },
    [onHandleError],
  );

  const onForgotPasswordCode = useCallback(
    async (payload: string) => {
      try {
        Auth.forgotPassword(payload.toLowerCase());
        dispatch(A.forgotPasswordData(payload));
        setTimeout(() => {
          router.push("/resetPasswordForm");
          dispatch(A.forgotPasswordReset());
        }, 5000);
      } catch (error) {
        console.log("error:", error);
        onHandleError(error?.message ?? error);
        dispatch(A.forgotPasswordError(error));
      }
    },
    [onHandleError],
  );

  const onResendCode = useCallback(
    async (email: string) => {
      try {
        await Auth.resendSignUp(email);
        dispatch(A.resendCodeData());
      } catch (error) {
        console.log("error:", error);
        onHandleError(error?.message ?? error);
        dispatch(A.resendCodeError(error));
      }
    },
    [onHandleError],
  );

  const onCodeVerification = useCallback(
    async ({ email, code }: T.CodeVerification) => {
      try {
        await Auth.confirmSignUp(email, code);
        dispatch(A.codeVerifyData());
        onHandleNotification({
          type: "Success",
          message:
            "Successfully created a new account!, please sign in with your new account",
        });
        router.push("/signIn");
      } catch (error) {
        console.log("error:", error);
        onHandleError(error?.message ?? error);
        dispatch(A.codeVerifyError(error));
      }
    },
    [onHandleError, onHandleNotification],
  );

  const onChangePassword = useCallback(
    async ({ newPassword, oldPassword }: T.ChangePassword) => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const data = await Auth.changePassword(user, oldPassword, newPassword);
        console.log(data);
        dispatch(A.changePasswordData());
      } catch (error) {
        console.log("error:", error);
        onHandleError(error?.message ?? error);
        dispatch(A.changePasswordError(error));
      }
    },
    [onHandleError],
  );

  const onUserAuth = useCallback(
    async (payload: T.UserAuth) => dispatch(A.authUserData(payload)),
    [],
  );

  // Note : getIsAuthenticated function is same as fetchDataOnUserAuth in profile provider. We can remove it.

  // For SignUp Purposes
  const signupIsSuccess = state.signup.isSuccess;

  // For Code Verification Purposes
  const isVerificationSuccess = state.userConfirmed;
  const email = state.email;

  useEffect(() => {
    if (signupIsSuccess && isVerificationSuccess) {
      setTimeout(() => {
        router.push("/signIn");
      }, 2000);
    }
  }, [isVerificationSuccess, signupIsSuccess]);

  // removed the onHandleNotification from dependency array as it was causing infinite rerenders

  useEffect(() => {
    if (signupIsSuccess && !email) router.push("/sign");
  }, [email, signupIsSuccess]);

  // For Logout Purposes
  const user = state.user;
  const logoutIsSuccess = state.logout.isSuccess;
  useEffect(() => {
    if (logoutIsSuccess && !user) {
      router.push("/trading/" + defaultConfig.landingPageMarket);
    }
  }, [logoutIsSuccess, user]);

  return (
    <Provider
      value={{
        ...state,
        onSignIn,
        onSignUp,
        onLogout,
        onForgotPassword,
        onForgotPasswordCode,
        onResendCode,
        onCodeVerification,
        onChangePassword,
        onUserAuth,
      }}
    >
      {children}
    </Provider>
  );
};