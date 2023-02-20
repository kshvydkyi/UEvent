import EventService from "../services/event.service.js";

export class EventController {
    constructor (service) {
        this.service = new EventService();
    }

    async selectAll(req, res) {
        await this.service.selectAll();
    }

    async selectById(req, res) {
        await this.service.selectById(req.params.role_id);
    }

    async create(req, res) {
        await this.service.create(req.body);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.role_id);
    }
}



const eventController = new EventController(new EventService());
export default eventController;