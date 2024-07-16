import { createAction,props } from "@ngrx/store";


export const setData=createAction('[User] Set Data',props<{data:any[]}>())