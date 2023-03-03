import Event_itemService from "../services/event_item.service.js";

export class Event_itemController {
    constructor(service) {
        this.service = new Event_itemService();
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

    async update(req, res) {
        await this.service.update(req.body, req.params.id);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
    
}

const event_itemController = new Event_itemController(new Event_itemService());
export default event_itemController;