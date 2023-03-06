import ThemeService from "../services/theme.service.js";

export class ThemeController {
    constructor (service) {
        this.service = new ThemeService();
    }

    async selectAll(req, res) {
        const result = await this.service.selectAll();
        return result;
    }

    async selectById(req, res) {
        const result = await this.service.selectById(req.params.id);
        return result;
    }

    async selectByEventId(req, res) {
        const result = await this.service.selectByEventId(req.params.id);
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

const themeController = new ThemeController(new ThemeService());
export default themeController;