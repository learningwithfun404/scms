require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const dbConnection = require("./src/config/db");
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const main = async () => {
  try {
    await dbConnection();
    server.listen(PORT, async () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }
};

main();
