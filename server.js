const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Route
const users = require("./routes/users");

app.use(bodyParser.urlencoded({extended: true}))

// Using route
app.use("/api", users);

app.listen(3000, () => {
  console.log(`Server has been started!`);
})
