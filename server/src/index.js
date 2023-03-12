import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path  from 'path'

import AppRouter from './routes/router.js';

import ErrorHandler from './middleware/errorHandler.middleware.js';

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
const app = express();
const router = new AppRouter(app);

// Express configuration
app.set('port', process.env.PORT || 8080);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ErrorHandler);

router.init();

app.use('/avatars', express.static(`${path.resolve()}/assets/avatars`));
app.use('/event-pic', express.static(`${path.resolve()}/assets/event_pic`));
app.use('/qr-codes', express.static(`${path.resolve()}/assets/qr-codes`));
app.use('/tickets', express.static(`${path.resolve()}/assets/tickets`));
const port = app.get('port');

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;