import "dotenv/config.js";

export default {

    PORT: process.env.PORT,
    mongodb: {
        connection: "mongodb+srv://agus:agus123@cluster0.jqucz3e.mongodb.net/ecommerce?retryWrites=true&w=majority"
    },
}