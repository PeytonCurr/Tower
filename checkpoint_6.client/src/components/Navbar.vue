<template>
  <span class="">
    <button class="btn btn-success center selectable text-uppercase mt-3" @click="login" v-if="!user.isAuthenticated">
      Login
    </button>
    <div class="width text-center p-3" v-else>
      <button class="btn selectable no-select mb-1">
        <div v-if="account.picture || user.picture">
          <img :src="account.picture || user.picture" alt="account photo" class="rounded img-fluid" />
        </div>
      </button>
      <router-link :to="{ name: 'Home' }">
        <button class="btn text-primary my-1"> Home </button>
      </router-link>
      <router-link :to="{ name: 'Account' }">
        <button class="btn text-primary my-1"> Account </button>
      </router-link>

      <button class="btn btn-outline-primary text-primary selectable my-1" @click="logout">
        <i class="mdi mdi-logout"></i>
        logout
      </button>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.center {
  margin-left: 2.8em;
}

.width {
  width: 100%;
}
</style>
