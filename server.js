/** @format */
const app = require("./src/app");
const http = require("http");
const server = http.createServer(app);
const conectMongo = require("./src/db/connection");

const port = process.env.PORT || "3000";

app.set("port", port);

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
  conectMongo().catch((err) => {
    console.log(err);
    return process.exit(1);
  });
});
