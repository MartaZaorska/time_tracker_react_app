const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type User {
    _id: ID!
    email: String!
    password: String!
  }

  type Timer {
    _id: ID!
    user: ID!
    category: String!
    start: Float!
    finish: Float!
    description: String
  }

  type AuthData {
    token: String!
    email: String!
    userId: ID!
  }

  type Confirm {
    success: Boolean!
  }

  input TimerInput {
    category: String!
    start: Float!
    finish: Float
    description: String
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
    timers: [Timer!]!
  }

  type RootMutation {
    createUser(email: String!, password: String!): AuthData!
    createTimer(timerInput: TimerInput!): Timer
    updateTimer(timerId: ID!, timerInput: TimerInput!): Confirm
    removeTimer(timerId: ID!): Confirm
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
