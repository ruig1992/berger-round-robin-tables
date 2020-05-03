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

    // First column is formed as follows:
    // For example, N = 8. We write down the first half of numbers on the left side, in the odd lines.
    // Then we write down the second half of numbers on the right side, in the even lines.
    // 1-
    // -5
    // 2-
    // -6
    // 3-
    // -7
    // 4-
    // Then the missing right or left part is filled with the max number (i.e., 8).
    // If N is odd number, the free participant is the one next to N+1
    // (i.e. in each round the whole first column is out of game, taking rest).
    makeFirstRow() {
        let counterFirstHalf = 0;
        let counterSecondHalf = 1;

        for (let i = 1; i <= this.toursNum; i++) {
            if (i <= this.gamesInTourNum) {
                if (this.isOdd) {
                    this.tours[counterFirstHalf].games[0].team_1 = i;
                } else {
                    this.tours[counterFirstHalf].games[0].team_1 = i;
                    this.tours[counterFirstHalf].games[0].team_2 = this.participantsNum;
                }
                counterFirstHalf += 2;
            } else if (i > this.gamesInTourNum && i != this.participantsNum) {
                if (this.isOdd) {
                    this.tours[counterSecondHalf].games[0].team_1 = i;
                } else {
                    this.tours[counterSecondHalf].games[0].team_1 = this.participantsNum;
                    this.tours[counterSecondHalf].games[0].team_2 = i;
                }
                counterSecondHalf += 2;
            }
        }
    }

    // The other rows are formed as follows (for example, N = 8):
    // Starting from the 2nd column,
    // - the left part is the next number of the previous column, including the first column,
    //   ignoring 8, in the ascending order;
    // - the right part is the previous number of the previous column, except the first column,
    //   ignoring 8, in the descending order.
    // The left part is calculated by methods 'left_increment' and 'left_increment_for_the_last_column'.
    // The right part is calculated by method 'right_decrement'.
    // The resulting matrix is as follows:
    // 1-8    2-7        3-6        4-5
    // 8-5    6-4        7-3        1-2
    // 2-8    3-1        4-7        5-6
    // 8-6    7-5        1-4        2-3
    // 3-8    4-2        5-1        6-7
    // 8-7    1-6        2-5        3-4
    // 4-8    5-3        6-2        7-1
    //
    // n         - number of participants.
    // t         - number of tours (n - 1).
    // m         - number of games in one tour (n / 2).
    makeOtherRows() {
        let left = 2, right = this.participantsNum - 1;

        for (let i = 0; i < this.toursNum; i++) {
            for (let j = 1; j <= this.gamesInTourNum - 1; j++) {
                this.tours[i].games[j].team_1 = left;
                this.tours[i].games[j].team_2 = right;
                right = this.rightDecrement(right);

                if (j < this.gamesInTourNum - 1) {
                    left = this.leftIncrement(left);
                } else if (j === this.gamesInTourNum - 1) {
                    left = this.leftIncrementForLastColumn(left);
                }
            }
        }
    }

    leftIncrement(n) {
        if (n === this.participantsNum - 1) {
            return 1;
        }
        return n + 1;
        /* if (n < this.participantsNum - 1) {
            return n + 1;
        } else if (n === this.participantsNum - 1) {
            return 1;
        } */
    }

    rightDecrement(n) {
        if (n === 1) {
            return this.participantsNum - 1;
        }
        return n - 1;
        /* if (n > 1) {
            return n - 1;
        } else if (n === 1) {
            return this.participantsNum - 1;
        } */
    }

    leftIncrementForLastColumn(n) {
        if (n === this.participantsNum - 2) {
            return 1;
        } else if (n === this.participantsNum - 1) {
            return 2;
        }
        return n + 2;
        /* if (n <= this.participantsNum - 3) {
            return n + 2;
        } else if (n === this.participantsNum - 2) {
            return 1;
        } else if (n === this.participantsNum - 1) {
            return 2;
        } */
    }

    getToursCalendar() {
        this.makeFirstRow();
        this.makeOtherRows();

        return this.tours;
    }
}
