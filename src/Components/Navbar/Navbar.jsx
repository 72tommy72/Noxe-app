import React from 'react'
import css from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faSpotify,  faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
// import { faFacebook ,faTwitter } from "@fortawesome/free-solid-svg-icons";
export default function Navbar({userLoggedIn ,logout}) {
    return <>
        <nav className="navbar navbar-expand-lg m-auto navbar-dark my-3">
            <Link className="navbar-brand ms-5  lead" to={'home'}>Noxe</Link>
            
            <div className="collapse navbar-collapse me-5" id="navbarSupportedContent">
                
                <ul className="navbar-nav ms-4">
                    <li className="nav-item active lead">
                        <Link className="nav-link" to={'home'}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active lead">
                        <Link className="nav-link" to={'movies'}>Movies <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active lead">
                        <Link className="nav-link" to={'tvs'}>Tvs <span className="sr-only">(current)</span></Link>
                    </li>
                </ul>
                
                {/* {userLoggedIn
                ?<ul className="navbar-nav ms-4">
                    <li className="nav-item active lead">
                        <Link className="nav-link" to={'home'}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active lead">
                        <Link className="nav-link" to={'movies'}>Movies <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active lead">
                        <Link className="nav-link" to={'tvs'}>Tvs <span className="sr-only">(current)</span></Link>
                    </li>
                </ul>
                :""} */}
                
                <ul className="navbar-nav ms-auto  ">
                    <div className="input-group ">
                    <div id="search-autocomplete" className="form-outline d-flex" data-mdb-input-init>
                    <input placeholder='Search' type="search" id="form1" className="form-control" />
                        
                    </div>
                    </div>
                    <li className="nav-item fa-lg  ">
                    <Link  to='https://www.facebcook.com' target='_blank'>
                        <FontAwesomeIcon className={`${css.Facebook} mt-1 me-3 ms-4 fa-fw`} icon={faFacebook} />
                    </Link>
                    </li>
                    <li className=" nav-item fa-lg white-anchor ">
                    <Link  to='https://www.x.com' target='_blank'>
                    <FontAwesomeIcon className={`${css.Twitter} mt-1 me-3 fa-fw`} icon={faXTwitter} />
                    </Link>
                    </li>
                    <li className="nav-item fa-lg ">
                        <Link to='https://www.spotify.com' target='_blank'>
                        <FontAwesomeIcon  className= {`${css.Spotify} mt-1 me-3 fa-fw`} icon={faSpotify} />
                        </Link>
                    </li>
                    <li className="nav-item fa-lg ">
                        <Link to='https://www.youtube.com' target='_blank'>
                        <FontAwesomeIcon className={`${css.Youtube} mt-1 me-3 fa-fw`}  icon={faYoutube} />
                        </Link>
                    </li>
                    {userLoggedIn?<li onClick={logout} className="nav-item fa-lg">
                    <Link className="nav-link m-1" to={'/home'}>Logout </Link>
                    </li>
                    :<>
                    <li className="nav-item fa-lg">
                    <Link className="nav-link m-1" to={'login'}>Login </Link>
                    </li>
                    <li className="nav-item fa-lg">
                    <Link className="nav-link m-1" to={'register'}>Register </Link>                    
                    </li>
                    </>
                    }
                </ul>
            </div>
        </nav>
    </>
}
