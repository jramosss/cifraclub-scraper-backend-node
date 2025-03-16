import express from 'express';
import cors from 'cors';
import { MainRouter } from './src/routes';
// Do not remove this import
import { firebase } from './src/firebase';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", MainRouter())

app.listen(8000);

console.log('Server started on port 8000');
