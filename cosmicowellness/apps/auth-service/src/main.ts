import express from 'express';
import cors from 'cors';

import { errorMiddleware } from '../../../packages/error-handler/error-middleware.js';
import cookieParser from 'cookie-parser';
import router from './routes/auth.router.js';
import swaggerUi from 'swagger-ui-express';
 


const swaggerDocument = require('./swagger-output.json');
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
app.use ("/api-docs", express.static('swagger-ui'));
app.use(errorMiddleware)
app.use("/api",router);



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  
app.get('docs-json',(req,res)=>{
  res.json(swaggerDocument);
})



app.use(express.json());
const port = process.env.PORT || 6001;
const server = app.listen(port,()=>{
  console.log(`Auth Service is running at http:localhost${port}/api`);
  console.log(`Swagger docs available at http:localhost${port}/api-docs`);
})



server.on("error",(error)=>{
  console.error("Server Error:",error);
  
})