import { Route, Switch, useHistory } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import theme from "./theme";
import GlobalStyles from "./Components/dashboard/GlobalStyles";
import "./App.css";
import Login from "./views/pages/login/Login";

import Lists from "./views/pages/List/List";
import { Security, LoginCallback, SecureRoute } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
const config = {
  clientId: "0oa2ej7t7sMEuWbD15d7",
  issuer: "https://dev-52092247.okta.com/oauth2/default",
  redirectUri: window.location.origin + "/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: false,
};

const oktaAuth = new OktaAuth(config);

const App = () => {
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    const basepath = history.createHref({});
    const originalUriWithoutBasepath = originalUri.replace(basepath, "/");

    history.replace(
      toRelativeUrl(originalUriWithoutBasepath, window.location.origin)
    );
  };
  const onAuthRequired = function () {
    history.push("/login");
  };
  const oktaSignInConfig = {
    baseUrl: "https://dev-52092247.okta.com",
    clientId: "0oa2ej7t7sMEuWbD15d7",
    redirectUri: window.location.origin + "/login/callback",
    authParams: {
      // If your app is configured to use the Implicit flow
      // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
      // you will need to uncomment the below line
      // pkce: false
    },
    // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
  };
  return (
    <>
      <StyledEngineProvider injectFirst>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Security
            oktaAuth={oktaAuth}
            restoreOriginalUri={restoreOriginalUri}
            onAuthRequired={onAuthRequired}
          >
            <Switch>
              <Route
                path="/login"
                render={() => <Login config={oktaSignInConfig} />}
              />
              <SecureRoute path="/" exact={true} component={Lists} />
              <Route path="/login/callback" component={LoginCallback} />
            </Switch>
          </Security>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
