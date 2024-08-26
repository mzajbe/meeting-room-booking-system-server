import express, { Request, Response } from "express";
const app = express()


app.get('/', (req:Request, res:Response) => {
  res.send('meeting-room-booking-system-server')
})



export default app;