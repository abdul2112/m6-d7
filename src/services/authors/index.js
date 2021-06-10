import { Router } from 'express';

import Model from '../../utils/model/index.js';

const authorsRouter = Router();

const Authors = new Model('authors', 'author_id');

authorsRouter.post('/', async (req, res, next) => {
  try {
    const dbResponse = await Authors.create(req.body);
    res.send(dbResponse);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ error: error.message });
  }
});

authorsRouter.get('/', async (req, res, next) => {
  try {
    const dbResponse = await Authors.find(
      req.query,
      'author_id, name, surname, avatar'
    );
    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ error: error.message });
  }
});

authorsRouter.get('/:id', async (req, res, next) => {
  try {
    const dbResponse = await Authors.findById(req.params.id);
    res.send(dbResponse);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ error: error.message });
  }
});

authorsRouter.put('/:id', async (req, res, next) => {
  try {
    const dbResponse = await Authors.update(req.params.id, req.body);
    res.send(dbResponse);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ error: error.message });
  }
});

authorsRouter.delete('/:id', async (req, res, next) => {
  try {
    const dbResponse = await Authors.deleteById(req.params.id);
    res.send(dbResponse);
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send({ error: error.message });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// route.post('/:tutor_id/module/:module_id', async (req, res, next) => {
//   try {
//     const { tutor_id, module_id } = req.params;
//     const dbResponse = await query(
//       `INSERT INTO tutor_modules(tutor_id,module_id) VALUES('${tutor_id}','${module_id}')`
//     );
//     res.send(dbResponse);
//   } catch (error) {
//     res.status(error.code || 500).send({ error: error.message });
//   }
// });

// route.get('/:id/author', async (req, res, next) => {
//   try {
//     const dbResponse = await query(`SELECT
//     relation.module_id,
//     m.name AS module_name ,
//     relation.tutor_id,
//     t.name AS tutor_name,
//     t.last_name AS tutor_last_name
//       FROM tutor_modules
//       AS relation
//       INNER JOIN tutors AS t ON relation.tutor_id=t.tutor_id
//       INNER JOIN modules AS m ON relation.module_id=m.module_id
//       WHERE t.tutor_id=${req.params.id}
//   `);
//     res.send(dbResponse);
//   } catch (error) {
//     res.status(error.code || 500).send({ error: error.message });
//   }
// });

// route.delete('/:tutor_id/module/:module_id', async (req, res, next) => {
//   try {
//     const { tutor_id, module_id } = req.params;
//     const dbResponse = await query(
//       `DELETE FROM tutor_modules WHERE tutor_id=${tutor_id} AND module_id=${module_id}`
//     );
//     res.send(dbResponse);
//   } catch (error) {
//     res.status(error.code || 500).send({ error: error.message });
//   }
// });

export default authorsRouter;
