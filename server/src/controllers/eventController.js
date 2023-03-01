import EventService from "../services/event.service.js";
import CompanyService from '../services/company.service.js'
import FormatService from '../services/format.service.js'

export class EventController {
    constructor (service, companyService, formatService) {
        this.service = new EventService();
        this.companyService = new CompanyService();
        this.formatService = new FormatService();
    }

    async selectAll(req, res) {
        const result = await this.service.selectAll();
        const data = result.map(async (item) => {
            // console.log(item);
            const company = await this.companyService.selectById(item.company_id);
            const format = await this.formatService.selectById(item.format_id);
            
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                event_pic: item.event_pic,
                company_id: item.company_id,
                format_id: item.format_id,
                dateStart: item.dateStart,
                companyName: company.title,
                companyOwner: company.user_id,
                formatName: format.title,
            }
        })
        const returnData = await Promise.all(data);
        return returnData;
    }

    async selectById(req, res) {
        const result = await this.service.selectById(req.params.id);
        const company = await this.companyService.selectById(result.company_id);
        const format = await this.formatService.selectById(result.format_id);
        const data = {
            id: result.id,
            title: result.title,
            description: result.description,
            event_pic: result.event_pic,
            company_id: result.company_id,
            format_id: result.format_id,
            dateStart: result.dateStart,
            companyName: company.title,
            companyOwner: company.user_id,
            formatName: format.title,
        }
        return data;
    }

    async create(req, res) {
        await this.service.create(req.body);
    }

    async update(req, res){
        await this.service.update(req.body, req.params.id);
    }

    async addPoster(req, res) {
        const data = {pathFile: req.file.filename};
        return data;
    }

    async update_event_pic(req, res) { 
        const pathFile = req.file.filename;
        await this.service.update_event_pic(pathFile, req.params.id);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}

const eventController = new EventController(new EventService(), new CompanyService(), new FormatService());
export default eventController;