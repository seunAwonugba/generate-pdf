import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { pdf } from "./router/pdf.js";

const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.status(StatusCodes.OK).json({
        success: true,
        data: ReasonPhrases.OK,
    });
});

app.use("/api/v1", pdf);

app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});
