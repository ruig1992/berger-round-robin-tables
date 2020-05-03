<template>
  <div id="app">
    <p><b>Кількість команд-учасниць – {{ participantsNum }}</b></p>
    <CalendarInCols :data="calendar" />
  </div>
</template>

<script>
import CalendarInCols from './components/CalendarInCols';
import Tournament from './services/tournament.service';

export default {
  name: 'App',
  components: { CalendarInCols }, 
  data: () => ({
    participantsNum: 4,
    calendar: [],
  }),
  mounted() {
    const tournament = new Tournament(this.participantsNum);
    this.calendar = tournament.getToursCalendar();
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
  margin-top: 60px;
}
.app-calendar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
