require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// HARDCODED CORS (No .env reliance to avoid quote issues)
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5175"], // Dono ports allow hain
    credentials: true,
  })
);

app.use(express.json());
// Ye code har request ko terminal mein print karega
app.use((req, res, next) => {
  console.log(`️ Incoming Request: ${req.method} ${req.url}`);
  next();
});
app.use(cookieParser());

// Home route
app.get("/", (req, res) => {
  res.send("TravelVista API is running!");
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Database connection and server startup
async function startServer() {
  try {
    if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
      throw new Error("MONGO_URI or JWT_SECRET is missing from server/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error.message);
    process.exit(1);
  }
}

startServer();