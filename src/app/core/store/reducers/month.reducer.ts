import * as moment from 'moment';

import { CalendarActionTypes, CalendarAction } from '../actions/month.actions';
import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Recurrence } from '../../models/recurrence';
import { Captured } from '../../models/captured';

export interface State {
  beginDate: Date;
  endDate: Date;
  transactions: Transaction[];
  balances: Balance[];
  captureds: Captured[];
  recurrences: Recurrence[];
}

const initialState: State = {
  beginDate: moment().startOf('month').startOf('day').toDate(),
  endDate: moment().endOf('month').endOf('day').toDate(),
  transactions: [],
  balances: [],
  captureds: [{ date: moment().startOf('month').startOf('day').toDate() }],
  recurrences: []
};

export function reducer(state = initialState, action: CalendarAction): State {
  switch (action.type) {
    case CalendarActionTypes.NEXT_MONTH:
      return {
        ...state,
        beginDate: moment(state.beginDate).add(1, 'month').startOf('month').startOf('day').toDate(),
        endDate: moment(state.beginDate).add(1, 'month').endOf('month').endOf('day').toDate(),
        transactions: [],
        balances: [],
        captureds: [{ date: moment(state.beginDate).add(1, 'month').startOf('month').startOf('day').toDate() }]
      };

    case CalendarActionTypes.PREVIOUS_MONTH:
      return {
        ...state,
        beginDate: moment(state.beginDate).subtract(1, 'month').startOf('month').startOf('day').toDate(),
        endDate: moment(state.beginDate).subtract(1, 'month').endOf('month').endOf('day').toDate(),
        transactions: [],
        balances: [],
        captureds: [{ date: moment(state.beginDate).subtract(1, 'month').startOf('month').startOf('day').toDate() }]
      };

    case CalendarActionTypes.STORE_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };

    case CalendarActionTypes.STORE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((t: Transaction) => {
          if (t.id === action.payload.id) {
            return action.payload;
          }
          return t;
        })
      };

    case CalendarActionTypes.STORE_BALANCES:
      return {
        ...state,
        balances: action.payload
      };

    case CalendarActionTypes.STORE_CAPTUREDS:
      return {
        ...state,
        captureds: action.payload
      };

    case CalendarActionTypes.STORE_RECURRENCES:
      return {
        ...state,
        recurrences: action.payload
      };
  }

  return state;
}