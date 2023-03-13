import authRouter from './api/auth.router.js';
import userRouter from './api/user.router.js';
import roleRouter from './api/role.router.js';
import themeRouter from './api/theme.router.js';
import formatRouter from './api/format.router.js';
import commentRouter from './api/comment.router.js';
import companyRouter from './api/company.router.js';
import eventRouter from './api/event.router.js';
import promocodeRouter from './api/promocode.router.js';
import locationRouter from './api/location.router.js';
import ticketRouter from './api/ticket.router.js';
import notificationRouter from './api/notification.router.js';
class AppRouter {
	constructor(app) { this.app = app }

	init() {
		this.app.get('/', (_req, res) => {
			res.send('API Running');
		});
		this.app.use('/api/auth', authRouter);
		this.app.use('/api/users', userRouter);
		this.app.use('/api/roles', roleRouter);
		this.app.use('/api/events', eventRouter);
		this.app.use('/api/themes', themeRouter);
		this.app.use('/api/formats', formatRouter);
		this.app.use('/api/comments', commentRouter);
		this.app.use('/api/companies', companyRouter);
		this.app.use('/api/promocodes', promocodeRouter);
		this.app.use('/api/location', locationRouter);
		this.app.use('/api/tickets', ticketRouter);
		this.app.use('/api/notifications', notificationRouter);
	}
}

export default AppRouter;