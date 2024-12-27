import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './db';
import defaultErrHandler from './errHandler'
import usersRouter from './api/users';
import moviesRouter from './api/movies';
import actorsRouter from './api/actors';
import reviewsRouter from './api/reviews';
import authenticate from './authenticate';

dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/actors', actorsRouter);
app.use('/api/reviews',reviewsRouter);
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});