// src/index.js
import express from "express";
import dotenv from "dotenv";
import {authMiddleware} from "./middlewares/auth-middleware";
import {errorMiddleware} from "./middlewares/error-middleware";
import authRouter from "./routes/auth/auth";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions))

app.use(authRouter)


app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});