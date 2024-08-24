import React, { useContext, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { MyApiContext } from "../../Context/ApiContext";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingTvs } from "../../Redux/ApiSlices/tvsApiSlice";
export default function Tvs() {

        // const {tvApi} = useContext(MyApiContext)
        const dispatch = useDispatch()
        useEffect(() => {
            dispatch(getTrendingTvs())
        }, [dispatch]);

        const tvApi = useSelector((state) => state.tvsApi)

    return (
        <>
        {tvApi.length === 0 
            ?<div className="container- vh-100 d-flex justify-content-center align-items-center bg-secondary bg-opacity-25">
            <FontAwesomeIcon className="fa-5x fa-spin" icon={faSpinner } /></div>
            :<div className="container">
                <div className="row ">
                    <div className="col-md-4  position-relative d-flex align-items-center">
                        <div className="trending-tvs ">
                            <div className="upper"></div>
                            <h2>Trending  </h2>
                            <h2>Tvs to Watch now</h2>
                            <p className=" fa-1x my-3 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, aspernatur.
                            </p>
                            <div className="lower"></div>
                        </div>
                    </div>
                    {tvApi.length !== 0 
                    ?tvApi.map((tv, idx)=>{return <div key={idx} className="col-md-2">
                        <div className="tv">
                            <Link to={`/tvdetails/${tv.id}`} >
                                <img className="w-100" src={"https://images.tmdb.org/t/p/w500/"+tv.poster_path} alt="tv" />
                                <h6 className="m-3">{tv.original_name}</h6>
                            </Link>
                        </div>
                    </div>})
                    :"something went wrong"}
                </div>
                
            </div>}


            
        </>
    )
}
