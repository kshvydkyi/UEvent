import UserService from "../services/user.service.js";

export class UserController {
    constructor (service) {
        this.service = new UserService();
    }

    async selectAll(req, res) {
        await this.service.selectAll();
    }

    async selectById(req, res) {
        await this.service.selectById(req.params.id);
    }

    async create(req, res) {
        await this.service.create(req.body);
    }

    async update_avatar(req, res) { 
        const pathFile = req.file.filename;
        const token = req.params.token;  
        const userData = jwt.verify(token, "jwt-key");
        await this.service.update_avatar(pathFile, userData.userId);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}

const userController = new UserController(new UserService());
export default userController;
