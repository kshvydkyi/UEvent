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

    async create(body) {
        let sql = `INSERT INTO users (login, password, full_name, email, profile_pic, role_id, status) VALUES ('${body.login}', '${body.password}', '${body.full_name}', '${body.email}', '${body.profile_pic}', ${body.role_id}, 0)`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async update_avatar(path, user_id) {
        var sql = `UPDATE users SET profile_pic = '${path}' WHERE id = ${user_id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE users SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async deleteById(id) {
        var sql = `DELETE FROM users WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM users WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }

    async initUser(value){
        const sql = `SELECT id, login FROM users WHERE email = '${value}'`;
        const [row] = await db.execute(sql);
        return row;
    }
}