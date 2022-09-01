import express, { json, urlencoded } from "express";
import cluster from "cluster";
import os from "os";
import routes from "./routes/index.js";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import auth from "./helpers/passport.js";

const app = express();
const port = parseInt(process.argv[2]) || config.PORT;
const cpus = os.cpus();
const mode = process.argv[3] || "FORK";

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(config.SESSION));
auth(app)

app.use("/", routes);
app.get("*", (req, res) => {
  return res.status(404).json({ message: "This route doesn't exist" });
});

if (mode === "CLUSTER" && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  app.listen(port, (error) => {
    if (!error) {
      console.log(`Server started on port ${port}`);
    } else {
      console.log(`Error: ${error}`);
    }
  });
}
