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
    
    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE formats SET ${key} = '${value}' WHERE id = ${id}`))
        }
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