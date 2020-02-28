import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

import { Provider } from "./context/index";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
