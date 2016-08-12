import React, {Component} from "react";
import styles from "../sass/comment-box.scss";

export default class CommentBox extends Component {

    static get propTypes() {
        return { };
    }
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    onChange(e) {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        return <div className={styles.commentBox}>
            <textarea value={this.state.value}
                onChange={this.onChange.bind(this)}/>
            <button>Submit</button>
        </div>;
    }
}
