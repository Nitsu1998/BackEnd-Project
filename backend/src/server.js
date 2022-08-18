import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy } from "passport-local";
import { UserDao } from "./models/index.js";

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
      ttl: 60,
    }),
    secret: "ecommerce",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const signupStrategy = new Strategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    const existingUser = UserDao.collection.findOne({ username })
  }
);

app.use("/", routes);

app.get("*", (req, res) => {
  return res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(port, (error) => {
  if (!error) {
    console.log(`Server started on port ${port}`);
  } else {
    console.log(`Error: ${error}`);
  }
});
