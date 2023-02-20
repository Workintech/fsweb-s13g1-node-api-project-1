const server = require("./api/server");

const port = 9000;

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
// START YOUR SERVER HERE
