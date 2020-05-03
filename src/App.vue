<template>
  <div id="app">
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
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    participantsNum: 4,
    calendar: [
      { tour: 1, games: [{ team_1: 1, team_2: 4 }, { team_1: 2, team_2: 3 },] },
      { tour: 2, games: [{ team_1: 4, team_2: 3 }, { team_1: 1, team_2: 2 },] },
      { tour: 3, games: [{ team_1: 2, team_2: 4 }, { team_1: 3, team_2: 1 },] },
    ],
  }),
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
</style>
