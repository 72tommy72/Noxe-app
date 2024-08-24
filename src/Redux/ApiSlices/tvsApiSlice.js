import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrendingTvs = createAsyncThunk('/', async() => {
    const { data } = await axios(
        "https://api.themoviedb.org/3/trending/tv/week?api_key=7399016d19bab98aa62c80499f557763");
    return data
})
const tvApiSlice = createSlice({
    name: 'tvs',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTrendingTvs.fulfilled, (state, action) => {
            return action.payload.results
        })
    }

})

export default tvApiSlice.reducer