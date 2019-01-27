import { createSelector } from '@ngrx/store';
import * as moment from 'moment';

import { calendarFeatureSelector } from '../reducers';
import { State } from '../reducers/month.reducer';
import { Balance } from '../../models/balance';
import { Day } from '../../models/day';
import { Transaction } from '../../models/transaction';
import { Recurrence } from '../../models/recurrence';
import { Captured } from '../../models/captured';

export namespace CalendarSelectors {
  export const beginDate = createSelector(
    calendarFeatureSelector,
    (state: State): Date => state.beginDate
  );

  export const endDate = createSelector(
    calendarFeatureSelector,
    (state: State): Date => state.endDate
  );

  export const name = createSelector(
    beginDate,
    (bd): string => moment(bd).format('MMMM YYYY')
  );

  export const transactions = createSelector(
    calendarFeatureSelector,
    (state: State): Transaction[] => state.transactions
  );

  const balances = createSelector(
    calendarFeatureSelector,
    (state: State): Balance[] => state.balances
  );

  export const beginningBalance = createSelector(
    balances,
    (bb: Balance[]): Balance => bb.length && bb[0]
  );

  export const endingBalance = createSelector(
    balances,
    (bb: Balance[]): Balance => bb.length === 2 && bb[1]
  );

  const captureds = createSelector(
    calendarFeatureSelector,
    (state: State): Captured[] => state.captureds
  );

  export const captured = createSelector(
    captureds,
    (cc: Captured[]): boolean => cc.length > 0
  );

  export const recurrences = createSelector(
    calendarFeatureSelector,
    (state: State): Recurrence[] => state.recurrences
  );

  export const days = createSelector(
    beginDate,
    endDate,
    transactions,
    beginningBalance,
    captured,
    recurrences,
    (bd: Date, ed: Date, tt: Transaction[], b: Balance, c: boolean, rr: Recurrence[]): Day[] => {
      const result = new Array<Day>();

      let dayBalanceAmount = b.amount;
      for (let date = moment(bd).clone(); date <= moment(ed); date = date.add(1, 'days')) {
        const dayTransactions = tt.filter(t => date.isSame(moment(t.date), 'day'));

        const dayRecurrences = !c ? rr.filter(r => {
          if (date.isSameOrAfter(moment(r.startDate), 'day') && (!r.endDate || date.isSameOrBefore(moment(r.endDate), 'day'))) {
            if (r.monthlyFrequency) {
              return r.monthlyDate && moment(r.startDate).diff(date, 'months') % r.monthlyFrequency === 0 && date.date() === r.monthlyDate;
            }

            if (r.weeklyFrequency) {
              return r.weeklyDay && moment(r.startDate).diff(date, 'weeks') % r.weeklyFrequency === 0 && date.format('dddd') === r.weeklyDay;
            }
          }

          return false;
        }) : [];

        dayBalanceAmount += dayTransactions.reduce((total, t) => total + t.amount, 0) + dayRecurrences.reduce((total, r) => total + r.amount, 0);

        result.push({
          date: date.toDate(),
          transactions: dayTransactions,
          balance: dayBalanceAmount,
          recurrences: dayRecurrences
        });
      }

      return result;
    }
  );
}