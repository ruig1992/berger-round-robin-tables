<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col md="5" lg="4">
          <section class="mt-5 mt-md-4">
            <h2 class="h4 mb-4">Вибрати турнір</h2>
            <b-form-select v-model="tournamentName" @change="changeTournament">
              <b-form-select-option value="1_league">Чемпіонат області</b-form-select-option>
              <b-form-select-option value="2_league">Першість області</b-form-select-option>
            </b-form-select>
          </section>

          <section class="mt-5">
            <h2 class="h4 mb-4">Додати учасника</h2>
            <add-participant-form :is-disabled="isLoading" @added="addParticipant" />
          </section>

          <section class="mt-5">
            <h2 class="h4 mb-4">Список учасників:</h2>
            <p v-if="!participantsCount">Поки що немає учасників...</p>
            <tournament-participants
              v-else
              :participants="participants"
              @updated="updateParticipants"
              @toggle-empty="toggleParticipantEmptyStatus"
              @deleting="deleteParticipant"
              @deleting-all="deleteAllParticipants"
            />
          </section>
        </b-col>

        <b-col>
          <section class="mt-5 mt-md-4">
            <header class="mb-4">
              <h2 class="h4 mb-3">Календар змагань</h2>

              <b-button-group size="sm">
                <b-button
                  variant="info"
                  @click="copyStandingsToClipboard"
                >Повна турнірка</b-button>

                <b-button
                  class="ml-2"
                  variant="info"
                  @click="copyStandingsToClipboard(false)"
                >Мала турнірка</b-button>

                <b-button
                  class="ml-2"
                  variant="info"
                  @click="copyCalendarToClipboard"
                >Календар на сайт</b-button>
              </b-button-group>
            </header>

            <tournament-calendar :data="calendar" />
          </section>
        </b-col>
      </b-row>
    </b-container>

    <textarea
      v-model.trim="copyClipboardData"
      class="app-copy-clipboard-area"
      ref="copyClipboard"
    ></textarea>
  </div>
</template>

<script>
import AddParticipantForm from '@/components/AddParticipantForm';
import TournamentParticipants from '@/components/TournamentParticipants';
import TournamentCalendar from '@/components/TournamentCalendar';
import Tournament from '@/services/tournament.service';
import {getParticipants, saveParticipants} from '@/services/participant.service';

export default {
  name: 'App',
  data() {
    return {
      tournamentName: '1_league',
      tournamentChanged: false,
      participants: [],
      calendar: [],
      isLoading: false,
      isStartFetch: true,
      copyClipboardData: '',
    };
  },
  methods: {
    async changeTournament() {
      this.tournamentChanged = true;
      await this.fetchParticipants();
    },
    setCalendar() {
      try {
        this.isLoading = true;
        const tournament = new Tournament(this.participants);
        this.calendar = tournament.getRoundsCalendar();
        this.isLoading = false;
      } catch (error) {
        console.error(error.message);
      }
    },
    async fetchParticipants() {
      this.participants = await getParticipants(this.tournamentName);
    },
    addParticipant(newParticipant) {
      this.participants.push(newParticipant);
    },
    updateParticipants(participants) {
      this.participants = participants;
    },
    toggleParticipantEmptyStatus(id) {
      const index = this.participants.findIndex(p => p.id === id);
      const participant = this.participants[index];
      this.participants.splice(index, 1, {
        ...participant,
        empty_value: !participant.empty_value,
      });
    },
    deleteParticipant(id) {
      this.participants = this.participants.filter(p => p.id !== id);
    },
    deleteAllParticipants() {
      this.participants = [];
    },
    getParticipantByNumber(num) {
      if (!num) {
        return null;
      }
      const p = this.participants[num - 1];
      if (!p) {
        return null;
      }
      return p;
    },
    generateCalendarForClipboard(reverse = false) {
      let rounds = '';
      const roundDatetime = !reverse ? '00 серпня (неділя), 00:00' : '';

      this.calendar.forEach((roundData) => {
        let games = '';
        let roundNum = roundData.round;
        if (reverse) {
          roundNum += this.calendar.length;
        }

        roundData.games.forEach((game) => {
          const teamNum1 = reverse ? game.team_2 : game.team_1;
          const teamNum2 = reverse ? game.team_1 : game.team_2;
          const team1 = this.getParticipantByNumber(teamNum1);
          const team2 = this.getParticipantByNumber(teamNum2);

          if (teamNum1 && teamNum2 && !team1.empty_value && !team2.empty_value) {
            games += `<div class="tour-match">
<div class="team home" data-teamhover="${teamNum1}">${team1.name_short}</div>
<div class="result">:</div>
<div class="team guest" data-teamhover="${teamNum2}">${team2.name_short}</div>
</div>\n`;
          }
        });
        games = games.trim();

        rounds += `<div class="competition-tour">
<div class="tour-name">${roundNum} тур</div>
<div class="tour-datetime">${roundDatetime}</div>
${games}
</div>\n`;
      });
      rounds = rounds.trim();

      return `<div class="ifff-tabs-pane">
<div class="competition-tours-list">
${rounds}
</div>
</div>`;
    },
    executeCopyToClipboard() {
      this.$nextTick().then(() => {
        this.$refs.copyClipboard.select();
        document.execCommand('copy');
        this.$swal({
          toast: true,
          icon: 'success',
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          title: 'Дані скопійовано в буфер обміну',
        });
        this.copyClipboardData = '';
      });
    },
    copyStandingsToClipboard(isFull = true) {
      let html = '';
      this.participants.forEach((p, i) => {
        let name = p.name_short;
        let numbers = '<td>0</td><td>0</td>';
        if (isFull) {
          name = p.name;
          numbers += '<td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>';
        }
        html += `<tr><td>${i + 1}</td><td>${name}</td>${numbers}</tr>\n`;
      });
      this.copyClipboardData = html;

      this.executeCopyToClipboard();
    },
    copyCalendarToClipboard() {
      this.copyClipboardData = this.generateCalendarForClipboard()
        + "\n" + this.generateCalendarForClipboard(true);

      this.executeCopyToClipboard();
    },
  },
  async mounted() {
    await this.fetchParticipants();
  },
  computed: {
    participantsCount() {
      return this.participants.length;
    },
  },
  watch: {
    async participants(newParticipants) {
      let result = false;

      if (!this.isStartFetch && !this.tournamentChanged) {
        result = await saveParticipants(this.tournamentName, newParticipants);
      }
      if (this.isStartFetch || this.tournamentChanged || result) {
        this.setCalendar();
      }

      this.isStartFetch = false;
      this.tournamentChanged = false;
    },
  },
  components: {AddParticipantForm, TournamentParticipants, TournamentCalendar},
};
</script>

<style>
#app {
  padding: 20px 0 150px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
label,
.app-form-label {
  font-weight: 600;
}
.swal2-actions .btn {
  margin: 0 .5rem;
}
.app-copy-clipboard-area {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
