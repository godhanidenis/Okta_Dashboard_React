const createTokenProvider = () => {
  let _token: { accessToken: string } = { accessToken: "" }
  const okta_token_storage = JSON.parse(localStorage.getItem("okta-token-storage") || "{}") || "{}";
  if (okta_token_storage && okta_token_storage.accessToken) {
    _token.accessToken = okta_token_storage.accessToken.accessToken
  }
  console.log("tokennn",_token)
  /* Implementation */
  const getExpirationDate = (jwtToken?: string): number | null => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split(".")[1]));

    // multiply by 1000 to convert seconds into milliseconds
    return (jwt && jwt.exp && jwt.exp * 1000) || null || undefined;
  };
  const isExpired = (exp?: number | null) => {
    if (!exp) {
      return false;
    }

    return Date.now() > exp;
  };

  const getToken = async () => {
    if (!_token) {
      return null;
    }

    if (isExpired(getExpirationDate(_token.accessToken))) {
      const updatedToken = await fetch(
        "http://192.168.1.3:8000/api/refresh_token/",
        {
          method: "GET",
          credentials: "include",
        }
      ).then((r) => r.json());

      setToken(updatedToken);
    } else {
    }

    return _token && _token.accessToken;
  };

  const isLoggedIn = () => {
    return !!_token;
  };

  let observers: Array<(isLogged: boolean) => void> = [];

  const subscribe = (observer: (isLogged: boolean) => void) => {
    observers.push(observer);
  };

  const unsubscribe = (observer: (isLogged: boolean) => void) => {
    observers = observers.filter((_observer) => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach((observer) => observer(isLogged));
  };

  const setToken = (token: typeof _token) => {
    if (token.accessToken) {
      localStorage.setItem("REACT_TOKEN_AUTH", JSON.stringify(token));
    } else {
      localStorage.removeItem("REACT_TOKEN_AUTH");
    }
    _token = token;
    notify();
  };

  return {
    getToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe,
  };
};

export default createTokenProvider;
