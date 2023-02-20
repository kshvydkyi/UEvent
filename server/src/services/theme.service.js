import db from '../config/db.connection.js';

export default class ThemeService {
    async selectAll() {
        let sql = "SELECT * FROM `themes`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM themes WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async create(body) {
        var sql = `INSERT INTO themes (title) VALUES ('${body.title}')`;
        const [row] = await db.execute(sql);
        return row;
    }

    async deleteById(id) {
        var sql = `DELETE FROM themes WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}
}