const userResolvers = require("./userResolvers");
const timerResolvers = require("./timerResolvers");

module.exports = {
  ...userResolvers,
  ...timerResolvers
};
