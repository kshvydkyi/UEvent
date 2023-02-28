import db from '../config/db.connection.js';

export default class EventItemService {
    async selectAll() {
        let sql = "SELECT * FROM `events_item`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM events_item WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async create(body) {
        var sql = `INSERT INTO events_item (title, description, dateStart, dateEnd, location, price, places, format_id, userlist_public, event_pic, status, event_id, company_id, count)` + 
        `VALUES ('${body.title}', '${body.description}', '${body.dateStart}', '${body.dateEnd}', '${body.location}', '${body.price}', '${body.places}', ${body.format_id}, ${body.userlist_public}, '${body.event_pic}', '${body.status}', ${body.event_id}, ${body.company_id}, ${body.count})`;
        const [row] = await db.execute(sql);

        const theme_ids = body.theme_ids.split(", ");
        theme_ids.forEach(async (element) => {
            const [row1] = await dbConnection.execute(`INSERT INTO themes_events_item (theme_id, event_item_id) VALUES (${element}, ${row.insertId})`);
        });

        return row;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE events_item SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async deleteById(id) {
        var sql = `DELETE FROM events_item WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM events_item WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}