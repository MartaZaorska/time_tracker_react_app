export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const ADD_ERRORS = "ADD_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const GET_TIMERS = "GET_TIMERS";
export const ADD_TIMER = "ADD_TIMER";
export const REMOVE_TIMER = "REMOVE_TIMER";
export const UPDATE_TIMER = "UPDATE_TIMER";

const updateTimerReducer = (state, timer) => {
  const timerIndex = state.timers.findIndex(item => item._id === timer._id);
  const updatedTimers = [...state.timers];
  updatedTimers[timerIndex] = { ...timer };
  return {
    ...state,
    timers: updatedTimers,
    errors: []
  };
};

export const defaultReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        errors: [],
        user: { ...action.user }
      };
    case LOGOUT:
      return {
        ...state,
        errors: [],
        timers: [],
        user: { token: "", userId: "", email: "" }
      };
    case ADD_ERRORS:
      return {
        ...state,
        errors: [...state.errors, ...action.errors]
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      };
    case GET_TIMERS:
      return {
        ...state,
        timers: [...action.timers],
        errors: []
      };
    case ADD_TIMER:
      return {
        ...state,
        timers: [...state.timers, action.timer],
        errors: []
      };
    case REMOVE_TIMER:
      return {
        ...state,
        timers: state.timers.filter(timer => timer._id !== action.timerId),
        errors: []
      };
    case UPDATE_TIMER:
      return updateTimerReducer(state, action.timer);
    default:
      return state;
  }
};
