const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
var uuid = require('uuid-random');
//generate key
const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCQ62OU1frvJ0x5
vYI7h0s4S34SzMh+uOwId3o81XfDa8Y8MPooHhNKOF6GBmy3qwO/JGjiMSSVXaW/
cqMl/52rrP6paa2v1yDs3KKUuyZ3vewlkvY+kyoR7UnOQTU3dBWNp2B1H/JtBmGZ
7/cDlG8jnqELuucK2UuoKQ3IltfpLieKP7x1QGzJZxT03NkKsup/mU4y9JnFKgBG
p6baHgP7ujdbV5fxyZZD6ZjGyP/uO9juvraURE7Zquv1mIok1exxY7kPC42AmgJ3
7Q5XTt8KF4p7oDD1vYsxe83fuHyJ+2qXjnvcu+aGr6v4q3EQ8YFVVtM/xcGhdzrh
HLlR8ZKtAgMBAAECggEAHHxIXK8a3ftpitx3RuA3Jt+f7m4WUuJict+ZRW/oVJ9Q
nfA6m7wdqo8d9VY59HhHCkFL5HooaLu5osIT05pFEcO1YvOE0nWE4UoVIwsOaqcI
TfJvOKmQsWllAofKwBWvTuLBkQQwkMGaWbnTYf7BQc0idr3MQFOqDWnUbcNIuWqv
TSar/37doXhIOrHGwwpwp9pQi/OZP3b3OAwcWrP9babNPHESUzF4IRulUiFrCoMQ
2ynZnt66HN574B581Szaz/KbJvKqZXlW6rrb1fUHsin9bKjD45oZwfWeDHEZLcFN
ur86/29RE2gmuicYbBrPM6vxfO2tMrNgna7RHNYrQQKBgQDI6GtH4mgp945KuZMC
2d37eMxXnzwXva2C7eldLibOdDlpR9y/2VFs3C+gMIHxfGjxMY5VfdkpyhnvErbc
bTpJpXyVHfxlAdjEccGAN/5YsQqpleN4eGQ2bUtQ7Eg9rIj+R9D14DiJkPiR6gXY
8SwduyJz/7ukSZXPh6SJmSb6JQKBgQC4qKB8PbuVC9ZKv64gBXxEjYSojTMZPUHu
XMVavv8x/8Sh+UgS9Abmnxii0ii/RfFc3TWwhjcjZkdngtl43NDa8NaBRczL4rhA
htSUvlu9aUXNVGyfcViWs+f+CvHnDO7gSZm3xizJm/xLu59Nk+Hwpi9XUtDg9mnW
zMg3wd4b6QKBgEkuX+WPUuH2ip4tep9PPMyc89H27qy3KrzGbHrElN4e98qhooc/
YamFitOO18ZeytsQcggyDyhptYigCHvCTbkFzpuCkK06PvtPdGx/+OXVl0yujG0V
bWtl5ElVx/qvHjeBcVwekHmLlP+Rfw/GyYsK30HhpTfyld9CSWzVnJ0BAoGAQnnq
NG/g3LpDLeutWre+0csEi80xLQ/hcVcScSW7JxvFhO4B5VjWNyXlL5BqvNkIF/9G
ucLHjMXgRMJVWe5cfcUf46/mFywKWqhvVRDmY9zHFTEkXY3nb3FavhjgluYQBMxa
O09rhjTScc0cf0gSmZiqCEy3B5WN6pcUKQZw2CkCgYAVUdmsWzNu6sAh1g8mu9M8
aS95HDdFfzgeIGIV0nyshdJrZuWHHUeaTI31lWSnS1ho6kgCnmpW7zyI/nruSOOe
vVTxmkbaghsEiqS2wsy1OQzGlvGyaE8v4uEBNkbuswOd7k/oqVjKG1lqU0IOvjsg
Up6NMF1dnbaft+8cC15ExA==
-----END PRIVATE KEY-----
`;
const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAkOtjlNX67ydMeb2CO4dL
OEt+EszIfrjsCHd6PNV3w2vGPDD6KB4TSjhehgZst6sDvyRo4jEklV2lv3KjJf+d
q6z+qWmtr9cg7NyilLsmd73sJZL2PpMqEe1JzkE1N3QVjadgdR/ybQZhme/3A5Rv
I56hC7rnCtlLqCkNyJbX6S4nij+8dUBsyWcU9NzZCrLqf5lOMvSZxSoARqem2h4D
+7o3W1eX8cmWQ+mYxsj/7jvY7r62lERO2arr9ZiKJNXscWO5DwuNgJoCd+0OV07f
CheKe6Aw9b2LMXvN37h8iftql4573Lvmhq+r+KtxEPGBVVbTP8XBoXc64Ry5UfGS
rQIDAQAB
-----END PUBLIC KEY-----
`
const generate = (privateKey, { id, name, email, avatar, appId, kid }) => {
  const now = new Date()
  const jwtToken = jwt.sign({
    aud: 'jitsi',
    context: {
      user: {
        id,
        name,
        avatar,
        email: email,
        moderator: 'true'
      },
      features: {
        livestreaming: 'true',
        recording: 'true',
        transcription: 'true',
        "outbound-call": 'true'
      }
    },
    iss: 'chat',
    room: '*',
    sub: appId,
    exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
    nbf: (Math.round((new Date).getTime() / 1000) - 10)
  }, privateKey, { algorithm: 'RS256', header: { kid } })
  return jwtToken;
}






// Signup Route
userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    if (!email || !password || !userName) {
      return res.status(400).json({ msg: "Please enter all the fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password should be atleast 6 characters" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with the same email already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 8);
    const newUser = new User({ email, password: hashedPassword, userName });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log(req.body)
      return res.status(400).json({ msg: "Please enter all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .send({ msg: "User with this email does not exist" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ msg: "Incorrect password." });
    }
    const API_KEY = "8b1377ea-05da-45f5-8a72-2a973ac1e218"
const SECRET = "e012e88eb4fc9397174ec422f227b29fa18ed33579e9d2d46c1e432f054678d9"

  const options = { 
  expiresIn: '120m', 
  algorithm: 'HS256' 
  };
  const payload = {
  apikey: API_KEY,
  permissions: [`allow_join`], // `ask_join` || `allow_mod` 
  };

const token = jwt.sign(payload, SECRET, options);
    res.json({ token, user: { id: user._id, username: user.userName } });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err.message)
  }
});

// TO CHECK IF TOKEN IS VALID
userRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// to get the users credentials
userRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.userName,
    id: user._id,
  });
});

module.exports = userRouter;