import AuthService from "../services/auth.service.js";

export class AuthController {
    constructor (service) {
        this.service = new AuthService();
    }

    async register (req, res) {
        await this.service.register(req.body);
    }
}

const authController = new AuthController(new AuthService());
export default authController;