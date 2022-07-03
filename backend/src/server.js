const express = require("express");
const app = express();
const routes = require("./routes/index");
const config = require("./config/config");
const port = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get('*', (req, res) => {
  res.status(404).json({message: "This route dosent exist"})
})

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server started on port ${port}`);
  } else {
    console.log(`Error: ${error}`);
  }
});

