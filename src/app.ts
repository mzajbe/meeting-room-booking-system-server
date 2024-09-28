// import express, { Request, Response } from "express";
// import cors from 'cors';
// import globalErrorHandler from "./middlewares/globalErrorhandler";
// import notFound from "./middlewares/notFound";
// import router from "./routes";
// import cookieParser from 'cookie-parser'


// const app = express()


// //parsers
// app.use(express.json());
// app.use(cookieParser())
// app.use(cors({origin:'http://localhost:5173',credentials:true}));



// // application routes
// app.use('/', router);

// const test = (req: Request, res: Response) => {
//   res.send('meeting-room-booking-system-server')
// };

// app.get('/', test);


// app.use(globalErrorHandler);

// //Not Found
// app.use(notFound);

// export default app;

import express, { Request, Response } from "express";
import cors from 'cors';
import globalErrorHandler from "./middlewares/globalErrorhandler";
import notFound from "./middlewares/notFound";
import router from "./routes";
import cookieParser from 'cookie-parser';

const app = express();

// Allowed origins: local development and production
const allowedOrigins = [
  'http://localhost:5173', // Development URL
  'https://meeting-room-booking-system-client-5ybk.vercel.app' // Vercel frontend URL
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow cookies and credentials
}));

// parsers
app.use(express.json());
app.use(cookieParser());

// application routes
app.use('/', router);

const test = (req: Request, res: Response) => {
  res.send('meeting-room-booking-system-server');
};

app.get('/', test);

app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;
