import React, {Component, PropTypes} from "react";
import styles from "../sass/app.scss";

export default class App extends Component {

    static get propTypes() {
        return {
            description: PropTypes.string.isRequired,
            headerText: PropTypes.string.isRequired
        };
    }

    render() {
        return <div className={styles.app}>
            <h1>{this.props.headerText}</h1>
            <p>{this.props.description}</p>
        </div>;
    }
}
