import { createSlice, current } from "@reduxjs/toolkit";

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
        DeleteSuccess:(state)=>
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

        },
        SignoutSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null
        }

          
    }
})


export const  {signInStart,signInSuccess,signInFailure,UpdateStart,UpdateSuccess,UpdateFailure,DeleteFailure,DeleteStart,DeleteSuccess,SignoutSuccess}=userSlice.actions;
export default userSlice.reducer