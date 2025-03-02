import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData: []
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.bannerData = action.payload;
        },
    },  
});

export const { setBannerData } = appSlice.actions;
export default appSlice.reducer;