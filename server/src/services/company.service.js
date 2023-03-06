import db from '../config/db.connection.js';

export default class CompanyService {
    async selectAll() {
        let sql = "SELECT * FROM `companies`";
        const [row] = await db.execute(sql);
        return row;
    }

    async selectById(id) {
        let sql = `SELECT * FROM companies WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row[0];
    }

    async selectByUserId(id) {
        const sql = `SELECT * FROM companies WHERE user_id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
    }

    async selectUsersByCompanyId(id) {
        var sql = `SELECT * FROM users_companies WHERE company_id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
    }

    async create(body) {
        var sql = `INSERT INTO companies (title, description, user_id) VALUES ('${body.title}', '${body.description}', '${body.userId}')`;
        const [row] = await db.execute(sql);
        return row;
    }

    async addUser(body) {
        console.log('pidorasina')
        var sql = `INSERT INTO users_companies (user_id, company_id) VALUES (${body.user_id}, ${body.company_id})`;
        const [row] = await db.execute(sql);
        return row;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE companies SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async deleteById(id) {
        const sql = `DELETE FROM companies WHERE id = '${id}'`;
        const [row] = await db.execute(sql);
        return row;
	}

    async isExist(field, value) {
        var sql = `SELECT * FROM companies WHERE ${field} = '${value}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }
}