import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import reducers from 'store/appReducers';
import App from './App';

const mockStore = configureStore(reducers);

describe('App', () => {
  it('should render successfully', () => {
    // const { store } = configureStore();
    const store = mockStore({});
    const wrapper = shallow(<App store={store} />);

    expect(wrapper.length).toEqual(1);
  });
});
