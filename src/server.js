import express from 'express';
// import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  catchAllErrorHandler,
} from './errorHandlers.js';
import blogsRouter from './services/blogs/index.js';
const app = express();

const port = process.env.PORT || 3001;

// ******** MIDDLEWARES ************

app.use(express.json());
// server.use(cors());

// ******** ROUTES ************
app.use('/blogs', blogsRouter);

// ******** ERROR MIDDLEWARES ************

app.use(badRequestErrorHandler);
app.use(notFoundErrorHandler);
app.use(catchAllErrorHandler);

console.table(listEndpoints(app));

app.listen(port, () => {
  console.log(`Connected and running on port ${port} ✅`);
});

app.on('error', (err) => console.log('server is not running ', err));
