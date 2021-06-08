import { Router } from 'express';
import query from '../../utils/db/index.js';

const blogsRouter = Router();

blogsRouter.post('/', async (req, res, next) => {
  try {
    // create destrucutred elements to hold (category, title, cover, read_time_value, read_time_unit, author, content) in req.body

    const {
      category,
      title,
      cover,
      read_time_value,
      read_time_unit,
      author,
      content,
    } = req.body;
    // create const dbResponse and await query, insert into....
    const dbResponse = await query(
      `INSERT INTO blogs (
      category, 
      title, 
      cover,
      read_time_value, 
      read_time_unit, 
      author,
      content) VALUES('${category}', '${title}', '${cover}', ${read_time_value}, '${read_time_unit}', '${author}', '${content}') RETURNING *`
    );
    res.send(dbResponse);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

blogsRouter.get('/', async (req, res, next) => {
  try {
    // create const dbResponse and await query, SELECT....
    const dbResponse = await query(`SELECT * FROM blogs ORDER BY blog_id`);
    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    // create const dbResponse and await query, SELECT.... and get blog_id = params.id
    const dbResponse = await query(
      `SELECT * FROM blogs WHERE blog_id=${req.params.id}`
    );
    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const {
      category,
      title,
      cover,
      read_time_value,
      read_time_unit,
      author,
      content,
    } = req.body;

    const dbResponse = await query(
      `UPDATE blogs SET 
      category='${category}', title='${title}', cover='${cover}', read_time_value=${read_time_value}, read_time_unit='${read_time_unit}', 
      author='${author}', content='${content}' WHERE blog_id=${req.params.id} RETURNING * `
    );
    res.send(dbResponse);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    //create const dbResponse and await query, DELETE....
    const dbResponse = await query(
      `DELETE FROM blogs WHERE blog_id=${req.params.id}`
    );
    if (!dbResponse) {
      res.send(`Blog has been DELETED`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

export default blogsRouter;
