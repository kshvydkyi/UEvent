import db from '../config/db.connection.js';
import toSQLDate from 'js-date-to-sql-datetime';

export default class EventService {
    async selectAll() {
        let sql = "SELECT * FROM `events`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM events WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async create(body) {
        const date1 = toSQLDate(new Date(body.dateStart));
        var sql = `INSERT INTO events (title, description, event_pic, company_id, format_id, dateStart) VALUES ('${body.title}', '${body.description}', '${body.event_pic}', ${body.company_id}, ${body.format_id}, '${date1}' )`; 
        const [row] = await db.execute(sql);
        // const theme_ids = body.theme_ids.split(", ");
        // theme_ids.forEach(async (element) => {
        //     const [row1] = await dbConnection.execute(`INSERT INTO themes_events (theme_id, event_id) VALUES (${element}, ${row.insertId})`);
        // });
        return row;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE events SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async update_event_pic(path, id) {
        var sql = `UPDATE events SET event_pic = '${path}' WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async deleteById(id) {
        var sql = `DELETE FROM events WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM events WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}