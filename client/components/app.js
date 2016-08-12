import React, {Component, PropTypes} from "react";
import styles from "../sass/app.scss";
import CommentBox from "./comment-box";
import CommentList from "./comments-list";
export default class App extends Component {

    static get propTypes() {
        return {
            description: PropTypes.string.isRequired,
            headerText: PropTypes.string.isRequired
        };
    }

    render() {
        return <div className={styles.app}>
            <CommentList comments={[]}/>
            <CommentBox/>
        </div>;
    }
}
