import React from "react";
import CommentBox from "../../components/comment-box";
import styles from "../../sass/comment-box";
import {expect} from "chai";
import {shallow, mount} from "enzyme";

const headerText = "Example Header Text",
    description = "ExampleDescription",
    props = { headerText, description };

describe("<CommentBox/>", () => {

    describe("markup", () => {
        it("has a <button/>", () => {
            expect(
                shallow(<CommentBox {...props}/>)
                    .find("button")
                    .length
            ).to.equal(1);
        });

        it("contains a <textarea/>", () => {
            expect(
                shallow(<CommentBox {...props}/>)
                    .find("textarea")
                    .length
            ).to.equal(1);
        });
    });

    describe("style", () => {
        it("is defined", () => {
            expect(styles.commentBox == null).to.be.false;
        });
        it("uses correct class", () => {
            expect(
                shallow(<CommentBox/>).hasClass(styles.commentBox)
            ).to.be.true;
        });
    });

    describe("behavior", () => {
        it("should show text on input", () => {
            const wrapper = mount(<CommentBox/>),
                textarea = wrapper.find("textarea"),
                testText = "example text";

            textarea.simulate("change", {target: {value: testText}});

            expect(
                textarea.props().value
            ).to.equal(testText);
        });

        it("should clear the text on input", () => {

        });
    });

});
