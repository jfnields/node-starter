import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
class CommentsList extends Component {
    static get propTypes() {
        return {
            comments: PropTypes.array.isRequired
        };
    }
    getList() {
        const lis = this.props.comments.map((comment) => {
            return (
                <li key={comment.id}>
                    {comment.text}
                </li>
            );
        });
        return <ul>
            {lis}
        </ul>;
    }

    render() {
        return <div>
            {this.getList()}
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        comments: state.comments
    };
}

export default connect(mapStateToProps)(CommentsList);
