import FormatService from "../services/format.service.js";

export class FormatController {
    constructor (service) {
        this.service = new FormatService();
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

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}



const formatController = new FormatController(new FormatService());
export default formatController;