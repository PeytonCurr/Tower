import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { ticketsService } from "../services/TicketsService.js"


export class TicketsController extends BaseController {
  constructor() {
    super('')
    this.router
      .get(`/api/events/:eventId/tickets`, this.getEventTickets)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post(`/api/tickets`, this.create)
      .get(`/account/tickets`, this.getMyTickets)
      .delete(`/api/tickets/:ticketId`, this.delete)
  }
  async getEventTickets(req, res, next) {
    try {
      const eventId = req.params.eventId
      const tickets = await ticketsService.getEventTickets(eventId);
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
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
  async getMyTickets(req, res, next) {
    try {
      const userId = req.userInfo.id
      const tickets = await ticketsService.getMyTickets(userId);
      return res.send(tickets)
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