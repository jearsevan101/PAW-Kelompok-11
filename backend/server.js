require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// express app
const app = express();
const kendraanRoutes = require("./routes/kendaraan.routes");
const sewaRoutes = require("./routes/sewa.routes");
const customerRoutes = require("./routes/customer.routes");

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/kendaraan", kendraanRoutes);
app.use("/api/sewa", sewaRoutes);
app.use("/api/customer", customerRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
