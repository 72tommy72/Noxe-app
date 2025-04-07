import './App.css';
// import Home from './Components/Home/Home.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Movies from './Components/Movies/Movies.jsx';
import Tvs from './Components/Tvs/Tvs.jsx';
import MovieDetailes from './Components/MovieDetails/MovieDetails.jsx';
import {jwtDecode} from 'jwt-decode'
import { lazy, useEffect, useState } from 'react';
import TvDetails from './Components/TvDetails/TvDetails.jsx';
import { ApiContextProvider } from './Context/ApiContext.js';
import { store } from './Redux/Store.js';
import { Provider } from 'react-redux';
const Home = lazy(()=> import('./Components/Home/Home.jsx'))
function App() {
    
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate()
    function getToken() {
        const userToken = localStorage.getItem('token');
        const userDataDecoded = jwtDecode(userToken)
        setLoggedInUser(userDataDecoded)
    }
    function logout(){
        localStorage.removeItem('token')
        setLoggedInUser(null)
        navigate("/login")

    }
    function ifUserLoggedIn(){
        if (localStorage.getItem('token') !== null) {
            getToken()
        }
    }
    useEffect(() => {
        ifUserLoggedIn()
        // navigate('/login')
    }
    ,[])
    
    function ProtectedRoute(props){
        if (loggedInUser !== null) {
            return<>
                {props.children}
            </>
        }else{
            return <>
            <Navigate decoded={getToken} message='Please Login First'/>
            <div className="container vh-100 d-flex justify-content-center align-items-center "> 
                <h1>Please Go Home or Login First</h1>

            </div>
            {navigate('/login')}
            </>
        }
    }
    return <>


        {/* <ApiContextProvider> */}
        <Navbar logout={logout}  userLoggedIn={loggedInUser}/>
            <Routes>
                    <Route path="login" element={<Login decoded={getToken}/>} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<><div className='vh-100 d-flex justify-content-center align-items-center  '><h1> 4 0 4</h1></div> </>} />
                    <Route path="" element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="moviedetails" element={<MovieDetailes />} >
                        <Route path=":id" element={<MovieDetailes />} />
                    </Route>
                    <Route path="tvs" element={<Tvs />} />
                    <Route path="tvdetails" element={<TvDetails />} >
                        <Route path=":id" element={<TvDetails />} />
                    </Route>
                </Routes>
        {/* </ApiContextProvider>  */}
        {/* <Navbar logout={logout}  userLoggedIn={loggedInUser}/> */}
        {/* <ApiContextProvider> */}
            {/* <Routes>
                <Route path="login" element={<Login decoded={getToken}/>} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<><div className='vh-100 d-flex justify-content-center align-items-center  '><h1> 4 0 4</h1></div> </>} />
                <Route path="" element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="movies" element={<ProtectedRoute><Movies /></ProtectedRoute>} />
                <Route path="moviedetails" element={<ProtectedRoute><MovieDetailes /></ProtectedRoute>} >
                    <Route path=":id" element={<ProtectedRoute><MovieDetailes /></ProtectedRoute>} />
                </Route>
                <Route path="tvs" element={<ProtectedRoute><Tvs /></ProtectedRoute>} />
                <Route path="tvdetails" element={<TvDetails />} >
                        <Route path=":id" element={<TvDetails />} />
                </Route>
            </Routes> */}
        {/* </ApiContextProvider> */}
    </> 
}

export default App;