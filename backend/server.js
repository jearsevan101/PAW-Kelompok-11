require("dotenv").config;
const express = require("express");

// express app
const app = express();
const kendraanRoutes = require("./routes/kendaraan.routes");

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/kendaraan", kendraanRoutes);

// listen for requests
app.listen(3000, () => {
  console.log(`listening on port 3000`);
});
