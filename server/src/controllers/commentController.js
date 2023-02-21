import CommentService from "../services/comment.service.js";

export class CommentController {
    constructor (service) {
        this.service = new CommentService();
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



const commentController = new CommentController(new CommentService());
export default commentController;