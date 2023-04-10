import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class CommentsService {
  async getAllComments(towerEventId) {
    const res = await api.get(`/api/events/${towerEventId}/comments`)
    // logger.log(res.data, ['Res.Data'])
    AppState.comments = res.data.map(c => new Comment(c))
    // logger.log(AppState.comments, ['Comments'])
  }
  async createComment(commentData) {
    const res = await api.post(`/api/comments`, commentData)
    // logger.log(res.data, ['Res.Data'])
    AppState.comments.push(new Comment(res.data))
    // logger.log(AppState.comments, ['Comments'])
  }
  async deleteComment(commentId) {
    await api.delete(`/api/comments/${commentId}`)

    const commentIndex = AppState.comments.findIndex(c => c.id == commentId)

    AppState.comments.splice(commentIndex, 1)
  }
}

export const commentsService = new CommentsService();