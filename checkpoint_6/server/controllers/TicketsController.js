import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { ticketsService } from "../services/TicketsService.js"


export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post(``, this.create)
      .delete(`/:ticketId`, this.delete)
  }
  async create(req, res, next) {
    try {
      const ticketData = req.body
      ticketData.accountId = req.userInfo.id
      const ticket = await ticketsService.create(ticketData);
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      const ticketId = req.params.ticketId
      const userId = req.userInfo.id
      const message = await ticketsService.delete(userId, ticketId);
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}