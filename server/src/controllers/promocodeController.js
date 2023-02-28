import PromocodeService from "../services/promocode.service.js";

export class PromocodeController {
    constructor (service) {
        this.service = new PromocodeService();
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
    
    async update(req, res){
        await this.service.update(req.body, req.params.id);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}

const promocodeController = new PromocodeController(new PromocodeService());
export default promocodeController;