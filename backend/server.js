const cors = require("cors");
console.log("SERVER FILE ABSOLUTELY LOADED");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());

const connectDB = require("./config/db");
connectDB();

const userRoutes = require("./routes/userRoutes");

app.use("/", userRoutes);
console.log("ROUTES MOUNTED");

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

