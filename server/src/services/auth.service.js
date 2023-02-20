import db from '../config/db.connection.js';

export default class AuthService {
    async register(body){
        console.log(body.login, body.password);
    }

    async login(login){
        const sql = `SELECT users.id, users.login, users.password, roles.title FROM users, roles WHERE users.login = '${login}' AND users.role_id = roles.id`;
        const [row] = await db.execute(sql);
        return row;
    }
}