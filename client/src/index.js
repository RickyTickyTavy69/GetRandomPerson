import { render } from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
render(<App />, container);

reportWebVitals();
