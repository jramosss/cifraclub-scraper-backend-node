import express from 'express';
import cors from 'cors';
import { MainRouter } from './src/routes';

const STATIC_PATH = './static';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", MainRouter())
app.use(express.static(STATIC_PATH));

app.listen(8000);

console.log('Server started on port 8000');
