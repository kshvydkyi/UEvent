import LocationService from "../services/location.service.js";

export class LocationController {
    constructor (service) {
        this.service = new LocationService();
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

    async add_pic(req, res) {
        const data = { pathFile: req.file.filename };
        return data;
    }

    async update_pic(req, res) { 
        const pathFile = req.file.filename;
        await this.service.update_pic(pathFile, req.params.id);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}

const locationController = new LocationController(new LocationService());
export default locationController;