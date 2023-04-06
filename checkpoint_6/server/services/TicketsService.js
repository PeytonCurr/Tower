import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { towerEventsService } from "./TowerEventsService.js";


class TicketsService {
  async create(ticketData) {

    const towerEvent = await towerEventsService.getOne(ticketData.eventId)


    if (towerEvent.capacity <= 0) {
      throw new BadRequest(`The tickets for TowerEvent: ${towerEvent.name} are sold out`);
    }
    const ticket = await dbContext.Tickets.create(ticketData);
    await ticket.populate(`profile`, `picture name`)
    await ticket.populate(`event`)
    towerEvent.capacity--

    await towerEvent.save()

    return ticket
  }
  async delete(userId, ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId)

    if (ticket == null) {
      throw new BadRequest("That Ticket does not exist");
    }

    if (ticket.accountId != userId) {
      throw new Forbidden(`You are not authorized to delete this ticket`)
    }

    const towerEvent = await towerEventsService.getOne(ticket.eventId)

    towerEvent.capacity++

    await towerEvent.save()
    await ticket.delete()

    return `Your ticket has been successfully deleted`
  }
}

export const ticketsService = new TicketsService();