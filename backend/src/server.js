import express, { json, urlencoded } from "express";
import routes from "./routes/index.js";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import { UserDao } from "./models/index.js";
import { hashPassword, isValidPassword } from "./helpers/helpers.js";

const app = express();
const port = config.PORT;

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: config.SESSION_PASSWORD,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const registerStrategy = new Strategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await UserDao.collection.findOne({ username });

      if (existingUser) {
        return done(null, null);
      }

      const newUser = {
        username,
        password: hashPassword(password),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      const createUser = await UserDao.collection.create(newUser);

      done(null, createUser);

    } catch (err) {
      console.log(err);
      done('Error signup user', null)
    }
  }
);

const loginStrategy = new Strategy(async (username, password, done) => {
  try { 
    const user = await UserDao.collection.findOne({ username })

    if(!user || !isValidPassword(password, user.password)){
      return done(null)
    }

    done(null, user)

  }catch(err) {
    console.log(err)
  }
})

passport.use('register', registerStrategy)
passport.use('login', loginStrategy)
passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  UserDao.collection.findById(id, done)
})


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
