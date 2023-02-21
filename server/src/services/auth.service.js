import db from '../config/db.connection.js';
import UserService from "./user.service.js";

export default class AuthService {
    async register(body){
        const data = {
            login: body.login,
            password: body.password,
            full_name: body.fullName,
            profile_pic: "default_avatar.png",
            email: body.email,
            role_id: 2,
            status: 1
        };
        const service = new UserService();
        return service.create(data);
    }

    async login(login){
        const sql = `SELECT users.id, users.login, users.password, roles.title FROM users, roles WHERE users.login = '${login}' AND users.role_id = roles.id`;
        const [row] = await db.execute(sql);
        return row;
    }
}