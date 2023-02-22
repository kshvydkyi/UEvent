import EventService from "../services/event.service.js";

export class EventController {
    constructor (service) {
        this.service = new EventService();
    }

    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return result;
    }

    async selectById(req, res) {
        const result = await this.service.selectById(req.params.id);
        return result;
    }

    async create(req, res) {
        await this.service.create(req.body);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}



const eventController = new EventController(new EventService());
export default eventController;