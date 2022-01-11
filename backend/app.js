"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 4201;

const cliente_route = require("./routes/cliente");
const admin_route = require("./routes/admin")

mongoose.connect(
  "mongodb://127.0.0.1:27017/tienda",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port, function () {
        console.log("Server running on port", port);
      });
    }
  }
);

app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json({ limit: "50mb" }));

app.use("/api",cliente_route);
app.use("/api",admin_route);

module.exports = app;
