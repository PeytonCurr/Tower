import { Profile } from "./Account.js"


export class TowerEvent {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg
    this.location = data.location
    this.capacity = data.capacity
    this.type = data.type
    this.isCanceled = data.isCanceled
    this.creatorId = data.creatorId
    this.creator = data.creator ? new Profile(data.creator) : null
    this.createdAt = new Date(data.createdAt).toLocaleDateString()
    this.startDate = new Date(data.startDate).toLocaleDateString()
  }
}

export class TicketEvent extends TowerEvent {
  constructor(data) {
    super(data.event)
    this.collaborationId = data.id
  }
}