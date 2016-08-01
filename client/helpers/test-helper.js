import _$ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import chai, { expect } from "chai";
import chaiJquery from "chai-jquery";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "../src/reducers";

const $ = _$(window);
chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {
    const componentInstance =  TestUtils.renderIntoDocument(
        React.createElement(
          Provider,
          { store: createStore(reducers, state) },
          React.createElement(ComponentClass, props)
        )
    );
    return $(ReactDOM.findDOMNode(componentInstance));
}

$.fn.simulate = function(eventName, value) {
    if (value) {
        this.val(value);
    }
    TestUtils.Simulate[eventName](this[0]);
};
export {renderComponent, expect};
