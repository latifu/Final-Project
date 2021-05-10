require("dotenv").config();

const express = require("express");
const cors = require("cors");

require("./config/dbConnect");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", require("./routers/authRouter"));
app.use("/parents", require("./routers/parentRouter"));
app.use("/children", require("./routers/childRouter"));

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ message: error.message });
});

app.listen(4000, () => console.log("Server up and running"));
