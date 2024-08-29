import express, { Request, Response } from "express";
import cors from 'cors';
import globalErrorHandler from "./middlewares/globalErrorhandler";
import notFound from "./middlewares/notFound";
import router from "./routes";
const app = express()


//parsers
app.use(express.json());
app.use(cors());

// app.get('/', (req:Request, res:Response) => {
//   
// })

// application routes
app.use('/', router);

const test = (req: Request, res: Response) => {
  res.send('meeting-room-booking-system-server')
};

app.get('/', test);


app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;

// import express from 'express';
// import mainRouter from './routes/index'; // Adjust the import path as needed

// const app = express();

// // Middleware setup
// app.use(express.json()); // or other middleware as needed

// // Main router setup
// app.use(mainRouter); // Use the router from routes/index.ts

// // Error handling, etc.

// export default app;