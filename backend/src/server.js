import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const port = config.PORT;
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongodb.connection,
      mongoOptions,
      ttl: 60, //600 para que sean 10 minutos
    }),
    secret: "ecommerce",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60000, //600000 para que sean 10 minutos
    },
  })
);
app.use("/", routes);

app.get("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server started on port ${port}`);
  } else {
    console.log(`Error: ${error}`);
  }
});
