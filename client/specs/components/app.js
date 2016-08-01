import React from "react";
import App from "../../components/app";
import styles from "../../sass/app";
import { expect } from "chai";
import { shallow, mount, render } from "enzyme";

const headerText = "Example Header Text";
const description = "ExampleDescription";
const props = { headerText, description };

describe("<App/>", () => {

    it("contains an <h1/>", () => {
        expect(
            shallow(<App {...props}/>).find("h1").length
        ).to.equal(1);
    });

    it("has the correct class", function() {
        expect(
            shallow(<App {...props} />).is("." + styles.app)
        ).to.be.true;
    });

    it("contains spec with an expectation", function() {
        expect(
            mount(<App {...props}/>).find("div").length
        ).to.not.equal(0);
    });

    it("can run an expectation with render", function() {
        expect(
            render(<App {...props}/>).find("*").length
        ).to.not.equal(0);
    });
});
