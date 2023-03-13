import NotificationService from "../services/notification.service.js";

export class NotificationController {
    constructor (service) {
        this.service = new NotificationService();
    }

    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return result;
    }

    async selectById(req, res) {
        const result = await this.service.selectById(req.params.id);
        return result;
    }

    async selectByUserId(req, res) {
        const result = await this.service.selectByUserId(req.params.id);
        return result;
    }

    async create(req, res) {
        await this.service.create(req.body);
    }


    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}

const notificationController = new NotificationController(new NotificationService());
export default notificationController;