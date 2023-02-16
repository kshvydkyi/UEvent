import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

// import axios from 'axios';

import AppRouter from './routes/index.js';
// import connectDB from './config/database';
// import ErrorHandler from './middleware/errorHandler.middleware';

const corsOptions = {
  origin: 'CORS_URL',
  credentials: true,
  optionSuccessStatus: 200
}
const app = express();
const router = new AppRouter(app);
// // Connect to MongoDB
// connectDB();

// Express configuration
app.set('port', process.env.PORT || 8080);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(ErrorHandler);

router.init();

const port = app.get('port');

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export default server;