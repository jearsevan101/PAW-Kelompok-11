import express from 'express';

const app = express();

app.use("/", (req, res, next) => {
    res.send("Hello World");
}); 

const KendaraanRouter = require('./routers/kendaraan.router');
app.use('/kendaraan', KendaraanRouter);

app.listen(5000);