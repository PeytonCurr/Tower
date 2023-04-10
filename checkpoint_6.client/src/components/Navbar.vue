<template>
  <span class="">
    <button class="btn btn-success center selectable text-uppercase mt-3" @click="login" v-if="!user.isAuthenticated">
      Login
    </button>
    <div class="width text-center p-3">
      <div class="no-select mb-1 border border-primary" v-if="user.isAuthenticated">
        <div v-if="account.picture || user.picture">
          <img :src="account.picture || user.picture" alt="account photo" class="rounded img-fluid" />
        </div>
      </div>
      <router-link :to="{ name: 'Home' }">
        <button class="btn text-primary my-1"> Home </button>
      </router-link>
      <router-link :to="{ name: 'Account' }" v-if="user.isAuthenticated">
        <button class="btn text-primary my-1"> Account </button>
      </router-link>

      <button class="btn btn-success text-dark my-1" v-if="user.isAuthenticated" data-bs-toggle="modal"
        data-bs-target="#eventCreateModal"> New Event </button>

      <button class="btn btn-outline-primary text-primary selectable mt-2" @click="logout" v-if="user.isAuthenticated">
        <i class="mdi mdi-logout"></i>
        logout
      </button>
    </div>
  </span>
  <EventCreateModel />
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import EventCreateModel from './EventCreateModel.vue'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      }
    };
  },
  components: { EventCreateModel }
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
