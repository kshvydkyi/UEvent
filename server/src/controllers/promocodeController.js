import EventService from "../services/event.service.js";
import PromocodeService from "../services/promocode.service.js";
import eventController from "./eventController.js";

export class PromocodeController {
    constructor (service) {
        this.service = new PromocodeService();
        this.eventService = new EventService();
    }

    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return result;
    }

    async selectById(req, res) {
        const result = await this.service.selectById(req.params.id);
        return result;
    }

    async selectByEventId(req,res) {
        const result = await this.service.selectByEventId(req.params.id);
        return result;
    }

    async selectByCompanyId(req, res) {
        const result = await this.service.selectByCompanyId(req.params.id);
        const data = result.map(async (item) => {
            const event = await this.eventService.selectById(item.event_id)
            return {
                item: item,
                event: event
            }
        })
        const promiseData = Promise.all(data)
       
        return promiseData;
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

    async decrease(req, res) {
        await this.service.decrease(req.params.id);
    }
}

const promocodeController = new PromocodeController(new PromocodeService(), new EventService());
export default promocodeController;