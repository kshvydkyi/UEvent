import UserService from "../services/user.service.js";

export class UserController {
    constructor (service) {
        this.service = new UserService();
    }

    async selectAll(req, res) {
        await this.service.selectAll();
    }

    async selectById(req, res) {
        await this.service.selectById(req.params.user_id);
    }

    async create(req, res) {
        await this.service.create(req.body);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.user_id);
    }
}

const userController = new UserController(new UserService());
export default userController;
