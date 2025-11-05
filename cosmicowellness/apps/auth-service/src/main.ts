import express from 'express';
import cors from 'cors';

import { errorMiddleware } from '../../../packages/error-handler/error-middleware.js';
import cookieParser from 'cookie-parser';

const host = process.env.HOST ?? 'localhost';
// const port = process.env.PORT ? Number(process.env.PORT) : 6001;


const app = express();

app.use(
  cors({
    origin: ['https://localhost:3000'],
    allowedHeaders:["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});
app.use(errorMiddleware)



app.use(express.json());
const port = process.env.PORT || 6001;
const server = app.listen(port,()=>{
  console.log(`Auth Service is running at http:localhost${port}/api`);
})



server.on("error",(error)=>{
  console.error("Server Error:",error);
})