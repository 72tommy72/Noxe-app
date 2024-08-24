import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetailes() {
    const [movieDetails, setMovieDetails] = useState({});
    const {id} = useParams()
    async function getMovieDetailsById(){
        const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=7399016d19bab98aa62c80499f557763`)
        setMovieDetails(data);
    }
    useEffect(() => {
        getMovieDetailsById()
    }, []);
    return (
        <>
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <div className="content">
                        <img  className="w-100" src={"https://images.tmdb.org/t/p/w500/"+movieDetails.poster_path} alt="movie" />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="details">
                        <h2>{movieDetails.original_title}</h2>
                        <p>{movieDetails.overview}</p>
                        {movieDetails.genres?.map((genre ,idx)=>{return <span key={idx} className="mx-2 text-white btn btn-info "> {genre.name} </span>})}
                        <div className="">
                            <p className="mt-5 mb-3 lead  ">Vote : {movieDetails.vote_average}</p>
                            <p className="my-5 lead ">Vote_count : {movieDetails.vote_count}</p>
                            <p className="my-5 lead ">Popularity: {movieDetails.popularity}</p>
                            <p className="my-5 lead ">{movieDetails.overview}</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
