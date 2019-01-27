import { Action } from '@ngrx/store';

import { Transaction } from '../../models/transaction';
import { Balance } from '../../models/balance';
import { Recurrence } from '../../models/recurrence';
import { Captured } from '../../models/captured';
import { Day } from '../../models/day';

export enum CalendarActionTypes {
  LOAD = '[calendar] LOAD',
  NEXT_MONTH = '[calendar] NEXT_MONTH',
  PREVIOUS_MONTH = '[calendar] PREVIOUS_MONTH',
  READ_TRANSACTIONS = '[calendar] READ_TRANSACTIONS',
  STORE_TRANSACTIONS = '[calendar] STORE_TRANSACTIONS',
  UPDATE_TRANSACTION = '[calendar] UPDATE_TRANSACTION',
  STORE_TRANSACTION = '[calendar] STORE_TRANSACTION',
  READ_BALANCES = '[calendar] READ_BALANCES',
  STORE_BALANCES = '[calendar] STORE_BALANCES',
  READ_CAPTUREDS = '[calendar] READ_CAPTUREDS',
  STORE_CAPTUREDS = '[calendar] STORE_CAPTUREDS',
  READ_RECURRENCES = '[calendar] READ_RECURRENCES',
  STORE_RECURRENCES = '[calendar] STORE_RECURRENCES',
  UPDATE_CAPTURED = '[calendar] UPDATE_CAPTURED'
}

export namespace CalendarActions {
  export class Load implements Action {
    readonly type = CalendarActionTypes.LOAD;
  }

  export class NextMonth implements Action {
    readonly type = CalendarActionTypes.NEXT_MONTH;
  }

  export class PreviousMonth implements Action {
    readonly type = CalendarActionTypes.PREVIOUS_MONTH;
  }

  export class ReadTransactions implements Action {
    readonly type = CalendarActionTypes.READ_TRANSACTIONS;
  }

  export class StoreTransactions implements Action {
    readonly type = CalendarActionTypes.STORE_TRANSACTIONS;

    constructor(public payload: Transaction[]) { }
  }

  export class UpdateTransaction implements Action {
    readonly type = CalendarActionTypes.UPDATE_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class StoreTransaction implements Action {
    readonly type = CalendarActionTypes.STORE_TRANSACTION;

    constructor(public payload: Transaction) { }
  }

  export class ReadBalances implements Action {
    readonly type = CalendarActionTypes.READ_BALANCES;
  }

  export class StoreBalances implements Action {
    readonly type = CalendarActionTypes.STORE_BALANCES;

    constructor(public payload: Balance[]) { }
  }

  export class ReadCaptureds implements Action {
    readonly type = CalendarActionTypes.READ_CAPTUREDS;
  }

  export class StoreCaptureds implements Action {
    readonly type = CalendarActionTypes.STORE_CAPTUREDS;

    constructor(public payload: Captured[]) { }
  }

  export class ReadRecurrences implements Action {
    readonly type = CalendarActionTypes.READ_RECURRENCES;
  }

  export class StoreRecurrences implements Action {
    readonly type = CalendarActionTypes.STORE_RECURRENCES;

    constructor(public payload: Recurrence[]) { }
  }

  export class UpdateCaptured implements Action {
    readonly type = CalendarActionTypes.UPDATE_CAPTURED;

    constructor(public payload: Day[]) { }
  }
}

export type CalendarAction =
  CalendarActions.Load |
  CalendarActions.NextMonth |
  CalendarActions.PreviousMonth |
  CalendarActions.ReadTransactions |
  CalendarActions.StoreTransactions |
  CalendarActions.UpdateTransaction |
  CalendarActions.StoreTransaction |
  CalendarActions.ReadBalances |
  CalendarActions.StoreBalances |
  CalendarActions.ReadCaptureds |
  CalendarActions.StoreCaptureds |
  CalendarActions.ReadRecurrences |
  CalendarActions.StoreRecurrences |
  CalendarActions.UpdateCaptured;
