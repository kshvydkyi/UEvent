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
}