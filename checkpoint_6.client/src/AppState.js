import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/TowerEvent.js').TowerEvent[]} */
  towerEvents: [],

  /** @type {import('./models/TowerEvent.js').TowerEvent|null} */
  activeTowerEvent: null,

  /** @type {import('./models/TicketMember.js').Ticket[]} */
  ticketMembers: [],

  /** @type {import('./models/TowerEvent.js').TicketEvent[]} */
  myTickets: [],

  /** @type {import('./models/Comment.js').Comment[]} */
  comments: [],

  filter: null,
})
