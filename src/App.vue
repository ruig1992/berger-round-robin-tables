<template>
  <div id="app">
    <p>
      <label>
        <b>Кількість команд-учасниць: </b>
        <input type="number" min="3" size="2"
          v-model="participantsNum"
          @change="setCalendar"
          :disabled="isLoading"
        >
      </label>
    </p>
    <p>
      <label>
        <input type="checkbox"
          v-model="isRowView"
          :disabled="isLoading"
        > Показати як рядки
      </label>
    </p>
    <TournamentCalendar :data="calendar" :isRowView="isRowView" />
  </div>
</template>

<script>
import TournamentCalendar from './components/TournamentCalendar';
import Tournament from './services/tournament.service';

export default {
  name: 'App',
  components: { TournamentCalendar },
  data: () => ({
    participantsNum: 4,
    calendar: [],
    isRowView: false,
    isLoading: true,
  }),
  mounted() {
    this.setCalendar();
  },
  methods: {
    setCalendar() {
      try {
        this.isLoading = true;
        const tournament = new Tournament(this.participantsNum);
        this.calendar = tournament.getToursCalendar();
        this.isLoading = false;

      } catch (error) {
        console.error(error.message);
      }
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
