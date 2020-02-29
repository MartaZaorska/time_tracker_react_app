import React, { useReducer, useEffect } from "react";
import {
  defaultReducer,
  GET_TIMERS,
  LOGOUT,
  LOGIN,
  ADD_ERROR,
  ADD_TIMER,
  REMOVE_TIMER,
  UPDATE_TIMER,
  CLEAR_ERROR,
  LOADING
} from "../reducer";

const Context = React.createContext();
export default Context;

export const Provider = props => {
  const initialState = {
    timers: [],
    user: { token: "", userId: "", email: "" },
    error: "",
    isLoading: false
  };

  const [state, dispatch] = useReducer(defaultReducer, initialState, () => {
    const localData = localStorage.getItem("time_tracker_react_app");
    if (localData === null) return initialState;

    const { token = "", userId = "", email = "" } = JSON.parse(localData);
    return token.length > 0
      ? { ...initialState, user: { token, userId, email } }
      : initialState;
  });

  useEffect(() => {
    localStorage.setItem(
      "time_tracker_react_app",
      JSON.stringify({ ...state.user })
    );
    if (state.user.token.length > 0) {
      getTimers(state.user.token);
    }
  }, [state.user]);

  const fetchData = (requestBody, dataName, token = "") => {
    dispatch({ type: LOADING });
    return new Promise((resolve, reject) => {
      fetch("http://localhost:4000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.errors && data.errors.length > 0) {
            reject(data.errors);
          } else if (data.data[dataName]) {
            resolve(data.data[dataName]);
          }
        })
        .catch(error => reject(error));
    });
  };

  const errorHandler = error => {
    if (error[0] && error[0].message) {
      dispatch({ type: ADD_ERROR, error: error[0].message });
    }
  };

  const register = (email, password) => {
    const requestBody = {
      query: `
        mutation mutationUser($email: String!, $password: String!){
          createUser(email: $email, password: $password){
            token
            userId
            email
          }
        }
      `,
      variables: {
        email,
        password
      }
    };

    fetchData(requestBody, "createUser")
      .then(data => dispatch({ type: LOGIN, user: data }))
      .catch(errorHandler);
  };

  const login = (email, password) => {
    const requestBody = {
      query: `
        query queryUser($email: String!, $password: String!){
          login(email: $email, password: $password){
            token
            userId
            email
          }
        }
      `,
      variables: {
        email,
        password
      }
    };

    fetchData(requestBody, "login")
      .then(data => dispatch({ type: LOGIN, user: data }))
      .catch(errorHandler);
  };

  const logout = () => dispatch({ type: LOGOUT });

  const getTimers = () => {
    if (state.user.token.length === 0) {
      dispatch({ type: ADD_ERROR, error: "Użytkownik niezalogowany" });
      return;
    }

    const requestBody = {
      query: `
        query {
          timers {
            _id
            start
            finish
            category
            description
          }
        }
      `
    };

    fetchData(requestBody, "timers", state.user.token)
      .then(data => dispatch({ type: GET_TIMERS, timers: data }))
      .catch(errorHandler);
  };

  const addTimer = ({ category, start, finish = 0, description = "" }) => {
    if (state.user.token.length === 0) {
      dispatch({ type: ADD_ERROR, error: "Użytkownik niezalogowany" });
      return;
    }

    const requestBody = {
      query: `
        mutation mutationTimer($start: Float!, $category: String!, $finish: Float, $description: String){
          createTimer(timerInput: {start: $start, finish: $finish, category: $category, description: $description}){
            _id
            start
            finish
            category
            description
          }
        }
      `,
      variables: {
        category,
        start,
        finish,
        description
      }
    };

    fetchData(requestBody, "createTimer", state.user.token)
      .then(data => dispatch({ type: ADD_TIMER, timer: data }))
      .catch(errorHandler);
  };

  const updateTimer = ({
    _id,
    category,
    start,
    finish = 0,
    description = ""
  }) => {
    if (state.user.token.length === 0) {
      dispatch({ type: ADD_ERROR, error: "Użytkownik niezalogowany" });
      return;
    }

    const requestBody = {
      query: `
        mutation mutationTimer($timerId: ID!, $category: String!, $start: Float!, $finish: Float, $description: String){
          updateTimer(timerId: $timerId, timerInput: {category: $category, start: $start, finish: $finish, description: $description}){
            success
          }
        }
      `,
      variables: {
        timerId: _id,
        category,
        start,
        finish,
        description
      }
    };

    fetchData(requestBody, "updateTimer", state.user.token)
      .then(data =>
        dispatch({
          type: UPDATE_TIMER,
          timer: { _id, category, start, finish, description }
        })
      )
      .catch(errorHandler);
  };

  const removeTimer = timerId => {
    if (state.user.token.length === 0) {
      dispatch({ type: ADD_ERROR, error: "Użytkownik niezalogowany" });
      return;
    }

    const requestBody = {
      query: `
        mutation mutationTimer($timerId: ID!){
          removeTimer(timerId: $timerId){
            success
          }
        }
      `,
      variables: {
        timerId
      }
    };

    fetchData(requestBody, "removeTimer", state.user.token)
      .then(data => dispatch({ type: REMOVE_TIMER, timerId }))
      .catch(errorHandler);
  };

  const addError = error => dispatch({ type: ADD_ERROR, error: error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <Context.Provider
      value={{
        ...state,
        addTimer,
        updateTimer,
        removeTimer,
        logout,
        login,
        register,
        addError,
        clearError
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
