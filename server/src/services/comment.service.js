import db from '../config/db.connection.js';
import toSQLDate from 'js-date-to-sql-datetime';

export default class CommentService {
    async selectAll() {
        let sql = "SELECT * FROM `comments`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM comments WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async selectByEventId(id) {
        let sql = `SELECT * FROM comments WHERE event_id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async create(body) {
        let sql = `INSERT INTO comments (author_id, publish_date, content, event_id) VALUES (${body.author_id}, '${toSQLDate(Date.now())}', '${body.content}',  ${body.event_id})`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async deleteById(id) {
        var sql = `DELETE FROM comments WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM comments WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}