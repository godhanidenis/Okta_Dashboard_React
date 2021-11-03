import { FunctionComponent, useEffect, useState } from "react";
import createTokenProvider from "./TokenProvider";
import history from "../history";
import Cookies from "js-cookie";
import { useOktaAuth } from "@okta/okta-react";

export const CreateAuthProvider = () => {
  /* Implementation */
  // const { oktaAuth, authState } = useOktaAuth();
  // console.log("AuthState" , authState)


  const tokenProvider = createTokenProvider();

  const login: typeof tokenProvider.setToken = (newTokens) => {
    tokenProvider.setToken(newTokens);
  };

  const logout = () => {
    tokenProvider.setToken({ accessToken: "" });
  };

  const authFetch = async (
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> => {
    //const token = await tokenProvider.getToken();
    const token = "00xNowmziwHcsv9_2jN5b-4ettDusrvNFWdQkBWNzc"
    init = init || {};

    // init.body = {

    // }

    init.headers = {
      ...init.headers,
      Accept: "application/json",
      ContentType: "application/json",
      Authorization: `Bearer ${token}`
    };
    init.credentials = "include";

    return fetch(input, init);
  };

  const useAuth = () => {
    const [isLogged, setIsLogged] = useState(tokenProvider.isLoggedIn());

    useEffect(() => {
      const listener = (newIsLogged: boolean) => {
        setIsLogged(newIsLogged);
      };

      tokenProvider.subscribe(listener);
      return () => {
        tokenProvider.unsubscribe(listener);
      };
    }, []);

    return [isLogged] as [typeof isLogged];
  };

  return {
    useAuth,
    authFetch,
    login,
    logout,
  };
};

export const { useAuth, authFetch, login, logout } = CreateAuthProvider();
