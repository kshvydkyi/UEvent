import db from '../config/db.connection.js';

export default class NotificationService {
    async selectAll() {
        let sql = "SELECT * FROM `notifications`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM notifications WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async selectByUserId(id) {
        const sql = `SELECT * FROM notifications WHERE user_id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
    }



    async create(body) {
        var sql = `INSERT INTO notifications (title, description, user_id) VALUES ('${body.title}', '${body.description}', '${body.userId}')`;
        const [row] = await db.execute(sql);
        return row;
    }

    async deleteById(id) {
        const sql = `DELETE FROM notifications WHERE id = '${id}'`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM notifications WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}