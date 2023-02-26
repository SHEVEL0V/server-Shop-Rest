/** @format */
const app = require("./src/app");
const http = require("http");
const server = http.createServer(app);
const connectMongo = require("./src/db/connection");

const port = process.env.PORT || "3000";

app.set("port", port);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
  connectMongo().catch((err) => process.exit(1));
});
