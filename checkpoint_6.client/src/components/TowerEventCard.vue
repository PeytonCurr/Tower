<template>
  <router-link :to="{ name: 'TowerEventDetails', params: { towerEventId: t.id } }">
    <div class="elevation-5 p-2 bg-grey selectable">
      <img class="img-fluid" :src="t.coverImg" :alt="t.name">
      <div class="p-1 elevation-1">
        <h5>{{ t.name }}</h5>
        <h6 class="text-success">{{ t.type }}</h6>
        <span class="d-flex justify-content-between">
          <h6 class="text-success">{{ t.startDate }}</h6>
          <h6 class="text-primary" v-if="!t.isCanceled">{{ t.capacity }} <span class="text-light">Spots Left</span></h6>
        </span>
        <div class="bg-danger text-dark text-center banner" v-if="t.isCanceled == true">
          <h5>Canceled</h5>
        </div>
        <div class="bg-danger text-dark text-center banner" v-if="t.capacity == 0">
          <h5>At Capacity</h5>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script lang="ts">
import { TowerEvent } from '../models/TowerEvent';

export default {
  props: {
    t: { type: TowerEvent, required: true }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.banner {
  width: 100%;
}
</style>