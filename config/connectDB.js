const mongoose = require("mongoose");
const config = require("config");

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(config.get("mongo_uri"), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
