import authRouter from './api/auth.router.js';
import userRouter from './api/user.router.js';
import roleRouter from './api/role.router.js';
import themeRouter from './api/theme.router.js';
import formatRouter from './api/format.router.js';
import commentRouter from './api/comment.router.js';
import companyRouter from './api/company.router.js';

class AppRouter {
	constructor(app) { this.app = app }

	init() {
		this.app.get('/', (_req, res) => {
			res.send('API Running');
		});
		this.app.use('/api/auth', authRouter);
		this.app.use('/api/users', userRouter);
		this.app.use('/api/roles', roleRouter);
		this.app.use('/api/themes', themeRouter);
		this.app.use('/api/formats', formatRouter);
		this.app.use('/api/comments', commentRouter);
		this.app.use('/api/companies', companyRouter);
	}
}

export default AppRouter;