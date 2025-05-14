import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());



app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});