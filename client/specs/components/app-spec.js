import React from "react";
import App from "../../components/app";
import styles from "../../sass/app";
import {expect} from "chai";
import {shallow, mount, render} from "enzyme";
import CommentBox from "../../components/comment-box";
const headerText = "Example Header Text",
    description = "ExampleDescription",
    props = { headerText, description };

describe("<App/>", () => {

    it("contains an <h1/>", () => {
        expect(
            shallow(<App {...props}/>).find("h1").length
        ).to.be.at.least(1);
    });

    it("has the correct class", function() {
        expect(
            shallow(<App {...props} />).is("." + styles.app)
        ).to.be.true;
    });

    it("contains a <CommentBox/>", function() {
        expect(
            mount(<App {...props}/>).find(CommentBox).length
        ).to.be.at.least(1);
    });

    it("can run an expectation with render", function() {
        expect(
            render(<App {...props}/>).find("*").length
        ).to.not.equal(0);
    });
});
