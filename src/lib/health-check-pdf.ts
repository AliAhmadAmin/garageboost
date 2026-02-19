import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type HealthCheckPdfInput = {
  checkNumber: string;
  checkedBy: string;
  createdAt: Date;
  garageName: string;
  vehicle: {
    vrm: string;
    make: string;
    model: string;
    typeApproval: string | null;
    motExpiry: Date | null;
    mileage: number | null;
  };
  items: Array<{
    category: string;
    item: string;
    status: string;
    notes: string | null;
    estimatedCost: number | null;
  }>;
};

export async function buildHealthCheckPdf(input: HealthCheckPdfInput): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 40;
  let y = height - margin;

  const drawText = (text: string, x: number, yPos: number, size = 10, bold = false) => {
    page.drawText(text, {
      x,
      y: yPos,
      size,
      font: bold ? boldFont : font,
      color: rgb(0, 0, 0),
    });
  };

  drawText(input.garageName, margin, y, 18, true);
  y -= 28;
  drawText(`Health Check: ${input.checkNumber}`, margin, y, 12, true);
  y -= 16;
  drawText(`Checked by: ${input.checkedBy}`, margin, y);
  y -= 14;
  drawText(`Date: ${new Date(input.createdAt).toLocaleDateString("en-GB")}`, margin, y);

  y -= 24;
  drawText("Vehicle", margin, y, 12, true);
  y -= 16;
  drawText(`VRM: ${input.vehicle.vrm}`, margin, y);
  y -= 14;
  drawText(`Make/Model: ${input.vehicle.make} ${input.vehicle.model}`, margin, y);
  y -= 14;
  drawText(`Mileage: ${input.vehicle.mileage ?? "-"}`, margin, y);
  y -= 14;
  drawText(`Type approval: ${input.vehicle.typeApproval ?? "-"}`, margin, y);
  y -= 14;
  drawText(
    `MOT expiry: ${input.vehicle.motExpiry ? new Date(input.vehicle.motExpiry).toLocaleDateString("en-GB") : "-"}`,
    margin,
    y
  );

  y -= 24;
  drawText("Inspection Items", margin, y, 12, true);
  y -= 16;

  for (const entry of input.items) {
    const estimatedCostLabel =
      entry.estimatedCost === null ? "-" : `£${(entry.estimatedCost / 100).toFixed(2)}`;

    drawText(`[${entry.category}] ${entry.item}`, margin, y, 10, true);
    y -= 14;
    drawText(`Status: ${entry.status} | Est. cost: ${estimatedCostLabel}`, margin, y);
    y -= 14;
    drawText(`Notes: ${entry.notes ?? "-"}`, margin, y);
    y -= 18;
  }

  return pdfDoc.save();
}
