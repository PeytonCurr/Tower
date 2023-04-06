<template>
  <div class="bg-grey justify-content-around rounded align-items-center row">
    <div class="col-2 text-center" @click="changeFilterType('')">
      <button class="btn catG">All</button>
      <div class="makeShiftBorder"></div>
    </div>
    <div class="col-2 text-center" @click="changeFilterType(t)" v-for="t in types">
      <button class="btn catG">{{ t.toUpperCase() }}</button>
      <div class="makeShiftBorder"></div>
    </div>
  </div>
</template>


<script lang="ts">
import { ref } from 'vue';
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';

export default {
  setup() {

    const filterType = ref('')

    const types = ["concert", "convention", "sport", "digital"]

    return {
      types,

      changeFilterType(type) {
        filterType.value = type
        AppState.filter = filterType.value
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.catG {
  color: #e5e5e5;
}

.col-2:hover .catG {
  color: #79E7AB;
}

.col-2:hover .makeShiftBorder {
  height: 5px;
  width: 100%;
  background-color: #79E7AB;
}
</style>