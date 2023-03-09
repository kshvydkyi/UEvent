import pdf from 'html-pdf-node';
import fs from 'fs'
import path from 'path'

export const createPdf = async (purchase) => {
const picPath = `${path.resolve()}/assets/event_pic/${purchase.eventPic}`
console.log(picPath);
const html = `
    <html>
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: PT-Sans, sans-serif;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 50px;
          }
          .logo {
            width: 150px;
          }
          .event-image {
            width: 300px;
            margin-bottom: 50px;
          }
          .event-name {
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 50px;
          }
          .ticket-details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;
          }
          .ticket-detail {
            flex-basis: 50%;
          }
          .qr-code {
            width: 150px;
            margin-top: 50px;
            margin-bottom: 50px;
          }
          .website {
            font-size: 10px;
            text-align: center;
            margin-top: 50px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="http://localhost:8080/event-pic/${purchase.eventPic}" alt="Event Logo" class="logo" />
          <div class="event-name">${purchase.title} Ticket</div>
        </div>
        
        <div class="ticket-details">
          <div class="ticket-detail">
            <div>Email: ${purchase.email}</div>
          </div>
          <div class="ticket-detail">
            <div>Event: ${purchase.title}</div>
            <div>Date: ${purchase.startDate} - ${purchase.endDate}
            </div>
            <div>Location: ${purchase.location.title}\n${purchase.location.country}, ${purchase.location.city}, вул. ${purchase.location.street} ${purchase.location.house}</div>
          </div>
        </div>
        <div class="website">Visit our website at www.kvitochok.com for more details. © 2023 Anonymous team. All rights reserved.</div>
      </body>
    </html>
  `;
  
  const options = {
    format: 'A4',
    margin: {
      top: '50px',
      bottom: '50px',
      left: '50px',
      right: '50px',
    },
  };
  const pdfBuffer = await pdf.generatePdf({ content: html }, options);
  fs.writeFileSync(`${path.resolve()}/assets/tickets/${purchase.token.id}.pdf`, pdfBuffer);
}