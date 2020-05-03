<template>
  <div class="app-calendar">
    <div class="app-calendar__tour" v-for="tour in data" :key="tour.tour">
    <p class="app-calendar__tour-name">{{ tour.tour }} тур</p>
    <ul class="app-calendar__games" v-for="(g, i) in tour.games" :key="i">
      <li class="app-calendar__game">{{ g.team_1 }} – {{ g.team_2 }}</li>
    </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarInCols',
  props: ['data'],
}
</script>
