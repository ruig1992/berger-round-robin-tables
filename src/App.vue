<template>
  <div id="app">
    <div class="column">
      <div class="app-calendar"><div class="app-calendar__tour"><p class="app-calendar__tour-name">1 тур</p><ul class="app-calendar__games"><li class="app-calendar__game">1 – 4</li></ul><ul class="app-calendar__games"><li class="app-calendar__game">2 – 3</li></ul></div><div class="app-calendar__tour"><p class="app-calendar__tour-name">2 тур</p><ul class="app-calendar__games"><li class="app-calendar__game">4 – 3</li></ul><ul class="app-calendar__games"><li class="app-calendar__game">1 – 2</li></ul></div><div class="app-calendar__tour"><p class="app-calendar__tour-name">3 тур</p><ul class="app-calendar__games"><li class="app-calendar__game">2 – 4</li></ul><ul class="app-calendar__games"><li class="app-calendar__game">3 – 1</li></ul></div></div>
    </div>
    <div class="column">
      <p><b>Кількість команд-учасниць – {{ participantsNum }}</b></p>
      <div class="app-calendar">
        <div class="app-calendar__tour" v-for="tour in calendar" :key="tour.tour">
          <p class="app-calendar__tour-name">{{ tour.tour }} тур</p>
          <ul class="app-calendar__games" v-for="(g, i) in tour.games" :key="i">
            <li class="app-calendar__game">{{ g.team_1 }} – {{ g.team_2 }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tournament from './services/tournament.service';

export default {
  name: 'App',
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
.column {
  display: inline-block;
}
</style>
