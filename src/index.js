import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { store } from './store/store';
import { Provider } from "react-redux";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
