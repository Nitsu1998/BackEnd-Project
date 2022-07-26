import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";
import config from "./config/config.js";
const app = express();
const port = config.PORT ;

app.use(json());
app.use(urlencoded({ extended: true }));

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

