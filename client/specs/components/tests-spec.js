import { expect } from "chai";
import React from "react";
import { shallow, mount, render } from "enzyme";
describe("Test Suites", () => {
    it("can use chai", () => {
        expect(1).to.equal(1);
    });
    it("can use enzyme", () => {
        expect(shallow(<div/>)).to.not.be.null;
        expect(mount(<div/>)).to.not.be.null;
        expect(render(<div/>)).to.not.be.null;
    });
});
