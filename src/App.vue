<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col cols="4">
          <section>
            <h2 class="h4 mb-4">Список учасників:</h2>
            <p v-if="!participantsCount">Поки що немає учасників...</p>
            <tournament-participants
              v-else
              :participants="participants"
              @updated="updateParticipants"
              @deleting="deleteParticipant"
              @deleting-all="deleteAllParticipants"
            />
          </section>

          <section class="mt-5">
            <h2 class="h4 mb-4">Додати учасника</h2>
            <add-participant-form
              :is-disabled="isLoading"
              @added="addParticipant"
            />
          </section>
        </b-col>

        <b-col>
          <section>
            <h2 class="h4 mb-4">Календар змагань</h2>
            <tournament-calendar
              :data="calendar"
              :participants="participants"
            />
          </section>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AddParticipantForm from '@/components/AddParticipantForm';
import TournamentParticipants from '@/components/TournamentParticipants';
import TournamentCalendar from '@/components/TournamentCalendar';
import Tournament from '@/services/tournament.service';
import {getParticipants, saveParticipants} from '@/services/participant.service';

export default {
  data() {
    return {
      participants: [],
      calendar: [],
      isLoading: false,
    };
  },
  methods: {
    setCalendar() {
      try {
        this.isLoading = true;
        const tournament = new Tournament(this.participantsCount);
        this.calendar = tournament.getRoundsCalendar();
        this.isLoading = false;
      } catch (error) {
        console.error(error.message);
      }
    },
    addParticipant(newParticipant) {
      this.participants.push(newParticipant);
    },
    updateParticipants(participants) {
      this.participants = participants;
    },
    deleteParticipant(id) {
      this.participants = this.participants.filter(p => p.id !== id);
    },
    deleteAllParticipants() {
      this.participants = [];
    },
  },
  mounted() {
    this.participants = getParticipants();
  },
  computed: {
    participantsCount() {
      return this.participants.length;
    },
  },
  watch: {
    participants() {
      saveParticipants(this.participants);
      this.setCalendar();
    },
  },
  components: {AddParticipantForm, TournamentParticipants, TournamentCalendar},
};
</script>

<style>
#app {
  padding: 20px 0 40px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
