<template>
  <div class="app-calendar" :class="{ 'app-calendar--row-view': isRowView }">
    <div class="app-calendar__tour" v-for="tour in data" :key="tour.tour">
      <p class="app-calendar__tour-name">{{ tour.tour }} тур</p>
      <ul class="app-calendar__games">
        <li v-for="(g, i) in tour.games" :key="i"
          class="app-calendar__game"
        >
          <sup>({{ g.team_1 }})</sup>
          {{ getParticipant(g.team_1) }} – <sup>({{ g.team_2 }})</sup>
          {{ getParticipant(g.team_2) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TournamentCalendar',
  props: {
    data: { type: Array },
    participants: { type: Array },
    isRowView: { type: Boolean, default: false, },
  },
  methods: {
    getParticipant(num) {
      const p = this.participants[num - 1];
      if (!num || !p) {
        return null;
      }
      return p.name_short || p.name;
    }
  },
}
</script>

<style>
.app-calendar {
  display: flex;
  flex-wrap: wrap;
}
.app-calendar--row-view {
  flex-direction: column;
  align-items: center;
}
.app-calendar__tour {
  padding: 10px;
  width: calc(50% - 20px);
}
.app-calendar--row-view .app-calendar__tour {
  display: flex;
  align-items: center;
  width: 100%;
}
.app-calendar__tour-name {
  margin: 0;
  font-weight: 700;
}
.app-calendar__games {
  list-style-type: none;
  margin: 10px 0 0;
  padding-left: 0;
}
.app-calendar--row-view .app-calendar__games {
  display: flex;
  margin: 0 0 0 20px;
}
.app-calendar__game {
  margin: 5px 0 0;
}
.app-calendar--row-view .app-calendar__game {
  width: 60px;
  margin: 0 0 0 5px;
}
</style>
