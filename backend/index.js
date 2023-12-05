require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// express app
const app = express();
const kendraanRoutes = require("./routes/kendaraan.routes");
const sewaRoutes = require("./routes/sewa.routes");
const customerRoutes = require("./routes/customer.routes");
const authRoutes = require("./routes/auth.routes.js");

app.use(cors());

const { verifyToken, verifyAdmin } = require("./middleware/auth.js");

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

// // routes
app.use("/api/kendaraan", kendraanRoutes);
app.use("/api/sewa", verifyToken, sewaRoutes);
// app.use("/api/customer", verifyToken, verifyAdmin, customerRoutes);
// app.use("/api/kendaraan", kendraanRoutes);
// app.use("/api/sewa", sewaRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/auth", authRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(8000, () => {
      // Change process.env.PORT to 8000
      console.log("connected to db & listening on port 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
