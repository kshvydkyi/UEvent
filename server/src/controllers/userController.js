import UserService from "../services/user.service.js";

export class UserController {
    constructor (userService) {
        this.userService = new UserService();
    }

    async register (req, res) {
        await this.userService.registerNewUser('a', 'b');
    }
}



const userController = new UserController(new UserService());
export default userController;