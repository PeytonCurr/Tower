<template>
  <div class="modal fade text-dark" id="eventCreateModal" tabindex="-1" aria-labelledby="eventCreateModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Event</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form @submit.prevent="createEvent()">
          <div class="modal-body">
            <section class="row">
              <div class="col-12 mb-3">
                <label for="name">Name</label>
                <input type="text" class="form-control" required id="name" v-model="selectable.name"
                  placeholder="Enter Name of Event..." minlength="3" maxlength="50">
              </div>
              <div class="col-12 mb-3">
                <label for="description">Description</label>
                <textarea cols="30" rows="5" required minlength="3" maxlength="1000" class="form-control"
                  v-model="selectable.description" placeholder="Enter description of Event..."
                  id="description"></textarea>
              </div>
              <div class="col-12 mb-3">
                <label for="coverImg">CoverImg</label>
                <input type="url" class="form-control" required id="coverImg" v-model="selectable.coverImg"
                  placeholder="Enter CoverImg Url Here..." maxlength="500">
              </div>
              <div class="col-12 mb-3">
                <label for="location">Location</label>
                <input type="text" class="form-control" required id="location" v-model="selectable.location"
                  placeholder="Enter location Here..." minlength="3" maxlength="100">
              </div>
              <div class="col-12 mb-3">
                <label for="capacity">Event Capacity</label>
                <input type="number" class="form-control" required id="capacity" v-model="selectable.capacity"
                  placeholder="Enter Event Capacity Here..." min="0" max="10000">
              </div>
              <div class="col-12 mb-3">
                <label for="startDate">StartDate</label>
                <input type="date" class="form-control" required id="startDate" v-model="selectable.startDate">
              </div>
              <div class="col-12 mb-3">
                <select class="form-select form-select-lg" aria-label=".form-select-lg example" v-model="selectable.type">
                  <option v-for="t in types">{{ t }}</option>
                </select>
              </div>
            </section>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { ref } from "vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService";
import { router } from "../router";

export default {
  setup() {
    const selectable = ref({})

    return {
      selectable,
      types: ["concert", "convention", "sport", "digital"],


      async createEvent() {
        try {
          const eventData = selectable.value
          const towerEvent = await towerEventsService.createEvent(eventData)
          router.push({ name: 'TowerEventDetails', params: { towerEventId: towerEvent.id } })
        } catch (error) {
          logger.log(error.message)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>