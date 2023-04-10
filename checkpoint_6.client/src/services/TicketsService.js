import { AppState } from "../AppState.js";
import { TicketMember } from "../models/TicketMember.js";
import { TicketEvent } from "../models/TowerEvent.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";


class TicketsService {
  async createTicket(activeTowerEventId) {
    const res = await api.post(`api/tickets`, { eventId: activeTowerEventId })
    logger.log(res.data)
    AppState.ticketMembers.push(new TicketMember(res.data))
    AppState.myTickets.push(new TicketEvent(res.data))
    // logger.log(AppState.ticketMembers)
    // logger.log(AppState.myTickets)
  }

  async deleteTicket(collaborationId) {
    const res = await api.delete(`api/tickets/${collaborationId}`)

    const ticketMemberIndex = AppState.ticketMembers.findIndex(m => m.collaborationId == collaborationId)
    if (ticketMemberIndex !== -1) {
      AppState.ticketMembers.splice(ticketMemberIndex, 1)
    }

    const myTicketsIndex = AppState.myTickets.findIndex(m => m.collaborationId == collaborationId)
    if (myTicketsIndex !== -1) {
      AppState.myTickets.splice(myTicketsIndex, 1)
    }
  }
  async getAllTicketMembers(towerEventId) {
    const res = await api.get(`api/events/${towerEventId}/tickets`)
    // logger.log(res.data, ["Logging res.data"])
    AppState.ticketMembers = res.data.map(m => new TicketMember(m))
    // logger.log(AppState.ticketMembers, ["Logging AppState.ticketMembers"])
  }
  async getMyTickets() {
    const res = await api.get(`/account/tickets`)
    AppState.myTickets = res.data.map(t => new TicketEvent(t))
    logger.log(AppState.myTickets)
  }
}

export const ticketsService = new TicketsService();