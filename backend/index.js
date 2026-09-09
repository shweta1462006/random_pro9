const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());

const secretKey = "hellomernstack"; // use process.env.SECRET in real app
let userList = [
  { id: 101, username: "john", password: "$2b$10$...hashed", role: "user" },
  { id: 102, username: "ram", password: "$2b$10$...hashed", role: "user" },
];

// REGISTER
app.post("/register", async (req, res) => {
  const { role = "user", username, password } = req.body;
  if (!username ||!password) return res.status(400).send({ message: "username and password required" });

  if (userList.find(u => u.username === username)) {
    return res.status(409).send({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: userList[userList.length - 1].id + 1,
    username,
    password: hashed,
    role,
  };
  userList.push(newUser);
  res.status(201).send({ user: { id: newUser.id, username: newUser.username, role: newUser.role }, message: "User created" });
});
// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const foundUser = userList.find(u => u.username === username);

  if (!foundUser) return res.status(404).send({ message: "User not found" });

  const isMatched = await bcrypt.compare(password, foundUser.password);
  if (!isMatched) return res.status(401).send({ message: "Invalid password" });

  const token = jwt.sign({ id: foundUser.id, role: foundUser.role }, secretKey, { expiresIn: "30m" });

  res.send({ token, message: "logged in successfully" });
});

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ message: "token not present" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).send({ message: "token not present" });

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid or expired token", error: error.message });
  }
};

const authorizationMiddleware = (req, res, next) => {
  const { id } = req.params;
  // Allow if user is admin OR user is deleting own account
  if (req.user.role === "admin" || String(req.user.id) === String(id)) {
    return next();
  }
  return res.status(403).send({ message: "Not authorized" });
};

app.get("/profile", authMiddleware, (req, res) => {
  const userObj = userList.find(u => u.id == req.user.id);
  if (!userObj) return res.status(404).send({ message: "User not found" });
  const { password,...safeUser } = userObj;
  res.send({ user: safeUser, message: "user retrieved successfully" });
});



app.delete("/:id", authMiddleware, authorizationMiddleware, (req, res) => {
  const { id } = req.params;
  userList = userList.filter(user => String(user.id)!== String(id));
  res.status(200).send({ message: "user deleted", userList });
});

app.listen(5000, () => console.log("server is running on 5000"));