import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrendingMovies = createAsyncThunk('moviesApiSlice/getMovies', async() => {
    const { data } = await axios(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=7399016d19bab98aa62c80499f557763");
    return data
})
const moviesApiSlice = createSlice({
        name: 'movies',
        initialState: [],
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getTrendingMovies.fulfilled, (state, action) => {
                return action.payload.results
            })
        }
    })
    // export const {} = moviesApiSlice.actions
export default moviesApiSlice.reducer