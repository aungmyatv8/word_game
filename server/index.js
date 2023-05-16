const express = require('express')
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://aungmyintmyat:veomas123@cluster0.18eromm.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true },)
.then(_ => console.log("mongodb connected"))
.catch(err => console.error(err))

app.get("/test", (_, res) => res.json({message: "hello"}))

app.listen(PORT, () => console.log(`started started on ${PORT}`))