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

    async create(body) {
        var sql = `INSERT INTO companies (title, description) VALUES ('${body.title}', '${body.description}')`;
        const [row] = await db.execute(sql);
        return row;
    }

    async update(body, id) {
        if(Object.entries(body).length !== 0){
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE companies SET ${key} = '${value}' WHERE id = ${id}`))
        }
	}

    async deleteById(id) {
        var sql = `DELETE FROM companies WHERE id = ${id}`;
        const [row] = await db.execute(sql);
        return row;
	}
}