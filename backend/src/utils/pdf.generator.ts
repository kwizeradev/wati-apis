import PDFDocument from 'pdfkit';

import type { DocumentPayload } from '../modules/documents/documents.types';

type PdfResult = {
  buffer: Buffer;
  fileName: string;
};

export async function generateDocumentPdf(payload: DocumentPayload): Promise<PdfResult> {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    info: {
      Title: `Document - ${payload.referenceId}`,
      Author: 'WATI WhatsApp Automation Demo',
    },
  });

  const chunks: Buffer[] = [];

  doc.on('data', (chunk: Buffer) => {
    chunks.push(chunk);
  });

  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });

  doc.font('Helvetica');

  doc
    .fillColor('#0f172a')
    .fontSize(22)
    .text('Digital Line Services', { align: 'left' })
    .moveDown(0.2);

  doc
    .fillColor('#64748b')
    .fontSize(11)
    .text('WhatsApp Delivery Confirmation', { align: 'left' })
    .moveDown(1);

  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .lineWidth(1)
    .strokeColor('#e2e8f0')
    .stroke();

  doc.moveDown(1);

  const labelColor = '#334155';
  const valueColor = '#0f172a';

  const renderRow = (label: string, value: string) => {
    doc.fillColor(labelColor).fontSize(10).text(label.toUpperCase());
    doc.fillColor(valueColor).fontSize(12).text(value);
    doc.moveDown(0.8);
  };

  renderRow('Full name', payload.fullName);
  renderRow('WhatsApp number', payload.whatsappNumber);
  renderRow('Reference ID', payload.referenceId);
  renderRow('Amount', payload.amount.toFixed(2));
  renderRow('Date', new Date(payload.dateIso).toLocaleString());

  doc.fillColor(labelColor).fontSize(10).text('DESCRIPTION');
  doc.moveDown(0.3);
  doc
    .fillColor(valueColor)
    .fontSize(12)
    .text(payload.description, {
      align: 'left',
      lineGap: 2,
    });

  doc.moveDown(2);

  doc
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .lineWidth(1)
    .strokeColor('#e2e8f0')
    .stroke();

  doc.moveDown(0.8);
  doc
    .fillColor('#64748b')
    .fontSize(10)
    .text('Generated automatically and delivered via Digital Line Services API.', {
      align: 'left',
    });

  doc.end();

  const buffer = await done;
  const fileName = `document-${payload.referenceId}.pdf`;

  return { buffer, fileName };
}
