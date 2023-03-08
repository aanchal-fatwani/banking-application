/* eslint-disable import/first */
import "jsdom-global/register";
import React from "react";
import { mount, shallow } from "enzyme";

import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

import TransactionsList from "../../../views/TransactionsList";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe("TransactionsList", () => {
  const testDate = new Date();
  const testUser = [
    {
      date: testDate,
      description: "test",
      amount: "100",
    },
  ];
  it("should render component correctly with initial data", () => {
    const component = mount(
      <TransactionsList
        initialBeneficiaries={[{}]}
        str={"test"}
        data={testUser}
        initialTotalBal={100}
        userDetails={{ accountNumber: "" }}
        initialOrgtxnData={[{ description: "test" }]}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it("should render component correctly with no data", () => {
    const component = mount(<TransactionsList />);
    expect(component).toMatchSnapshot();
  });
  it("should be able to search within data", () => {
    const testTxnData = [{}];
    const component = shallow(
      <TransactionsList transactionsData={testTxnData} />
    );
    const testUserData = {
      searchStr: "test",
    };
    component
      .find('[data-testid="search"]')
      .props()
      .onChange({ target: { value: testUserData.searchStr } });
    expect(component.find('[data-testid="search"]').props().value).toBe(
      testUserData.searchStr
    );
    component.find('[data-testid="filter"]').simulate("click");
  });
});
