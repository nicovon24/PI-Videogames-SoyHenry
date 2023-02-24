import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Loader from "./components/Loader/Loader.jsx"
import Home from "./components/Home/Home.jsx";
import Games from "./components/Games/Games/Games.jsx"
import Details from './components/Games/Details/Details.jsx';
import About from "./components/About/About.jsx"
import CreateGame from './components/CreateGame/CreateGame.jsx';
import Favorites from './components/Favorites/Favorites';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGames, getCurrentPages, getFavorites, getInitialGames, getPlatformsGenres } from './redux/actions.js';

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllGames()) //getting the 100 games and storing in an array
    dispatch(getInitialGames())
    dispatch(getPlatformsGenres()) //getting the platf and genres for the select options
    dispatch(getFavorites())
  }, [dispatch])

  const {allGames, darkmode} = useSelector(state=>state)

  useEffect(()=>{
    dispatch(getCurrentPages(allGames))
  }, [dispatch, allGames])

  return (
      <div className={`${darkmode ? "dark" : ""}`}>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/videogames/" element={<Games/>}></Route>
            <Route exact path="/videogames/:id" element={<Details/>}></Route>
            <Route exact path="/create" element={<CreateGame/>}></Route>
            <Route exact path="/about" element={<About/>}></Route>
            <Route exact path="/favorites" element={<Favorites/>}></Route>
          </Routes>
      </div>
  );
}

export default App;
