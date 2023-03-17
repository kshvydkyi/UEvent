import db from '../config/db.connection.js';
import toSQLDate from 'js-date-to-sql-datetime';

export default class EventService {
    async selectAll(filterByDate, filterLoc, filterND) {
        let sql;
        if(filterByDate === 'undefined' || filterByDate === undefined) filterByDate='ASC';
        if(filterLoc === 'All') {
            sql = `SELECT * FROM events WHERE (title LIKE '%${filterND}%' OR description LIKE '%${filterND}%') ORDER BY dateStart ${filterByDate}`;
        }
        else {
            sql = `SELECT * FROM events WHERE location_id=${filterLoc} AND (title LIKE '%${filterND}%' OR description LIKE '%${filterND}%') ORDER BY dateStart ${filterByDate}`;
        }
        
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM events WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async selectByCompanyId(id) {
        let sql = `SELECT * FROM events WHERE company_id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
    }

    async create(body) {
        const date1 = toSQLDate(new Date(body.dateStart));
        const date2 = toSQLDate(new Date(body.dateEnd));
        var sql = `INSERT INTO events (title, description, event_pic, company_id, format_id, dateStart, dateEnd, count, userlist_public, price, location_id) VALUES ('${body.title}', '${body.description}', '${body.event_pic}', ${body.company_id}, ${body.format_id}, '${date1}', '${date2}', ${body.count}, ${body.userlist_public}, '${body.price}', ${body.location_id} )`; 
        const [row] = await db.execute(sql);
        const theme_ids = body.themes_id;
        theme_ids.forEach(async (element) => {
            const [row1] = await db.execute(`INSERT INTO themes_events (theme_id, event_id) VALUES (${element}, ${row.insertId})`);
        });
        return row;
    }

    async update(body, id) {
        // console.log('check update',body)
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

    async buyTicket(body) {
        var sql = `UPDATE events SET count=count-1 WHERE id = ${body.event_id}`;
        const [row] = await db.execute(sql);
        let userId = body.user_id;
        // console.log(userId);
        if(userId === undefined){
           let guestUser = `SELECT id FROM users WHERE login = 'guest_kvitochok'`
           const [guestUserRow] = await db.execute(guestUser);
           userId = guestUserRow[0].id;
        }
        let sql1 = `INSERT INTO tickets (user_id, event_id, secret_code) VALUES ('${userId}', '${body.event_id}', '${body.token.id}')`;
        const [row1] = await db.execute(sql1);

        let sql2 = `INSERT INTO notifications (user_id, title, descriptiob) VALUES ('${userId}', '${body.title}', '${body.title}')`;
        const [row2] = await db.execute(sql2);

        return row;
    }

    // async search(data) {
    //     let sql = `SELECT * FROM events WHERE (title LIKE '%${data}%' OR description LIKE '%${data}%')`
    //     const [row] = await db.execute(sql);
    //     return row;
    // }
}