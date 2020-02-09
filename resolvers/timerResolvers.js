const Timer = require("../models/Timer");

module.exports = {
  createTimer: async (args, req) => {
    if (!req.isAuth) throw new Error("Użytkownik niezalogowany");
    const { category, start, finish = 0, description = "" } = args.timerInput;
    const newTimer = new Timer({
      category,
      start,
      finish,
      description,
      user: req.userId
    });

    try {
      const timer = await newTimer.save();
      return {
        ...timer._doc,
        _id: timer.id
      };
    } catch (err) {
      throw err;
    }
  },
  updateTimer: async (args, req) => {
    if (!req.isAuth) throw new Error("Użytkownik niezalogowany");
    try {
      await Timer.findByIdAndUpdate(args.timerId, args.timerInput);
      return {
        success: true
      };
    } catch (err) {
      throw err;
    }
  },
  removeTimer: async (args, req) => {
    if (!req.isAuth) throw new Error("Użytkownik niezalogowany");
    try {
      await Timer.findByIdAndRemove(args.timerId);
      return {
        success: true
      };
    } catch (err) {
      throw err;
    }
  },
  timers: async (args, req) => {
    if (!req.isAuth) throw new Error("Użytkownik niezalogowany");
    try {
      const result = await Timer.find({ user: req.userId });
      return result.map(item => {
        return {
          ...item._doc,
          _id: item.id
        };
      });
    } catch (err) {
      throw err;
    }
  }
};
