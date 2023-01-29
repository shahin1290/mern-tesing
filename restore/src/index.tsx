import React from "react";
import ReactDOM from "react-dom";
import App from "./app/layout/App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { StoreProvider } from "./app/context/StoreContext";
import { Provider } from "react-redux";
import { store } from "./app/store/configureStore";

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <StoreProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </StoreProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
