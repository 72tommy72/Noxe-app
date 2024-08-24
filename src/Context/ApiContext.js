import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MyApiContext = createContext()

export function ApiContextProvider (props) {
    const [tvApi, setTvApi] = useState([]);
    const [movieApi, setMovieApi] = useState([]);
    const getTrendingTvs =async ()=> {
        const {data} = await axios(
            "https://api.themoviedb.org/3/trending/tv/week?api_key=7399016d19bab98aa62c80499f557763");
        setTvApi(data.results);
    }
    const getTrendingMovies = async ()=>{
        const {data} = await axios(
            "https://api.themoviedb.org/3/trending/movie/week?api_key=7399016d19bab98aa62c80499f557763");
            setMovieApi(data.results);
    }
    useEffect(() => {
        getTrendingTvs();
        getTrendingMovies();
        return ()=>{
            setTvApi([])            
            setMovieApi([])
        }
    }, []);
    return (
        <MyApiContext.Provider value={{
            tvApi,
            movieApi
        }}>
            {props.children}
        </MyApiContext.Provider>
    )
}