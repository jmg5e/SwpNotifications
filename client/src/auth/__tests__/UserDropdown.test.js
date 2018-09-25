import React from 'react';
import { mount } from 'enzyme';
import UserDropdown from 'auth/components/UserDropdown';

describe('UserDropdown', () => {
  it('if not authenticated show login menu item', () => {
    const props = {
      authenticated: false,
      authenticating: false,
      errorMessage: '',
    };
    const loginfunc = jest.fn();
    const wrapper = mount(
      <UserDropdown {...props} login={loginfunc} logout={jest.fn()} />,
    );

    expect(wrapper.text()).toEqual('Login');
  });

  it('if authenticated show logout and userName menu item', () => {
    const props = {
      authenticated: true,
      authenticating: false,
      user: { userName: 'user' },
      errorMessage: '',
    };
    const logoutfunc = jest.fn();
    const wrapper = mount(
      <UserDropdown {...props} login={jest.fn()} logout={logoutfunc} />,
    );
    expect(wrapper.text()).toEqual('userLogout');
  });
});
