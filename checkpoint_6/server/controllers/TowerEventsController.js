import { Auth0Provider } from "@bcwdev/auth0provider"
import BaseController from "../utils/BaseController.js"
import { towerEventsService } from "../services/TowerEventsService.js"


export class TowerEventsController extends BaseController {
  constructor() {
    super('/api/events')
    this.router
      .get(`/:eventId/tickets`, this.getEventTickets)
      .get(`/:eventId/comments`, this.getEventComments)
      .get('', this.getAll)
      .get('/:towerEventId', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:towerEventId', this.edit)
      .post('', this.create)
      .delete('/:towerEventId', this.cancel)
  }
  async getEventTickets(req, res, next) {
    try {
      const eventId = req.params.eventId
      const tickets = await towerEventsService.getEventTickets(eventId);
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async getEventComments(req, res, next) {
    try {
      const eventId = req.params.eventId
      const comments = await towerEventsService.getEventsComments(eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      const query = req.query
      const towerEvents = await towerEventsService.getAll(query);
      return res.send(towerEvents)
    } catch (error) {
      next(error)
    }
  }
  async getOne(req, res, next) {
    try {
      const towerEventId = req.params.towerEventId
      const towerEvent = await towerEventsService.getOne(towerEventId);
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    try {
      const userId = req.userInfo.id
      const towerEventEdits = req.body
      const towerEventId = req.params.towerEventId
      const towerEvent = await towerEventsService.edit(towerEventEdits, towerEventId, userId)
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async create(req, res, next) {
    try {
      const towerEventData = req.body
      towerEventData.creatorId = req.userInfo.id
      const towerEvent = await towerEventsService.create(towerEventData);
      return res.send(towerEvent)
    } catch (error) {
      next(error)
    }
  }
  async cancel(req, res, next) {
    try {
      const userId = req.userInfo.id
      const towerEventId = req.params.towerEventId
      const message = await towerEventsService.cancel(userId, towerEventId)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}