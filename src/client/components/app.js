import React, { Component } from "react";
import styles from "../sass/app";
export default class App extends Component {
    render() {
        return <div className={styles.app}>
            <h1>This is an example application</h1>
            <p>Look around, make changes, and tailor to your needs.</p>
        </div>;
    }
}
