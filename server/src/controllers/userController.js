import UserService from "../services/user.service.js";

export class UserController {
    constructor (service) {
        this.service = new UserService();
    }

    async register (req, res) {
        await this.service.registerNewUser(req.body);
    }
}



const userController = new UserController(new UserService());
export default userController;