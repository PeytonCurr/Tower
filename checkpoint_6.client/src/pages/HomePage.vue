<template>
  <section class="row p-3">

    <div class="col-12">

      <!-- SECTION Hero Img -->
      <div class="hero-img p-5 rounded elevation-3">
        <h1 class="text-white elevation-5 lightShadow">Get ahead of the scalpers</h1>
        <h1 class="text-white elevation-5 lightShadow">Reserve your seat now with</h1>
        <h1 class="text-white elevation-5 lightShadow">real events for real people.</h1>
      </div>

    </div>

    <div class="col-12 mt-4">

      <!-- SECTION Filter Bar Component -->
      <FilterBar />

    </div>

    <div class="col-12">

      <!-- SECTION Event list Area -->
      <section class="row p-3">

        <div class="col-3 g-3" v-for="t in towerEvents">
          <!-- STUB TowerEventComponent -->
          <TowerEventCard :t="t" />

        </div>

      </section>

    </div>

  </section>
</template>

<script lang="ts">
import { onMounted, computed } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js'
import { AppState } from '../AppState';
import TowerEventCard from '../components/TowerEventCard.vue';
import FilterBar from '../components/FilterBar.vue'
import { query } from 'express';

export default {
  setup() {
    async function getTowerEvents(query) {
      try {
        await towerEventsService.getTowerEvents(query);
      }
      catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }
    onMounted(() => {
      getTowerEvents('');
    });
    return {
      towerEvents: computed(() => {
        if (!AppState.filter) {
          return AppState.towerEvents
        } else {
          return AppState.towerEvents.filter(t => t.type == AppState.filter)
        }
      }),
    };
  },
  components: { TowerEventCard, FilterBar }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.hero-img {
  background-image: url("https://plus.unsplash.com/premium_photo-1672354234377-38ef695dd2ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80");
  background-position: center;
  background-size: cover;
}

.lightShadow {
  text-shadow: 1px 2px 4px #e5e5e5;
}
</style>
