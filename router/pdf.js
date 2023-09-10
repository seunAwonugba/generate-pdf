import express from "express";
import { pdfController } from "../controller/pdf-controller.js";

const pdf = express.Router();

pdf.get("/pdf", pdfController);

export { pdf };
