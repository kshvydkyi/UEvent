import db from '../config/db.connection.js';
import toSQLDate from 'js-date-to-sql-datetime';

export default class PromocodeService {
    async selectAll() {
        let sql = "SELECT * FROM `promocodes`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM promocodes WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async selectByEventId(id) {
        let sql = `SELECT * FROM promocodes WHERE event_id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
    }

    async create(body) {
        const date1 = toSQLDate(new Date(body.expiresAt));
        var sql = `INSERT INTO promocodes (code, discount, company_id, event_id, expiresAt, used, count) VALUES ('${body.title}', '${body.discount}', ${body.company_id}, ${body.event_id}, '${date1}', '${body.used}', '${body.count}')`;
        const [row] = await db.execute(sql);
        return row;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE promocodes SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async deleteById(id) {
        var sql = `DELETE FROM promocodes WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM promocodes WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }

    async decrease(id) {
        var sql = `UPDATE promocodes SET count=count-1 WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
    }
}