<template>
  <section class="row p-3">
    <div class="col-12 my-3">
      <h4 class="text-success">My Events</h4>
      <section class="row p-3" v-if="account?.id">

        <div class="col-3 g-3" v-for="t in towerEvents">
          <!-- STUB TowerEventComponent -->
          <TowerEventCard :t="t" />

        </div>
      </section>
      <br>
      <h4 class="text-success">Upcoming Events</h4>

      <section class="row p-3 justify-content-center" v-for="mT in myTickets">
        <div class="col-9">
          <div class="row justify-content-center elevation-5 p-2 bg-grey">
            <div class="col-4">
              <img class="img-fluid" :src="mT.coverImg" :alt="mT.name">
            </div>
            <div class="col-8">
              <h4>{{ mT.name }}</h4>
              <h6 class="text-secondary">{{ mT.location }}</h6>
              <h6 class="text-secondary">{{ mT.startDate }}</h6>
            </div>
          </div>
        </div>
      </section>

    </div>
  </section>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue'
import { AppState } from '../AppState'
import { towerEventsService } from '../services/TowerEventsService.js';
import { ticketsService } from '../services/TicketsService.js';
export default {
  setup() {

    async function getMyTowerEvents() {
      try {
        await towerEventsService.getMyTowerEvents();
      } catch (error) {
        logger.error(error.message);
        pop.error(error.message);
      }
    }

    async function getMyTickets() {
      try {
        await ticketsService.getMyTickets();
      } catch (error) {
        logger.error(error.message);
        pop.error(error.message);
      }
    }

    watchEffect(() => {
      if (AppState.account.id) {
        getMyTowerEvents()
        getMyTickets()
      }
    })

    return {
      account: computed(() => AppState.account),
      towerEvents: computed(() => AppState.towerEvents),
      myTickets: computed(() => AppState.myTickets),
    }
  }
}
</script>

<style scoped></style>
