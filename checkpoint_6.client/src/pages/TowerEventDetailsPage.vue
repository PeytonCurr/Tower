<template>
  <section class="row p-3">
    <div class="col-12 my-3">

      <!-- SECTION Active Event -->
      <section class="row elevation-5 p-3 bg-grey rounded">
        <div class="text-end" v-if="account.id == activeTowerEvent?.creatorId">
          <button class="btn btn-outline-danger" @click="cancelTowerEvent()">Cancel Event</button>
        </div>

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
          <div class="d-flex justify-content-between">
            <h6 class="text-primary" v-if="!activeTowerEvent?.isCanceled">{{ activeTowerEvent?.capacity }} <span
                class="text-light">Spots Left</span></h6>
            <div>
              <button class="btn btn-warning" @click="createTicket()"
                v-if="!ticketMembers.find(m => m.id == account.id) && activeTowerEvent?.isCanceled == false && activeTowerEvent?.capacity !== 0">Attend
                <i class="mdi mdi-gymnastics"></i></button>
              <button class="btn btn-danger" @click="deleteTicket(isTicketEvent.collaborationId)"
                v-if="ticketMembers.find(m => m.id == account.id)"> UnAttend <i class=" mdi mdi-gymnastics"></i></button>
            </div>
          </div>
        </div>
        <div class="bg-danger text-dark text-center banner" v-if="activeTowerEvent?.isCanceled == true">
          <h5>Canceled</h5>
        </div>
        <div class="bg-danger text-dark text-center banner" v-if="activeTowerEvent?.capacity == 0">
          <h5>At Capacity</h5>
        </div>
      </section>
    </div>

    <div class="col-12 my-3">

      <!-- SECTION See Who's Attending -->
      <h6>See who is attending</h6>

      <section class="row bg-grey elevation-5 rounded p-2">

        <!-- STUB Ticket Owner -->
        <div class="col-12">
          <span class="p-1" v-for="t in ticketMembers" :key="t?.id">
            <img :title="t?.name" class="rounded-circle" height="60" :src="t?.picture" :alt="t?.name">
          </span>
        </div>

      </section>

    </div>

    <div class="col-12 my-3">

      <!-- SECTION Comment Area -->
      <h6>What people are saying</h6>
      <section class="row bg-grey elevation-5 rounded p-2">

        <!-- STUB Create Comment -->
        <div class="col-12 text-end" v-if="account?.id">
          <h6 class="text-success">Join the Conversation</h6>
          <form @submit.prevent="createComment()">
            <textarea class="form-control" id="body" cols="30" rows="3" placeholder="Enter your Comment here..." required
              minlength="3" maxlength="200" v-model="editable.body"></textarea>
            <button type="submit" class="btn btn-success my-2">Post Comment</button>
          </form>
        </div>

        <div class="col-12 pb-4 pe-4" v-if="comments[0]?.body">

          <!-- STUB Comments -->
          <section class="row p-2" v-for="c in comments">
            <div class="col-1 text-end ps-0"><img class="rounded-circle" height="80" :src="c.creator?.picture"
                :alt="c.creator?.name">
            </div>
            <div class="col-11 bg-secondary rounded">
              <div class="d-flex justify-content-between p-1">
                <h6>{{ c.creator?.name }}</h6> <button class="btn btn-outline-danger text-danger"
                  v-if="account?.id == c.creatorId" @click="deleteComment(c.id)"><i class="mdi mdi-delete"></i></button>
              </div>
              <p>{{ c?.body }}</p>
            </div>
          </section>

        </div>
      </section>
    </div>

  </section>
</template>


<script lang="ts">
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { towerEventsService } from '../services/TowerEventsService';
import { ticketsService } from '../services/TicketsService';
import { commentsService } from '../services/CommentsService';

export default {
  setup() {
    const editable = ref({})

    const route = useRoute();

    async function getAllComments() {
      try {
        await commentsService.getAllComments(route.params.towerEventId);
      } catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }

    async function getActiveTower() {
      try {
        await towerEventsService.getActiveTower(route.params.towerEventId)
      } catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }

    async function getAllTicketMembers() {
      try {
        await ticketsService.getAllTicketMembers(route.params.towerEventId)
      } catch (error) {
        logger.error(error.message);
        Pop.error(error.message);
      }
    }

    onMounted(() => {
      getActiveTower()
      getAllTicketMembers()
      getAllComments()
    })

    return {
      editable,
      activeTowerEvent: computed(() => AppState.activeTowerEvent),
      towerEvents: computed(() => AppState.towerEvents),
      ticketMembers: computed(() => AppState.ticketMembers),
      account: computed(() => AppState.account),
      isTicketEvent: computed(() => AppState.ticketMembers.find(t => t.id == AppState.account.id)),
      comments: computed(() => AppState.comments),

      async createTicket() {
        try {
          await ticketsService.createTicket(AppState.activeTowerEvent?.id);
        } catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },

      async deleteTicket(collaborationId) {
        try {
          if (await Pop.confirm('Are you sure you want to unAttend?')) {
            await ticketsService.deleteTicket(collaborationId);
          }
        } catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      },

      async cancelTowerEvent() {
        try {
          await towerEventsService.cancelTowerEvent(AppState.activeTowerEvent?.id);
        } catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      },

      async createComment() {
        try {
          // logger.log('Creating Comment')
          let commentData = editable.value
          commentData.eventId = AppState.activeTowerEvent?.id
          editable.value = {}
          await commentsService.createComment(commentData);
        } catch (error) {
          logger.error(error.message);
          Pop.error(error.message);
        }
      },

      async deleteComment(commentId) {
        try {
          // logger.log('Attempting to Delete Comment')
          await commentsService.deleteComment(commentId);
        } catch (error) {
          logger.error(error);
          Pop.error(error.message);
        }
      },

    }
  }
}
</script>


<style lang="scss" scoped>
.detail-pic {
  height: 40vh;
  width: auto;
}

.banner {
  width: 100%;
}
</style>