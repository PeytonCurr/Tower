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
    logger.log(res.data)
    AppState.towerEvents.push(new TowerEvent(res.data))
    logger.log(AppState.towerEvents)
  }
}

export const towerEventsService = new TowerEventsService();