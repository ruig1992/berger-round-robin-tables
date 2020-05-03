export default class Tournament {
    constructor(participantsNum) {
        this.participantsNum = +participantsNum;
        this.isOdd = false;

        // If the number of participants is odd
        if (participantsNum % 2 !== 0) {
            this.participantsNum++;
            this.isOdd = true;
        }

        this.toursNum = this.participantsNum - 1;
        this.gamesInTourNum = this.participantsNum / 2;
        this.tours = [];

        for (let i = 0; i < this.toursNum; i++) {
            const data = {
                tour: i + 1,
                games: [],
            };
            for (let j = 0; j < this.gamesInTourNum; j++) {
                const game = { team_1: null, team_2: null };
                data.games.push(game);
            }
            this.tours.push(data);
        }
    }

    getToursCalendar() {
        return this.tours;
    }
}