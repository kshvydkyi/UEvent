import CompanyService from "../services/company.service.js";
import EventService from "../services/event.service.js";
import FormatService from "../services/format.service.js";
import LocationService from "../services/location.service.js";
import ThemeService from "../services/theme.service.js";
import TicketService from "../services/ticket.service.js";

export class TicketController {
    constructor (service) {
        this.service = new TicketService();
        this.eventService = new EventService();
        this.companyService = new CompanyService();
        this.formatService = new FormatService();
        this.locationService = new LocationService();
        this.themeService = new ThemeService();
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
        const data = result.map(async(value) => {
            // console.log(value)
            const event = await this.eventService.selectById(value.event_id);
            const location = await this.locationService.selectById(event.location_id);
            const format = await this.formatService.selectById(event.format_id);
            const themes = await this.themeService.selectByEventId(event.id);
            const company = await this.companyService.selectById(event.company_id)
            return{
                id: value.id,
                user_id: value.user_id,
                secret_code: value.secret_code,
                event: event,
                location:location,
                format: format,
                themes: themes,
                company: company
            }
        })
        const promiseData = await Promise.all(data)
        console.log(promiseData)
        return promiseData;
    }


    async create(req, res) {
        await this.service.create(req.body);
    }


    async update(req, res){
        await this.service.update(req.body, req.params.id);
    }
    async checkTicket(req, res) {
        const result = await this.service.selectBySecretCode(req.params.secretCode);
        await this.service.deleteById(result.id);
    }

    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}

const ticketController = new TicketController(new TicketService(), new EventService(), new CompanyService(), new FormatService(), new LocationService());

export default ticketController;