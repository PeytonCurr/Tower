import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";



export class CommentsController extends BaseController {
  constructor() {
    super('/api')
    this.router
      .get(`/events/:eventId/comments`, this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post(`/comments`, this.create)
      .delete(`/comments/:commentId`, this.delete)
  }
  async getEventComments(req, res, next) {
    try {
      const eventId = req.params.eventId
      const comments = await commentsService.getEventsComments(eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      const commentData = req.body
      commentData.creatorId = req.userInfo.id
      const comment = await commentsService.create(commentData);
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      const commentId = req.params.commentId
      const userId = req.userInfo.id
      const message = await commentsService.delete(commentId, userId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}