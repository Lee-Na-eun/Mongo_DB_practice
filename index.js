const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");

const { User } = require("./models/User");

const config = require("./config/key");

// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// application/json
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

mongoose
  .connect(
    config.mongoURI,
    "mongodb+srv://Naeun:peVSS4c@hnwJ86x@youtube-clone.gtu2h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Mongo DB connected...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  // 회원가입할 때 필요한 정보들을 client에 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
