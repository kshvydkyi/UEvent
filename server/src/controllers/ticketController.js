import TicketService from "../services/ticket.service.js";

export class TicketController {
    constructor (service) {
        this.service = new TicketService();
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
        const result = await this.service.selectByUserId(req.params.user_id);
        return result;
    }


    async create(req, res) {
        await this.service.create(req.body);
    }


    async update(req, res){
        await this.service.update(req.body, req.params.id);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}

const ticketController = new TicketController(new TicketService());

export default ticketController;