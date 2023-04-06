<template></template>

<script lang="ts">
import { onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { towerEventsService } from '../services/TowerEventsService.js'

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

    return {}
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
