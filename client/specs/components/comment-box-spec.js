import React from "react";
import CommentBox from "../../components/comment-box";
import {expect} from "chai";
import {shallow} from "enzyme";

const headerText = "Example Header Text",
    description = "ExampleDescription",
    props = { headerText, description };

describe("<CommentBox/>", () => {

    it("contains a <textarea/>", () => {
        expect(
            shallow(<CommentBox {...props}/>).find("textarea").length
        ).to.equal(1);
    });

});
