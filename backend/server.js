import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import path from "path";

import cookieParser from "cookie-parser";
import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();
app.use(express.json()); //from req body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

//app.get("/", (req, res) => {
//root route http://localhost:5000/
//res.send("server is Ready!");
//});

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`Server Running on port ${PORT}`);
});
