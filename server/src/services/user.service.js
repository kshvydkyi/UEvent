import db from '../config/db.connection.js';

export default class UserService {
    async selectAll() {
        let sql = "SELECT * FROM `users`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM users WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async deleteById(id) {
        var sql = `DELETE FROM users WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}
}