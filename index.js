const server = require("./api/server.js"); // hooks up the server to index.js so it can run with either node or nodemon

const PORT = process.env.PORT || 4000; // uses PORT variable in .env or defaults to 4000

server.listen(PORT, () => {
  // tells server what port to run on
  console.log(`\n== API running on port ${PORT} ==\n`);
});
