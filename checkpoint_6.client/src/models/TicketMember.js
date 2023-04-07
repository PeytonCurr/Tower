import { Profile } from "./Account.js"

export class TicketMember extends Profile {
  constructor(data) {
    super(data.profile)
    this.collaborationId = data.id
  }
}

