import "dotenv/config.js";

export default {
    PORT: process.env.PORT || 8080,
    DB_URL: process.env.DB_URL,
    SESSION_PASSWORD: process.env.SESSION_PASSWORD
}