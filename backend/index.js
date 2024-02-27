const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const userRouter = require("./routes/user");
const videoRouter = require("./routes/room");

const app = express();

const allowedOrigin = 'http://localhost:5173'; // Replace with your frontend app's URL

const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);
app.use(videoRouter)
const PORT = process.env.PORT||3001;
app.listen(PORT, () => {
  console.log(`connected at ${PORT}`);
})

mongoose.connect(
  "mongodb+srv://dummyuser:note5pro@cluster0.cibqhhn.mongodb.net/?retryWrites=true&w=majority",
).then(()=>{
    console.log("connected to db");
}).catch(err => console.log(err,"error"));

