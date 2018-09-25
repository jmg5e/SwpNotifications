import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { initialState as AuthState } from 'auth/reducer';
import IfAuthenticated from 'auth/IfAuthenticated';

const mockStore = configureStore();

describe('IfAuthenticated', () => {
  it('should render child if authenticated', () => {
    const state = { auth: { ...AuthState, authenticated: true, user: {} } };
    const store = mockStore(state);
    const wrapper = shallow(
      <IfAuthenticated>
        <div>protected</div>
      </IfAuthenticated>,
      { context: { store } },
    );
    expect(wrapper.dive().html()).toEqual('<div>protected</div>');
  });

  it('should render all children if authenticated', () => {
    const state = { auth: { ...AuthState, authenticated: true, user: {} } };
    const store = mockStore(state);
    const wrapper = shallow(
      <IfAuthenticated>
        <div>protected</div>
        <div>protected</div>
      </IfAuthenticated>,
      { context: { store } },
    );
    expect(wrapper.dive().html()).toEqual('<div>protected</div><div>protected</div>');
  });

  it('should NOT render children if not authenticated', () => {
    const state = { auth: { ...AuthState, authenticated: false } };
    const store = mockStore(state);
    const wrapper = shallow(
      <IfAuthenticated>
        <div>protected</div>
      </IfAuthenticated>,
      { context: { store } },
    );
    expect(wrapper.dive().html()).toEqual(null);
  });

  it('should render provided else component if not authenticated', () => {
    const state = { auth: { ...AuthState, authenticated: false } };
    const store = mockStore(state);
    const wrapper = shallow(
      <IfAuthenticated renderElse={() => <div>not authorized!</div>}>
        <div>protected</div>
      </IfAuthenticated>,
      { context: { store } },
    );
    expect(wrapper.dive().text()).toEqual('not authorized!');
  });
  describe('if prop requireAdmin', () => {
    it('should render if user is an admin', () => {
      const state = {
        auth: { ...AuthState, authenticated: true, user: { isAdmin: true } },
      };
      const store = mockStore(state);
      const wrapper = shallow(
        <IfAuthenticated requireAdmin>
          <div>protected</div>
        </IfAuthenticated>,
        { context: { store } },
      );
      expect(wrapper.dive().html()).toEqual('<div>protected</div>');
    });

    it('should NOT render if user is not an admin', () => {
      const state = {
        auth: { ...AuthState, authenticated: true, user: { isAdmin: false } },
      };
      const store = mockStore(state);
      const wrapper = shallow(
        <IfAuthenticated requireAdmin>
          <div>protected</div>
        </IfAuthenticated>,
        { context: { store } },
      );
      expect(wrapper.dive().html()).toEqual(null);
    });
  });

  describe('prop requiredGroup', () => {
    it('should render if user is in group', () => {
      const state = {
        auth: {
          ...AuthState,
          authenticated: true,
          user: { isAdmin: true, hubGroups: ['foo'] },
        },
      };
      const store = mockStore(state);
      const wrapper = shallow(
        <IfAuthenticated requiredGroup="foo">
          <div>protected</div>
        </IfAuthenticated>,
        { context: { store } },
      );
      expect(wrapper.dive().html()).toEqual('<div>protected</div>');
    });

    it('should NOT render if user is not in group', () => {
      const state = {
        auth: { ...AuthState, authenticated: true, user: { hubGroups: [] } },
      };
      const store = mockStore(state);
      const wrapper = shallow(
        <IfAuthenticated requiredGroup="foo">
          <div>protected</div>
        </IfAuthenticated>,
        { context: { store } },
      );
      expect(wrapper.dive().html()).toEqual(null);
    });
  });
});
