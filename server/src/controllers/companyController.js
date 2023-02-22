import CompanyService from "../services/company.service.js";

export class CompanyController {
    constructor (service) {
        this.service = new CompanyService();
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



const companyController = new CompanyController(new CompanyService());
export default companyController;