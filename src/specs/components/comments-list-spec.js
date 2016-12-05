import { shallow } from "enzyme";
import React from "react";
import CommentsList from "../../components/comments-list";
import { expect } from "chai";

describe("<CommentsList/>", () => {
    const props = {
        comments: [
            {id: 1, text: "a"},
            {id: 2, text: "b"},
            {id: 3, text: "c"}
        ]
    };

    it("should render a list of comments", () => {
        expect(
            shallow(<CommentsList {...props}/>).find("ul").length
        ).to.be.at.least(1);
    });

    it("should render all comments", () => {
        expect(
            shallow(<CommentsList {...props}/>).find("li").length
        ).to.equal(props.comments.length);
    });

    it("should render comments in order", () => {
        shallow(<CommentsList {...props}/>).find("li").forEach(function(li, ix) {
            expect(
                li.contains(props.comments[ix].text)
            ).to.be.true;
        });
    });

});
