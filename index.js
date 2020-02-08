const path = require("path");
const express = require("express");
const cors = require("cors");
const graphqlHttp = require("express-graphql");

const connectDatabase = require("./config/connectDB");
const rootValue = require("./resolvers/index");
const schema = require("./schema/index");

connectDatabase();

const app = express();

app.use(express.json());
app.use(cors());

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    rootValue,
    graphiql: true
  })
);

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
