import React from "react";
import App from "../../components/app";
import {expect} from "chai";
import {shallow} from "enzyme";
import CommentBox from "../../components/comment-box";
import CommentsList from "../../components/comments-list";
const headerText = "Example Header Text",
    description = "ExampleDescription",
    props = { headerText, description };

describe("<App/>", () => {

    it("contains a <CommentBox/>", function() {
        expect(
            shallow(<App {...props}/>).contains(<CommentBox/>)
        ).to.be.true;
    });

    it("contains a <CommentsList/>", function() {
        expect(
            shallow(<App {...props}/>)
                .contains(<CommentsList comments={[]}/>)
        ).to.be.true;
    });
});
