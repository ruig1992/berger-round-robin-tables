/* eslint-disable */
const chai = require('chai');
const expect = chai.expect;

import Tournament from '../src/services/tournament.service';
import equalResInArr from './mock_data';

const getEqualRes = function(equalResArr) {
    return equalResArr.map((tour, tourNum) => {
        const games = tour.map((game) => {
            const t = game.split('-');
            return { team_1: +t[0] || null, team_2: +t[1] || null };
        });
        return { tour: tourNum + 1, games };
    });
};

describe('Tournament', function() {
  describe('#getToursCalendar()', function() {
    for (let num = 3; num <= 32; num++) {
        it(`must return correct data for "participantsNum = ${num}"`, () => {
            const tournament = new Tournament(num);
            const res = tournament.getToursCalendar();
            const equalRes = getEqualRes(equalResInArr[num]);

            expect(res).to.eql(equalRes);
        });
    }
  });
});
