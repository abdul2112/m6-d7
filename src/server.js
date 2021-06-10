import express from 'express';
import listEndpoints from 'express-list-endpoints';
import blogsRouter from './services/blogs/index.js';
import authorsRouter from './services/authors/index.js';
import {
  badRequestErrorHandler,
  notFoundErrorHandler,
  catchAllErrorHandler,
} from './errorHandlers.js';

const app = express();

const port = process.env.PORT || 3001;

// ******** MIDDLEWARES ************

app.use(express.json());

// ******** ROUTES ************
app.use('/blogs', blogsRouter);
app.use('/authors', authorsRouter);

// ******** ERROR MIDDLEWARES ************

app.use(badRequestErrorHandler);
app.use(notFoundErrorHandler);
app.use(catchAllErrorHandler);

console.table(listEndpoints(app));

app.listen(port, () => {
  console.log(`Connected and running on port ${port} ✅`);
});

app.on('error', (err) => console.log('server is not running ', err));
