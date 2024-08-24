import React from 'react'
import css from './Navbar.module.css'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faSpotify,  faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
// import { faFacebook ,faTwitter } from "@fortawesome/free-solid-svg-icons";
export default function Navbar({userLoggedIn ,logout}) {
    return <>
        <nav className="navbar navbar-expand-lg m-auto navbar-dark my-3">
            <Link className="navbar-brand ms-5  lead" to={'home'}>Noxe</Link>
            
            <div className="collapse navbar-collapse me-5" id="navbarSupportedContent">
                <div className="row  w-100">
                {/* <ul className="navbar-nav ms-4">
                    <li className="nav-item active lead">
                        <Link className="nav-link" to={'home'}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active lead">
                        <Link className="nav-link" to={'movies'}>Movies <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active lead">
                        <Link className="nav-link" to={'tvs'}>Tvs <span className="sr-only">(current)</span></Link>
                    </li>
                </ul> */}
                    <div className="col-sm-6">
                        <div className="right-links">
                            <ul className="navbar-nav ms-4">
                            <li className="nav-item active lead">
                        <NavLink className="nav-link" to={'home'}>Home <span className="sr-only">(current)</span></NavLink>
                    </li>
                                {userLoggedIn ? (
                                    <>
                                        <li className="nav-item active lead">
                                            <NavLink className="nav-link" to={'movies'}>Movies <span className="sr-only">(current)</span></NavLink>
                                        </li>
                                        <li className="nav-item active lead">
                                            <NavLink className="nav-link" to={'tvs'}>Tvs <span className="sr-only">(current)</span></NavLink>
                                        </li>
                                    </>
                                ) : (
                                    ""
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6">
                    <div className="left-links">
                <ul className="navbar-nav  ">
                    <div className="input-group ms-5">
                    <div id="search-autocomplete" className="form-outline" data-mdb-input-init>
                    <input placeholder='Search' type="search" id="form1" className="form-control " />
                        
                    </div>
                    </div>
                    <li className="nav-item fa-lg  ">
                    <NavLink  to='https://www.facebcook.com' target='_blank'>
                        <FontAwesomeIcon className={`${css.Facebook} mt-1 me-3 fa-fw`} icon={faFacebook} />
                    </NavLink>
                    </li>
                    <li className=" nav-item fa-lg white-anchor ">
                    <NavLink  to='https://www.x.com' target='_blank'>
                    <FontAwesomeIcon className={`${css.Twitter} mt-1 me-3 fa-fw`} icon={faXTwitter} />
                    </NavLink>
                    </li>
                    <li className="nav-item fa-lg ">
                        <NavLink to='https://www.spotify.com' target='_blank'>
                        <FontAwesomeIcon  className= {`${css.Spotify} mt-1 me-3 fa-fw`} icon={faSpotify} />
                        </NavLink>
                    </li>
                    <li className="nav-item fa-lg ">
                        <NavLink to='https://www.youtube.com' target='_blank'>
                        <FontAwesomeIcon className={`${css.Youtube} mt-1 me-3 fa-fw`}  icon={faYoutube} />
                        </NavLink>
                    </li>
                    {userLoggedIn?<li onClick={logout} className="nav-item fa-lg">
                    <NavLink className="nav-link m-1" to={'/home'}>Logout </NavLink>
                    </li>
                    :<>
                    <li className="nav-item fa-lg">
                    <NavLink className="nav-link m-1" to={'login'}>Login </NavLink>
                    </li>
                    <li className="nav-item fa-lg">
                    <NavLink className="nav-link m-1" to={'register'}>Register </NavLink>                    
                    </li>
                    </>
                    }
                </ul>
                </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
}
