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

    async selectByEventId(id) {
        let sql = `SELECT * FROM themes INNER JOIN themes_events ON themes_events.event_id = ${id} AND themes.id = themes_events.theme_id`;
        const [row] = await db.execute(sql);
        return row;
    }

    async create(body) {
        var sql = `INSERT INTO themes (title) VALUES ('${body.title}')`;
        const [row] = await db.execute(sql);
        return row;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE themes SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async deleteById(id) {
        var sql = `DELETE FROM themes WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM themes WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}