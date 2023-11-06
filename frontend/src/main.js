import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import "./css/style.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store";
import i18next from "./translation/i18n";
import { injectStore } from "./utils/Utils";
import router from "./router"
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {injectStore(store)}
    <ToastContainer
      position="top-right"
      autoClose={500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="light"
    />
    <I18nextProvider i18n={i18next}>
      <RouterProvider router={router}></RouterProvider>
    </I18nextProvider>
  </Provider>
);
