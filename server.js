const express = require("express");
const apiroutes = require("./routes/apiroutes");
const htmlroutes = require("./routes/htmlroutes");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api", apiroutes);
app.use("/", htmlroutes);

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
