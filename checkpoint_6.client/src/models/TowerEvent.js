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
    this.creator = new Profile(data.creator)
    this.createdAt = new Date(data.createdAt)
    this.startDate = new Date(data.startDate)
  }
}