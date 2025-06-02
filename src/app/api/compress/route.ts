import { PDFDocument } from "pdf-lib";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return new Response(JSON.stringify({ error: "Keine Datei erhalten." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const originalFileName = file.name.replace(/\.pdf$/, "");
  const compressedFileName = `${originalFileName}_compressed.pdf`;

  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  try {
    const pdfDoc = await PDFDocument.load(uint8Array);
    const compressedPdfBytes = await pdfDoc.save();

    return new Response(compressedPdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${compressedFileName}"`,
        "X-Compressed-Size": compressedPdfBytes.byteLength.toString(),
        "Content-Length": compressedPdfBytes.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("PDF-Komprimierung fehlgeschlagen:", error);
    return new Response(JSON.stringify({ error: "Fehler beim PDF." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
