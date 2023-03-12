/** @format */
const app = require("./src/app");
const http = require("http");
const server = http.createServer(app);
const connectMongo = require("./src/db/connection");

const port = process.env.PORT || "3000";

app.set("port", port);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
  //----if mongodb is not connected return error----//
  connectMongo().catch((err) => process.exit(1));
});
