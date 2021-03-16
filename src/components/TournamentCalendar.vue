<template>
  <div class="app-calendar">
    <div class="app-calendar__round" v-for="roundData in data" :key="roundData.round">
      <p class="app-calendar__round-name">{{ roundData.round }} тур</p>
      <ul class="app-calendar__games">
        <li v-for="game in roundData.games"
            :key="game.id"
            class="app-calendar__game"
            :data-id="game.id"
        >
          <div class="app-calendar__team">
            <span v-show="game.team_1">
              <sup>({{ game.team_1 }})</sup>{{ getParticipant(game.team_1) }}
            </span>
          </div>
          <div class="app-calendar__teams-delimiter">–</div>
          <div class="app-calendar__team">
            <span v-show="game.team_2">
              <sup>({{ game.team_2 }})</sup>{{ getParticipant(game.team_2) }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const SHOW_NAME_TYPE_FULL = 'full';
const SHOW_NAME_TYPE_SHORT = 'short';

export default {
  props: {
    data: {type: Array},
    participants: {type: Array},
    showNameType: {
      type: String,
      default: SHOW_NAME_TYPE_SHORT,
      validator(value) {
        value = value.toLowerCase();
        return value === SHOW_NAME_TYPE_FULL || value === SHOW_NAME_TYPE_SHORT;
      },
    },
  },
  methods: {
    getParticipant(num) {
      const p = this.participants[num - 1];
      if (!num || !p) {
        return null;
      }
      return this.showNameType === SHOW_NAME_TYPE_SHORT ? p.name_short : p.name;
    },
  },
};
</script>

<style>
.app-calendar {
  display: flex;
  flex-wrap: wrap;
}

.app-calendar__round {
  width: 50%;
  padding: 1rem .5rem;
}

.app-calendar__round-name {
  margin: 0;
  font-weight: 700;
  text-align: center;
}

.app-calendar__games {
  list-style-type: none;
  margin: 1rem 0 0;
  padding-left: 0;
  font-size: 14px;
}

.app-calendar__game {
  display: flex;
}

.app-calendar__team {
  flex: 1;
  padding: 2px 7px;
}

.app-calendar__team sup {
  margin-right: 3px;
}
</style>
