import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {  useEffect } from 'react'
import AOS from "aos";
import { Link } from 'react-router-dom';
// import { MyApiContext } from '../../Context/ApiContext';
import { useDispatch, useSelector } from 'react-redux';
import { getTrendingMovies } from '../../Redux/ApiSlices/moviesApiSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { getTrendingMovies } from '../../Redux/moviesApiSlice';



export default function Movies() {

    // const {movieApi} = useSelector((data )=> {return console.log(data.apiMoviesReducer)})
    // const {movieApi} = useContext(MyApiContext)

    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(getTrendingMovies())
        }, [dispatch]);
    useEffect(() => {
        AOS.init({ duration: 1000 });  // Initialize AOS and set duration if needed
    }, []);
    const movieApi = useSelector((state) => state.moviesApi)

    
    return (
        <>
        {
        movieApi.length === 0 
            ?<div className="container- vh-100 d-flex justify-content-center align-items-center bg-secondary bg-opacity-25">
            <FontAwesomeIcon className="fa-5x fa-spin" icon={faSpinner } /></div>
            :
            <div className="container mt-3">
                <div className="row ">
                <div className="col-md-4  position-relative d-flex align-items-center">
                        <div className="trending-tvs ">
                            <div className="upper"></div>
                            <h2>List  </h2>
                            <h2>Movies to Watch now</h2>
                            <p className=" fa-1x my-3 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aspernatur.
                            </p>
                            <div className="lower"></div>
                        </div>
                    </div>
                    {movieApi.length !== 0 
                    ?movieApi.map((movie ,idx)=>{return <div key={idx } className="col-md-2">
                        <div className="movie">
                            <div data-aos="fade-up">
                                <Link to={`/moviedetails/${movie.id}`}>
                                    <img className="w-100" src={"https://images.tmdb.org/t/p/w500/"+movie.poster_path} alt="movie" />
                                    <h6 className="m-3">{movie.original_title}</h6>
                                </Link>
                            </div>
                        </div>
                    </div>})
                    :"something went wrong"}
                </div>
            </div>}


            

        </>
    )
}
