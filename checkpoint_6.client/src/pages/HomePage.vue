<template>
  <section class="row p-3">

    <div class="col-12">

      <!-- SECTION Hero Img -->\
      <div></div>

    </div>

    <div class="col-12">

      <!-- SECTION Filter Bar Component -->
      <div></div>

    </div>

    <div class="col-12">

      <!-- SECTION Event list Area -->
      <section class="row">

        <!-- STUB TowerEventComponent -->
        <div class="col-3">
          <div></div>
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

export default {
  setup() {

    async function getTowerEvents() {
      try {
        await towerEventsService.getTowerEvents();
      } catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }

    onMounted(() => {
      getTowerEvents()
    })

    return {

      towerEvents: computed(() => AppState.towerEvents)

    }
  }
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
</style>
