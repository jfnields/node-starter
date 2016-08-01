import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app.js";

const props = getInitialProps();

ReactDOM.render(
    <App {... props} />,
    document.getElementById("react-root")
);

function getInitialProps() {
    return {
        headerText: "This is a sandbox application",
        description: `Look around, make changes, and
                      tailor to your needs.`
    };
}
