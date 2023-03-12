import pdf from 'html-pdf-node';
import fs from 'fs'
import path from 'path'
import qrcode from 'qrcode'
export const createPdf = async (purchase) => {
  try {
    const url = `http://localhost:3000/check-ticket/${purchase.token.id}`
    qrcode.toFile(`${path.resolve()}/assets/qr-codes/${purchase.token.id}.png`, url, { width: 200 });

    const html = `
        <html lang="en">

        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet">
          <title>Ticket</title>
        </head>
        <style>
          * {
            margin: 0;
            padding: 0;
          }

          body {
            font-family: PT-Sans, sans-serif;
          }

          .container {
            display: flex;
            flex-direction: column;
            border-radius: 20px;
            position: absolute;
            border: 3px solid black;
          }

          .logo-sitename {
            display: flex;
            align-items: center;
            padding: 30px;
            margin-right: 120px;
            margin-left: 120px;
          }

          .sitename {
            margin-left: 24px;
            font-weight: 700;
          }

          .info-container {
            padding: 30px;
            display: flex;

          }

          .info-container>img {
            border-radius: 20px;
          }

          .info {
            display: flex;
            flex-direction: column;

          }

          .info-text {
            margin-left: 24px;
            font-weight: 400;
            margin-top: 20px;
          }
          .qr-code{
            padding: 30px;
            display: flex;
          }
          .footer-text{
            margin-left: 5px;
            font-weight: 400;
            font-size: 14px;
            margin-top: 20px;
            margin-bottom: 20px;
            text-align: center;
          }
        </style>

        <body>
          <div class="container">
            <div class="logo-sitename">
              <img src="http://localhost:8080/event-pic/logo.png" width="53" height="62">
              <h1 class="sitename">Kvitochok.com</h1>
            </div>
            <div class="info-container">
              <img src="http://localhost:8080/event-pic/${purchase.eventPic}" alt="event-pic" width="200" height="300">
              <div class="info">
                <h2 class="sitename">${purchase.title}</h2>
                <p class="info-text">
                  ${purchase.location.title} - ${purchase.location.country}, ${purchase.location.city}, вул. ${purchase.location.street} ${purchase.location.house}
                </p>
                <p class="info-text">
                  ${purchase.startDate} - ${purchase.endDate}
                </p>
                <p class="info-text">${purchase.email}</p>
              </div>
            </div>
            <div class="qr-code">
              <img src="http://localhost:8080/qr-codes/${purchase.token.id}.png" alt="qr-code" width="200" height="200">
              <p class="info-text">Унікальний qr-code може бути використаний
              лише один раз. Не копіюйте цей квиток і не
              публікуйте його в інтернеті. Це може стати
              перешкодою вашого входу на подію. За
              збереження даних організатор відповідальності
              не несе.</p>
            </div>
            <div>
              <p class="footer-text">Visit our website at www.kvitochok.com for more details. © 2023 Anonymous team. All rights reserved.</p>
            </div>
          </div>
        </body>

        </html>
          `;

    const options = {
      format: 'A4',
      margin: {
        top: '50px',
        bottom: '50px',
        left: '100px',
        right: '100px',
      },
    };
    const pdfBuffer = await pdf.generatePdf({ content: html }, options);
    fs.writeFileSync(`${path.resolve()}/assets/tickets/${purchase.token.id}.pdf`, pdfBuffer);
  }
  catch (e) {
    throw new Error(e);
  }
}