import PDFDocument from "pdfkit";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

class PdfService {
    async generatePdf() {
        try {
            const pdfBuffer = await new Promise((resolve) => {
                const currentDir = dirname(fileURLToPath(import.meta.url));
                const doc = new PDFDocument({
                    size: "A4",
                    bufferPages: true,
                });
                const writeStream = fs.createWriteStream(
                    `${currentDir}/../docs/test.pdf`
                );
                doc.pipe(writeStream);

                doc.info.Title = "Test Pdf Docs";
                doc.info.Author = "Awonugba seun";
                doc.info.Subject = "Tests";
                doc.info.Keywords = "pdf, express js, node, pdfkit";
                doc.info.CreationDate = new Date().toDateString();
                doc.info.ModDate = new Date().toDateString();

                doc.image(
                    `${currentDir}/../public/transaction_header.jpg`,

                    { scale: 0.25 }
                );

                doc.moveDown();

                doc.fontSize(25).text(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    {
                        align: "justify",
                    }
                );

                doc.end();
                const buffer = [];
                doc.on("data", buffer.push.bind(buffer));
                doc.on("end", () => {
                    const data = Buffer.concat(buffer);
                    resolve(data);
                });
            });

            return { buffer: pdfBuffer, title: "transaction_pdf" };
        } catch (error) {
            return null;
        }
    }
}

export { PdfService };
