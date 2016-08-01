import React from "react";
import CommentBox from "../../components/comment-box";
// import styles from "../../sass/comment-box";
import { expect } from "chai";
import { shallow } from "enzyme";

const headerText = "Example Header Text";
const description = "ExampleDescription";
const props = { headerText, description };

describe("<CommentBox/>", () => {

    it("contains a <textarea/>", () => {
        expect(
            shallow(<CommentBox {...props}/>).find("textarea").length
        ).to.equal(1);
    });

});
