const express = require('express')
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://aungmyintmyat:veomas123@cluster0.6q07t2s.mongodb.net/?retryWrites=true&w=majority")
.then(result => console.log("result", result))
.catch(err => console.error(err))

app.get("/test", (_, res) => res.json({message: "hello"}))

app.listen(PORT, () => console.log(`started started on ${PORT}`))