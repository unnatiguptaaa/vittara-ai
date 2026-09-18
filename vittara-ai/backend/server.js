import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";

import chatRoutes from "./src/routes/chat.js";
import loanRoutes from "./src/routes/loan.js";
import insuranceRoutes from "./src/routes/insurance.js";
import compareRoutes from "./src/routes/compare.js";
import documentRoutes from "./src/routes/document.js";
import jargonRoutes from "./src/routes/jargon.js";

dotenv.config();

// Fix MongoDB Atlas SRV DNS issue
dns.setServers(["8.8.8.8"]);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Vittara AI Backend",
  });
});

// Routes
app.use("/api/chat", chatRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/document", documentRoutes);
app.use("/api/jargon", jargonRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// Start server
async function start() {
  try {
    if (process.env.MONGO_URI) {
      console.log("🔄 Connecting to MongoDB...");

      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      });

      console.log("✔ MongoDB connected");
    } else {
      console.log(
        "⚠ No MONGO_URI set — running without persistent storage (demo mode)"
      );
    }
  } catch (err) {
    console.log(
      "⚠ MongoDB connection failed — continuing in demo mode:",
      err.message
    );
  }

  app.listen(PORT, () => {
    console.log(
      `🚀 Vittara AI backend running on http://localhost:${PORT}`
    );
  });
}

start();