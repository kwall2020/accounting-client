import { createSelector } from '@ngrx/store';
import * as moment from 'moment';

import { calendarFeatureSelector } from '../reducers';
import { State } from '../reducers/calendar.reducer';
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
    (beginDate1): string => moment(beginDate1).format('MMMM YYYY')
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
    (balances1: Balance[]): number => balances1.length && balances1[0].amount
  );

  const captureds = createSelector(
    calendarFeatureSelector,
    (state: State): Captured[] => state.captureds
  );

  export const captured = createSelector(
    captureds,
    (captureds1: Captured[]): boolean => captureds1.length > 0
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
    (beginDate1: Date, endDate1: Date, transactions1: Transaction[], beginningBalance1: number, captured1: boolean, recurrences1: Recurrence[]): Day[] => {
      const result = new Array<Day>();

      let dayBalance = beginningBalance1;
      for (let date = moment(beginDate1).clone(); date <= moment(endDate1); date = date.add(1, 'days')) {
        const dayTransactions = transactions1.filter(t => date.isSame(moment(t.date), 'day'));

        const dayRecurrences = !captured1 ? recurrences1.filter(r => {
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

        dayBalance += dayTransactions.reduce((total, t) => total + t.amount, 0) + dayRecurrences.reduce((total, r) => total + r.amount, 0);

        result.push({
          date: date.toDate(),
          transactions: dayTransactions,
          balance: dayBalance,
          recurrences: dayRecurrences
        });
      }

      return result;
    }
  );
}
