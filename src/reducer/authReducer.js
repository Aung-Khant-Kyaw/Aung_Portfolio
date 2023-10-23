/**
 * initial state for global reducer state
 */
export const initialState = {
  user: null,
  isAuthenticated: localStorage.getItem('J4I-isAuthenticated') || false,
};

/**
 * Store reducer
 * @param {*} state - global states
 * @param {*} action - actions that are passed into the reducer
 */
const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };

    case 'USER_LOGOUT':
      localStorage.removeItem('J4I-token');
      localStorage.removeItem('J4I-isAuthenticated');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
