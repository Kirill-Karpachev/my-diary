import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app";
import "./index.css";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
