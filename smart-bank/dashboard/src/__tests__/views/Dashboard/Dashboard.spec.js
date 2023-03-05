import "jsdom-global/register";
import React from "react";
import { mount, shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

import Dashboard from "../../../views/Dashboard";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe("Dashboard", () => {
  const testDate = new Date();

  it("should render component correctly with initial data", () => {
    const component = mount(
      <Dashboard
        str={""}
        initialUserBalance={100}
        initialBeneficiaries={[{}]}
        initialLastTxnDate={testDate.toDateString()}
        initialLastPaidTxnName={"test"}
        userDetails={{ accountNumber: "" }}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("should render component correctly with no data", () => {
    const component = mount(<Dashboard />);
    expect(component).toMatchSnapshot();
  });
});
