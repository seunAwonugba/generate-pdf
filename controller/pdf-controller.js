import { StatusCodes } from "http-status-codes";
import { PdfService } from "../service/pdf-service.js";

const pdfController = async (req, res, next) => {
    const pdfService = new PdfService();
    const pdfStream = await pdfService.generatePdf();

    try {
        res.status(StatusCodes.OK)
            .set({
                "Content-Length": pdfStream.buffer.length,
                "Content-Type": "application/pdf",
                "Content-disposition": "attachment;filename=test.pdf",
            })
            .end(pdfStream.buffer);
    } catch (error) {
        next(error);
    }
};
export { pdfController };
