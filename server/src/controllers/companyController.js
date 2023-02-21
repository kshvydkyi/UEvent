import CompanyService from "../services/company.service.js";

export class CompanyController {
    constructor (service) {
        this.service = new CompanyService();
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



const companyController = new CompanyController(new CompanyService());
export default companyController;