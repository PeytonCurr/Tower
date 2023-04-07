import { AppState } from "../AppState.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";


class TowerEventsService {
  async getTowerEvents(query) {
    const res = await api.get(`/api/events`, { type: query });
    // logger.log(res.data)
    AppState.towerEvents = res.data.map(t => new TowerEvent(t))
    // logger.log(AppState.towerEvents)
  }
  async createEvent(eventData) {
    const res = await api.post(`/api/events`, eventData)
    // logger.log(res.data)
    const towerEvent = new TowerEvent(res.data)
    AppState.towerEvents.push(towerEvent)
    // logger.log(AppState.towerEvents)
    return towerEvent
  }
  async getActiveTower(towerEventId) {
    const res = await api.get(`api/events/${towerEventId}`)
    AppState.activeTowerEvent = new TowerEvent(res.data)
    // logger.log(AppState.activeTowerEvent)
  }

  async cancelTowerEvent(towerEventId) {
    const res = await api.delete(`/api/events/${towerEventId}`)
    AppState.activeTowerEvent.isCanceled = true
  }

}

export const towerEventsService = new TowerEventsService();