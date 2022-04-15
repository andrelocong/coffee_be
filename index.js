import express, { urlencoded, json } from "express";
import db from "./config/database.js";
import cors from "cors";
import adminRoutes from "./routes/admin.route.js";
import clientRoutes from "./routes/client.route.js";
import path from "path";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 5000;

try {
	await db.authenticate();
	console.log("Database connected...");
} catch (error) {
	console.log("Connection error...", error);
}

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.static(path.join("./public")));

app.use("/api", clientRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => console.log("server running at port 5000"));
