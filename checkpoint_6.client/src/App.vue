<template>
  <main class="container-fluid bg-dark p-0 m-0">
    <section class="row p-0 m-0">
      <div class="col-11 p-0">
        <header></header>
        <router-view />
      </div>
      <div class="col-1 nav">
        <NavbarVue />
      </div>
    </section>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import NavbarVue from '../src/components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { NavbarVue }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

.nav {
  height: 100vh;
  background: #474b5f;
}
</style>
