<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-flex-1-5">
          <form @submit.prevent="addParticipant">
            <p><label>Назва <sup>*</sup>:
              <input type="text" v-model.trim="form.name" required>
              </label>
            </p>
            <p>Скорочена назва: {{ formNameShort }}</p>
            <p><label>... або введіть свою
              <input type="text" v-model.trim="form.name_short">
              </label>
            </p>
            <p><button type="submit" :disabled="isLoading">Додати учасника</button></p>
          </form>
          <section class="app-participants-section">
            <h3 class="header">Список учасників:</h3>
            <draggable
              v-model="participants"
              group="participants"
              draggable=".drag-item"
              tag="ul"
              class="app-participants-list"
              ghost-class="draggable-ghost"
              animation="200"
              @start="drag=true"
              @end="drag=false"
            >
              <li v-for="(item, index) in participants" :key="item.id"
                class="app-participants-list__item drag-item"
              >{{ index + 1 }} - {{ item.name }}</li>
            </draggable>
          </section>
        </div>
        <div class="col-flex-2">
          <section>
            <h3 class="header">Календар змагань:</h3>
            <TournamentCalendar
              :data="calendar"
              :isRowView="isRowView"
              :participants="participants"
            />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import TournamentCalendar from './components/TournamentCalendar';
import Tournament from './services/tournament.service';
import participantsList from './services/participant.service';

export default {
  name: 'App',
  components: { Draggable, TournamentCalendar },
  data() {
    return {
      participants: [],
      calendar: [],
      isRowView: false,
      isLoading: true,
      form: { name: '', name_short: '' },
    };
  },
  computed: {
    participantsCount() {
      return this.participants.length;
    },
    formNameShort() {
      const matches = this.form.name.replace(/"/g, '')
        .split(' ').filter((m) => m);

      return matches[0] === 'ФК' ? `${matches[0]} ${matches[1]}` : matches[0];
    },
  },
  mounted() {
    this.participants = participantsList;
    this.setCalendar();
  },
  methods: {
    setCalendar() {
      try {
        this.isLoading = true;
        const tournament = new Tournament(this.participantsCount);
        this.calendar = tournament.getToursCalendar();
        this.isLoading = false;

      } catch (error) {
        console.error(error.message);
      }
    },
    addParticipant: function() {
      this.participants.push({
        id: Date.now(),
        name: this.form.name,
        name_short: this.form.name_short || this.formNameShort,
      });
      this.form.name = '';
      this.form.name_short = '';

      this.setCalendar();
    },
  },
}
</script>

<style>
#app {
  padding: 20px 0 40px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.row {
  display: flex;
  flex-wrap: wrap;
}
.col {
  flex: 1;
}
.col-flex-1-5 {
  flex: 1.5;
}
.col-flex-2 {
  flex: 2;
}
.header {
  text-align: center;
}
.draggable-ghost {
  opacity: 0.5;
  background-color: #c8ebfb;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.app-participants-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.app-participants-list {
  list-style-type: none;
  padding: 0;
  font-size: 0.9em;
}
.app-participants-list__item {
  padding: 10px 15px;
  border: 1px solid #999;
  cursor: move;
}
</style>
