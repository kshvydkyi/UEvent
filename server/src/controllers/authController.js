import { hashPassword } from "../middleware/hash_password.middleware.js";
import response from "../middleware/response.middleware.js";
import { ifUserExist } from "../scripts/userChecking.script.js";
import AuthService from "../services/auth.service.js";
import UserService from "../services/user.service.js";
import { isExistUtils } from "../utils/isExist.utils.js";
import jwt from 'jsonwebtoken';
import sendMailUtils from "../utils/sendMail.utils.js";

export class AuthController {
    constructor(service, service1) {
        this.service = new AuthService();
        this.service1 = new UserService();
    }

    async register(req, res) {
        const encryptedPass = await hashPassword(req.body.password);
        const token = jwt.sign({
            login: req.body.login,
            password: encryptedPass,
            email: req.body.email,
            fullName: req.body.fullName
        }, 'jwt-key', { expiresIn: '15m' });
        sendMailUtils.send(req.body.email, token, 'activate');
        return `Confirmation token - ${token}`;
    }

    async activeEmail(req, res) {
        const userData = jwt.verify(req.params.token, 'jwt-key');
        await this.service.register(userData);
    }
    async login(req, res) {
        const user = await this.service.login(req.body.login);
        if (user[0]) {
            const password = await hashPassword(req.body.password);
            if (password === user[0].password) {
                const token = jwt.sign(
                    {
                        userId: user[0].id,
                        login: user[0].login
                    },
                    'jwt-key',
                    { expiresIn: '30d' }
                );
                return token;
            }
        }
        return 'password do not match'
    }

    async passwordReset(req, res) {
        const [{ id, login }] = await this.service1.initUser(req.body.email);
        const token = jwt.sign({
            id, login
        }, "jwt-key", { expiresIn: '15m' });
        sendMailUtils.send(req.body.email, token);
        return `Reset link for ${req.body.email} send on email with token - ${token}`;
    }

    async passwordResetWithConfirmToken(req, res) {
        const encryptedPass = await hashPassword(req.body.password);
        const userData = jwt.verify(req.params.token, "jwt-key");
        const updatedData = {password: encryptedPass};
        await this.service1.update(updatedData, userData.id);
        return `Password updated`;
    }
}

const authController = new AuthController(new AuthService(), new UserService());
export default authController;