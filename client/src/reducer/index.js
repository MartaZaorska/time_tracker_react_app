export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";
export const ADD_ERROR = "ADD_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
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
    error: ""
  };
};

export const defaultReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        error: "",
        user: { ...action.user }
      };
    case LOGOUT:
      return {
        ...state,
        error: "",
        timers: [],
        user: { token: "", userId: "", email: "" }
      };
    case ADD_ERROR:
      return {
        ...state,
        error: action.error
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ""
      };
    case GET_TIMERS:
      return {
        ...state,
        timers: [...action.timers],
        error: ""
      };
    case ADD_TIMER:
      return {
        ...state,
        timers: [...state.timers, action.timer],
        error: ""
      };
    case REMOVE_TIMER:
      return {
        ...state,
        timers: state.timers.filter(timer => timer._id !== action.timerId),
        error: ""
      };
    case UPDATE_TIMER:
      return updateTimerReducer(state, action.timer);
    default:
      return state;
  }
};
