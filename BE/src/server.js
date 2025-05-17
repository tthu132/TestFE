import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(express.json());
app.use(cors())
app.use(bodyParser.json())
routes(app)

mongoose.connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log('connect success!');
  })
  .catch((erro) => {
    console.log(erro);
  })

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});