import db from '../config/db.connection.js';

export default class TicketService {
    async selectAll() {
        let sql = "SELECT * FROM `tickets`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM tickets WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async selectByUserId(user_id) {
        let sql = `SELECT * FROM tickets WHERE user_id = ${user_id}`;
        const [row] = await db.execute(sql);
        return row;
    }

    // async selectByEventId(id) {
    //     let sql = `SELECT * FROM tickets INNER JOIN themes_events ON themes_events.event_id = ${id} AND themes.id = themes_events.theme_id`;
    //     const [row] = await db.execute(sql);
    //     return row;
    // }

    async create(body) {
        var sql = `INSERT INTO tickets (user_id, event_id, secret_code) VALUES ('${body.user_id}', '${body.event_id}', '${body.secret_code}')`;
        const [row] = await db.execute(sql);
        return row;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE tickets SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async deleteById(id) {
        var sql = `DELETE FROM tickets WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM tickets WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}