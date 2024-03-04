import fs from 'fs';
import PDFDocument from 'pdfkit';

export async function generatePDF(inventario) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      doc.pipe(fs.createWriteStream('inventario.pdf'));

      // Agregar contenido al PDF basado en los datos del inventario
      doc.text('Inventario:');
      inventario.forEach((item, index) => {
        doc.text(`${index + 1}. Producto: ${item.nombre}, Cantidad: ${item.cantidad}`);
      });

      doc.end();
      resolve(fs.readFileSync('inventario.pdf'));
    } catch (error) {
      reject(error);
    }
  });
}
