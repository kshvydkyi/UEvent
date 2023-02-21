import db from '../config/db.connection.js';

export default class FormatService {
    async selectAll() {
        let sql = "SELECT * FROM `formats`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM formats WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async create(body) {
        var sql = `INSERT INTO formats (title) VALUES ('${body.title}')`;
        const [row] = await db.execute(sql);
        return row;
    }
    
    async deleteById(id) {
        var sql = `DELETE FROM formats WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM formats WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}