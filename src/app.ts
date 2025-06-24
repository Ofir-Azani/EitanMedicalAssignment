import express, { Response } from "express";
import cors from "cors";
import { v1Router } from "./api/v1/index.js";


const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1', v1Router);

app.use((_, res: Response) => {
    res.status(404).json({ error: "Not Found" });
    return;
});


export default app;