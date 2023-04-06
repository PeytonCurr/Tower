import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


class CommentsService {
  async create(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate(`creator`, `picture name`)

    return comment
  }

  async delete(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
      .populate(`creator`, `picture name`)

    if (comment == null) {
      throw new BadRequest("That Comment does not exist");
    }

    if (comment.creatorId != userId) {
      throw new Forbidden(`You are not Authorized to Delete this comment`)
    }

    await comment.delete()
    return `Your comment has been deleted`
  }
}

export const commentsService = new CommentsService();