import Types from './types';

export const initialState = {
  isOpen: false,
  confirmFn: null,
  message: 'Are You Sure?',
};

const confirmReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.OPEN_CONFIRM:
      return {
        isOpen: true,
        confirmFn: action.confirmFn,
        message: action.message,
      };
    case Types.CLOSE_CONFIRM:
      return initialState;
    default:
      return state;
  }
};

export default confirmReducer;
