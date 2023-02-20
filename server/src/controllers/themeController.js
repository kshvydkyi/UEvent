import ThemeService from "../services/theme.service.js";

export class ThemeController {
    constructor (service) {
        this.service = new ThemeService();
    }

    async selectAll(req, res) {
        await this.service.selectAll();
    }

    async selectById(req, res) {
        await this.service.selectById(req.params.role_id);
    }

    async create(req, res) {
        await this.service.create(req.body);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.role_id);
    }
}

const themeController = new ThemeController(new ThemeService());
export default themeController;