const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/check", (req, res) => {
  res.send("Oksadasd!");
});

app.listen(80, () => {
  console.log("API up!");
});