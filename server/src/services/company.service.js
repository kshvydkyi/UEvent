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
        var sql = `INSERT INTO companies (title, description, user_id, company_pic) VALUES ('${body.title}', '${body.description}', '${body.userId}', '${body.company_pic}')`;
        const [row] = await db.execute(sql);
        return row;
    }

    async addUser(id, body) {
        var sql = `INSERT INTO users_companies (user_id, company_id) VALUES (${body.user_id}, ${id})`;
        const [row] = await db.execute(sql);
        return row;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE companies SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async update_pic(path, company_id) {
        var sql = `UPDATE companies SET company_pic = '${path}' WHERE id = ${company_id}`;
        const [row] = await db.execute(sql);
        return row;
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