import { generatePDF } from '../utils/pdfGenerator';
import { config, SES } from 'aws-sdk';

config.update({
  accessKeyId: 'TU_ACCESS_KEY_ID',
  secretAccessKey: 'TU_SECRET_ACCESS_KEY',
  region: 'us-west-2' // Cambia esto a la región correcta de AWS
});

const ses = new SES({ apiVersion: '2010-12-01' });

export async function descargarPDFyEnviarCorreo(req, res) {
  try {
    const { inventario, destinatario } = req.body; // Obtén el inventario y el destinatario del cuerpo de la solicitud

    // Generar el PDF
    const pdfBuffer = await generatePDF(inventario);

    // Enviar el PDF por correo electrónico
    const params = {
      Source: 'tu@email.com', // Dirección de correo electrónico del remitente
      Destination: {
        ToAddresses: [destinatario] // Dirección de correo electrónico del destinatario
      },
      Message: {
        Subject: {
          Data: 'Inventario' // Asunto del correo electrónico
        },
        Body: {
          Text: {
            Data: 'Adjunto se encuentra el inventario en formato PDF.' // Cuerpo del correo electrónico
          },
          Attachments: [
            {
              Filename: 'inventario.pdf',
              Content: pdfBuffer
            }
          ]
        }
      }
    };

    ses.sendEmail(params, function (err, data) {
      if (err) {
        console.error('Error al enviar el correo electrónico:', err);
        res.status(500).json({ message: 'Error al enviar el correo electrónico' });
      } else {
        console.log('Correo electrónico enviado:', data);
        res.status(200).json({ message: 'PDF enviado por correo electrónico exitosamente' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al generar el PDF o enviar el correo electrónico' });
  }
}
