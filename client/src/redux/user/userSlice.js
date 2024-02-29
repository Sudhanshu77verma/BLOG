import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    currentUser:null,
    error:null,
    loading:false,

}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
       state.loading=false;
       state.error=action.payload;

        },
        UpdateStart:(state)=>{
            state.loading=true;
            state.error=false;
        },
        UpdateSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;
        },
        UpdateFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        DeleteSuccess:(state,action)=>
        {
           state.loading=false;
           state.error=null;
           state.currentUser=null;
        },
        DeleteStart:(state)=>
        {
            state.loading=true;
          state.error=null;
        },
        DeleteFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;

        }

          
    }
})


export const  {signInStart,signInSuccess,signInFailure,UpdateStart,UpdateSuccess,UpdateFailure,DeleteFailure,DeleteStart,DeleteSuccess}=userSlice.actions;
export default userSlice.reducer