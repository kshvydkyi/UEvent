import EventService from "../services/event.service.js";
import CompanyService from '../services/company.service.js'
import FormatService from '../services/format.service.js'
import LocationService from "../services/location.service.js";
import ThemeService from "../services/theme.service.js";
import stripe from 'stripe'
import * as uuid from 'uuid';
import sendMailUtils from "../utils/sendMail.utils.js";
import { createPdf } from "../utils/createPdf.utils.js";
import TicketService from "../services/ticket.service.js";



export class EventController {
    constructor(service, companyService, formatService) {
        this.service = new EventService();
        this.companyService = new CompanyService();
        this.formatService = new FormatService();
        this.locationService = new LocationService();
        this.themeService = new ThemeService();
        this.tickenService = new TicketService();
    }

    async selectAll(req, res) {
        const result = await this.service.selectAll();
        const data = result.map(async (item) => {
            const company = await this.companyService.selectById(item.company_id);
            const format = await this.formatService.selectById(item.format_id);
            const location = await this.locationService.selectById(item.location_id);
            const themes = await this.themeService.selectByEventId(item.id);
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                event_pic: item.event_pic,
                company_id: item.company_id,
                format_id: item.format_id,
                dateStart: item.dateStart,
                dateEnd: item.dateEnd,
                ticketsCount: item.count,
                status: item.status,
                showUserList: item.userlist_public,
                price: item.price,
                themes: themes,
                location: location,
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
        const location = await this.locationService.selectById(result.location_id);
        const themes = await this.themeService.selectByEventId(result.id);
        const data = {
            id: result.id,
            title: result.title,
            description: result.description,
            event_pic: result.event_pic,
            company_id: result.company_id,
            format_id: result.format_id,
            dateStart: result.dateStart,
            dateEnd: result.dateEnd,
            ticketsCount: result.count,
            status: result.status,
            showUserList: result.userlist_public,
            price: result.price,
            themes: themes,
            location: location,
            companyName: company.title,
            companyOwner: company.user_id,
            formatName: format.title,
        }
        return data;
    }

    async create(req, res) {
        await this.service.create(req.body);
    }

    async update(req, res) {
        await this.service.update(req.body, req.params.id);
    }

    async addPoster(req, res) {
        const data = { pathFile: req.file.filename };
        return data;
    }

    async update_event_pic(req, res) {
        const pathFile = req.file.filename;
        await this.service.update_event_pic(pathFile, req.params.id);
    }
    async payment(req, res) {
        stripe('sk_test_51Mixi5EPLqByaBcpNGY0T2xiailUqTSHqwzHYeYD7gNu58HT1mGljO548Z701MRR9uWZRtFQLFoDtR1AquR0hZjB00iAOmm44E')
        const { name, price, token, user_id, eventId, startDate, endDate, location, event_pic,user_login } = req.body;
        const purchase = {
            title: name,
            price: price,
            user_id: user_id,
            event_id: eventId,
            email: token.email,
            location: location, 
            eventPic: event_pic,
            startDate: startDate,
            endDate: endDate,
            token: token,
            user_login: user_login
        }
        // console.log('purchase: ', purchase)
        await createPdf(purchase);
        sendMailUtils.send(purchase.email, purchase.token.id, 'buyTicket');
        await this.service.buyTicket(purchase);
    }


    async deleteById(req, res) {
        await this.service.deleteById(req.params.id);
    }
}

const eventController = new EventController(new EventService(), new CompanyService(), new FormatService(), new LocationService(), new ThemeService());
export default eventController;