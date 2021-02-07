const mongoose = require("mongoose");

const connectionOptions = {
  username: process.env.MONGO_USER || "",
  password: process.env.MONGO_PASSWORD || "",
  host: process.env.MONGO_HOST || "",
  db: process.env.MONGO_DB || "",
  localHost: process.env.MONGO_LOCAL_HOST || "",
};

function createLocalConnection({ localHost, db }) {
  return `mongodb://${localHost}/${db}`;
}

/*
this is for server connection

function createUri({ username, password, host, db }) {
  return `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;
} */

function connection(options = connectionOptions) {
  return mongoose.connect(createLocalConnection(options), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

module.exports = connection;
