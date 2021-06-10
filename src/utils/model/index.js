import query from '../db/index.js';

// OOP -> Object oriented programming

// ORM  -> Object Relational Mapping

class Model {
  constructor(name, id_name) {
    this.name = name;
    this.id_name = id_name;
  }

  async create(modelValues) {
    if (Object.values(modelValues).length > 0) {
      let queryText = `INSERT INTO ${this.name} (${Object.keys(
        modelValues
      ).join(',')}) VALUES(${Object.values(modelValues)
        .map((v) => {
          return "'" + v + "'";
        })
        .join(',')}) RETURNING * ;`;
      const rows = await query(queryText);
      return rows;
    } else {
      const error = new Error('Values must be provided');
      error.code = 400;
      throw error;
    }
  }

  async find(filter, projection) {
    let queryText = `SELECT ${projection ? projection : '*'} FROM ${
      this.name
    } ORDER BY ${this.name}`;
    // {name:'Gregorio'} => [[name,'Gregorio']]
    if (Object.values(filter).length > 0) {
      const entries = Object.entries(filter);
      const whereConditions = entries
        .map(([key, value]) => `${key}='${value}'`)
        .join(' AND ');
      queryText += `WHERE ${whereConditions};`;
    }
    const rows = await query(queryText);
    return rows;
  }

  async findById(id) {
    if (!id) {
      throw new Error('Id must be provided to findById');
    } else {
      const row = await query(
        `SELECT * FROM ${this.name} WHERE ${this.id_name}=${id}`
      );
      if (row) {
        return row;
      } else {
        const error = new Error('Not found!');
        error.code = 404;
        throw error;
      }
    }
  }

  async update(id, toUpdate) {
    if (id && Object.values(toUpdate).length > 0) {
      let queryText = `UPDATE  ${this.name} SET ${Object.entries(toUpdate)
        .map(([key, value]) => `${key}='${value}'`)
        .join(',')} WHERE ${this.id_name}=${id} RETURNING *`;
      const dbResponse = await query(queryText);
      return dbResponse;
    } else {
      const error = new Error('Id and update must be provided');
      error.code = 400;
      throw error;
    }
  }

  async deleteById(id) {
    if (id) {
      let queryText = `DELETE FROM ${this.name} WHERE ${this.id_name}=${id};`;
      const rows = await query(queryText);
      return rows;
    } else {
      const error = new Error('Id  must be provided');
      error.code = 400;
      throw error;
    }
  }
}

export default Model;
