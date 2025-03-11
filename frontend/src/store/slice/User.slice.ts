import { createSlice } from "@reduxjs/toolkit";
import { UserCredentials } from "../../types/auth";
import { RootState } from "../store";


const initialState:{user:UserCredentials|undefined}={
    user:undefined
}

export const UserSlice =createSlice(
    {
        "name":"UserSlice",
        initialState,
        reducers:{
            setUser:(state, action) => {
                state.user = action.payload
            },
            removeUser:(state) => {
                state.user = undefined
            }
        }
    }
)

export const { setUser, removeUser } = UserSlice.actions

export const UserSlicePath = (state:RootState)=> state.UserSlice