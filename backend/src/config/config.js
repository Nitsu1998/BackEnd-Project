import "dotenv/config.js";

export default {
  PORT: process.env.PORT || 8080,
  DB_URL: process.env.DB_URL,
  SESSION: {
    secret: process.env.SESSION_PASSWORD,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
  },
};
