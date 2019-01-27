import { Action } from '@ngrx/store';
import { Auth } from '../../models/auth';

export enum AppActionTypes {
  LOGIN = '[app] LOGIN',
  LOGOUT = '[app] LOGOUT',
  STORE_AUTH = '[app] STORE_AUTH',
  STORE_AUTH_FROM_LOCAL_STORAGE = '[app] STORE_AUTH_FROM_LOCAL_STORAGE',
  PARSE_AUTH_HASH = '[app] PARSE_AUTH_HASH',
  CHECK_AUTH_SESSION = '[app] CHECK_AUTH_SESSION',
  STORE_LOADING = '[app] STORE_LOADING'
}

export namespace AppActions {
  export class Login implements Action {
    readonly type = AppActionTypes.LOGIN;
  }

  export class Logout implements Action {
    readonly type = AppActionTypes.LOGOUT;
  }

  export class StoreAuth implements Action {
    readonly type = AppActionTypes.STORE_AUTH;

    constructor(public payload: Auth) { }
  }

  export class StoreAuthFromLocalStorage implements Action {
    readonly type = AppActionTypes.STORE_AUTH_FROM_LOCAL_STORAGE;

    constructor(public payload: Auth) { }
  }

  export class ParseAuthHash implements Action {
    readonly type = AppActionTypes.PARSE_AUTH_HASH;

    constructor(public next: Action[]) { }
  }

  export class CheckAuthSession implements Action {
    readonly type = AppActionTypes.CHECK_AUTH_SESSION;

    constructor(public next: Action[]) { }
  }

  export class StoreLoading implements Action {
    readonly type = AppActionTypes.STORE_LOADING;

    constructor(public payload: boolean) { }
  }
}

export type AppAction =
  AppActions.Login |
  AppActions.Logout |
  AppActions.StoreAuth |
  AppActions.StoreAuthFromLocalStorage |
  AppActions.ParseAuthHash |
  AppActions.CheckAuthSession |
  AppActions.StoreLoading;
