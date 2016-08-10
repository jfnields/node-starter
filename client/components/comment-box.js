import React, {Component} from "react";
import styles from "../sass/comment-box.scss";

export default class CommentBox extends Component {

    static get propTypes() {
        return {
        };
    }

    render() {
        return <div className={styles.commentBox}>
        </div>;
    }
}
