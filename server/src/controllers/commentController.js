import CommentService from "../services/comment.service.js";

export class CommentController {
    constructor (service) {
        this.service = new CommentService();
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



const commentController = new CommentController(new CommentService());
export default commentController;