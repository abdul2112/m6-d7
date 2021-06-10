import { Router } from 'express';
// import query from '../../utils/db/index.js';
import Model from '../../utils/model/index.js';

const blogsRouter = Router();

const Blogs = new Model('blogs', 'blog_id');

blogsRouter.post('/', async (req, res, next) => {
  try {
    // create destrucutred elements to hold (category, title, cover, read_time_value, read_time_unit, author, content) in req.body
    // create const dbResponse and await query, INSERT INTO....
    // BEFORE with query =>> const {category,title,cover,read_time_value,read_time_unit,author,content,} = req.body;
    // const dbResponse = await query(`INSERT INTO blogs (category, title, cover,read_time_value, read_time_unit, author,content) VALUES('${category}', '${title}', '${cover}', ${read_time_value}, '${read_time_unit}', '${author}', '${content}') RETURNING *`);
    const dbResponse = await Blogs.create(req.body);

    res.send(dbResponse);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ error: error.message });
  }
});

blogsRouter.get('/', async (req, res, next) => {
  try {
    // create const dbResponse and await query, SELECT....
    // BEFORE with query =>> const dbResponse = await query(`SELECT * FROM blogs ORDER BY blog_id`);
    const dbResponse = await Blogs.find(
      req.query,
      'blog_id, category, title, cover, read_time_value, read_time_unit, author, content'
    );

    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ error: error.message });
  }
});

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    // create const dbResponse and await query, SELECT.... and get blog_id = req.params.id
    // BEFORE with query =>> const dbResponse = await query(`SELECT * FROM blogs WHERE blog_id=${req.params.id}`);
    const dbResponse = await Blogs.findById(req.params.id);

    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ error: error.message });
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    // create const dbResponse and await query, UPDATE....
    // BEFORE with query =>> const {category,title,cover,read_time_value,read_time_unit,author,content,} = req.body;
    // const dbResponse = await query(`UPDATE blogs SET category='${category}', title='${title}', cover='${cover}', read_time_value=${read_time_value}, read_time_unit='${read_time_unit}', author='${author}', content='${content}' WHERE blog_id=${req.params.id} RETURNING * `);
    const dbResponse = await Blogs.update(req.params.id, req.body);

    res.send(dbResponse);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ error: error.message });
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    //create const dbResponse and await query, DELETE....
    // BEFORE with query =>> const dbResponse = await query(`DELETE FROM blogs WHERE blog_id=${req.params.id}`);
    const dbResponse = await Blogs.deleteById(req.params.id);
    if (!dbResponse) {
      res.send(`Blog has been DELETED`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

export default blogsRouter;
