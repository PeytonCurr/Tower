import { BadRequest } from "../utils/Errors.js"
import { dbContext } from "../db/DbContext.js";


class TowerEventsService {
  async getAll() {
    const towerEvents = await dbContext.TowerEvents.find()
      .populate('creator', 'picture name')
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

    if (userId != towerEvent.creatorId) {
      throw new BadRequest(`You are not the creator of this TowerEvent`)
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

}

export const towerEventsService = new TowerEventsService();