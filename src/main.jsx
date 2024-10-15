import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./context/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div className="blurspot"></div>
    <div className="blurspot2"></div>
    <div className="blurspot3"></div>
    <App />
  </Provider>

);
