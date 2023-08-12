const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", require("./routes/userRoutes"));
app.use("/subGreddiits", require("./routes/subGreddiitRoutes"));
app.use("/posts", require("./routes/postRoutes"));

app.listen(port, () => console.log(`Server start on port ${port}`));
