import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData : null,
    participants:[]
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true,
            state.userData = action.payload
        },
        logout:(state) => {
            state.status = false
            state.userData = null
        },
        loadData:(state,action) => {
            state.participants = action.payload
        }
    }

})

export const {login,logout,loadData} = authSlice.actions;
export default authSlice.reducer;