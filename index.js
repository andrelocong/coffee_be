import express, { urlencoded, json } from "express";
import db from "./config/database.js";
import cors from "cors";
import coffeeRoutes from "./routes/api.js";
import path from "path";

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
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options("*", cors());

app.use(express.static(path.join("./public")));

app.use("/", coffeeRoutes);

app.listen(port, () => console.log("server running at port 5000"));
