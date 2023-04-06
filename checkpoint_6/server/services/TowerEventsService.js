import { BadRequest, Forbidden } from "../utils/Errors.js"
import { dbContext } from "../db/DbContext.js";


class TowerEventsService {
  async getEventTickets(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId })
      .populate(`profile`, `picture `)
      .populate(`event`)

    if (tickets == null) {
      throw new BadRequest("That TowerEvent does not have any Tickets");
    }

    return tickets
  }
  async getEventsComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId })
      .populate(`creator`, `picture name`)

    if (comments == null) {
      throw new BadRequest("That TowerEvent does not have any Comments");
    }

    return comments
  }
  async getAll(query) {
    const towerEvents = await dbContext.TowerEvents.find(query)
      .populate('creator', 'picture name')

    if (towerEvents == null) {
      throw new BadRequest(`The TowerEvents you are trying to get do not exist`)
    }

    return towerEvents
  }
  async getOne(towerEventId) {
    const towerEvent = await dbContext.TowerEvents.findById(towerEventId)
      .populate('creator', 'picture name')
    if (towerEvent == null) {
      throw new BadRequest("This TowerEvent Doesn't exist");
    }
    return towerEvent
  }
  async edit(towerEventEdits, towerEventId, userId) {
    const towerEvent = await this.getOne(towerEventId)

    if (towerEvent.isCanceled == true) {
      throw new BadRequest(`TowerEvent: ${towerEvent.name} can't be edited, as it has been canceled `)
    }

    if (userId != towerEvent.creatorId) {
      throw new Forbidden(`You are not authorized to edit TowerEvent: ${towerEvent.name}`)
    }

    towerEvent.name = towerEventEdits.name || towerEvent.name
    towerEvent.description = towerEventEdits.description || towerEvent.description
    towerEvent.coverImg = towerEventEdits.coverImg || towerEvent.coverImg
    towerEvent.location = towerEventEdits.location || towerEvent.location
    towerEventEdits.capacity = towerEventEdits.capacity || towerEvent.capacity
    towerEvent.startDate = towerEventEdits.startDate || towerEvent.startDate
    towerEvent.type = towerEventEdits.type || towerEvent.type
    towerEvent.creatorId = towerEventEdits.creatorId || towerEvent.creatorId

    await towerEvent.populate(`creator`, `picture name`)
    await towerEvent.save()

    return towerEvent
  }
  async create(towerEventData) {
    const towerEvent = await dbContext.TowerEvents.create(towerEventData)
    await towerEvent.populate('creator', 'picture name')
    return towerEvent
  }
  async cancel(userId, towerEventId) {
    const towerEvent = await this.getOne(towerEventId)

    if (userId != towerEvent.creatorId) {
      throw new Forbidden(`You are not authorized to cancel ${towerEvent.name}`)
    }

    if (towerEvent.isCanceled == true) {
      throw new Forbidden(`TowerEvent: ${towerEvent.name} has already been canceled`)
    }

    towerEvent.isCanceled = true
    await towerEvent.save()
    return `TowerEvent: ${towerEvent.name} was Canceled`
  }
}

export const towerEventsService = new TowerEventsService();