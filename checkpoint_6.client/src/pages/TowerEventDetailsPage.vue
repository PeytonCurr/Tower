<template>
  <section class="row p-3">
    <div class="col-12">

      <!-- SECTION Event list Area -->
      <section class="row elevation-5 p-3 bg-grey selectable">

        <!-- STUB TowerEventComponent -->
        <div class="col-5 my-3">
          <img class="img-fluid detail-pic" :src="activeTowerEvent?.coverImg" :alt="activeTowerEvent?.name">
        </div>
        <div class="col-7 d-flex flex-column justify-content-between my-3">
          <div>
            <div class="d-flex justify-content-between">
              <h5>{{ activeTowerEvent?.name }}</h5>
              <h6 class="text-success">{{ activeTowerEvent?.startDate }}</h6>
            </div>
            <h5 class="text-success">{{ activeTowerEvent?.type }}</h5>
            <br>
            <h6 class="text-light">{{ activeTowerEvent?.description }}</h6>
          </div>
          <div>
            <h6 class="text-primary">{{ activeTowerEvent?.capacity }} <span class="text-light">Spots Left</span></h6>
          </div>
        </div>

      </section>
    </div>
  </section>
</template>


<script lang="ts">
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';

export default {
  setup() {

    const route = useRoute();

    async function getActiveTower() {
      try {
        await towerEventsService.getActiveTower(route.params.towerEventId)
      } catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }

    onMounted(() => {
      getActiveTower()
    })

    return {

      activeTowerEvent: computed(() => AppState.activeTowerEvent),
      towerEvents: computed(() => AppState.towerEvents),

    }
  }
}
</script>


<style lang="scss" scoped>
.detail-pic {
  height: 40vh;
  width: auto;
}
</style>