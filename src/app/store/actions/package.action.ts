import { createAction, props } from "@ngrx/store";
import { City } from "src/app/models/city.model";
import { Times } from "src/app/models/times.model";


const GET_CITIES = '[CITIES] Get Cities';
const GET_CITIES_SUCCESS = '[CITIES] Get Cities Success';
const GET_CITIES_ERROR = '[CITIES] Get Cities Error';


const GET_TIMES = '[Times] Get Times';
const GET_TIMES_SUCCESS = '[Times] Get Times Success';
const GET_TIMES_ERROR = '[Times] Get Times Error';

const LOGIN = '[LOGIN] Login';
const LOGIN_SUCCESS = '[LOGIN] Login Success';
const LOGIN_ERROR = '[LOGIN] Login Error';


const SAVE = '[SAVE] Save';
const SAVE_SUCCESS = '[SAVE] Save Success';
const SAVE_ERROR = '[SAVE] Save Error';

export const save = createAction(
    SAVE,
    props<{data: any}>()
);
export const saveSuccess = createAction(
    SAVE_SUCCESS,
);
export const saveError = createAction(
    SAVE_ERROR,
    props<{error: string}>()
);

export const Login= createAction(
    LOGIN,
    props<{data: any}>()
);
export const LoginSuccess = createAction(
    LOGIN_SUCCESS,
);
export const LoginError = createAction(
    LOGIN_ERROR,
    props<{error: string}>()
);


export const getCities= createAction(
    GET_CITIES,
);
export const getCitiesSuccess = createAction(
    GET_CITIES_SUCCESS,
    props<{cities: City}>()
);
export const getCitiesError = createAction(
    GET_CITIES_ERROR,
    props<{error: string}>()
);


export const getTimes= createAction(
    GET_TIMES,
);
export const getTimesSuccess = createAction(
    GET_TIMES_SUCCESS,
    props<{times: Times}>()
);
export const getTimesError = createAction(
    GET_TIMES_ERROR,
    props<{error: string}>()
);