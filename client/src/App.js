import { Route, Routes } from 'react-router-dom';
// import Loader from "./components/Loader/Loader.jsx"
import Home from "./components/Home/Home.jsx";
import Games from "./components/Games/Games/Games.jsx"
import './App.css';
import Details from './components/Games/Details/Details.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllGames, getPlatformsGenres } from './redux/actions.js';

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPlatformsGenres()) //getting the platf and genres for the select options
    dispatch(getAllGames()) //getting the 100 games and storing in an array
  }, [dispatch])

  return (
      <div className="App">
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/videogames/" element={<Games/>}></Route>
            <Route exact path="/videogames/:id" element={<Details/>}></Route>
          </Routes>
      </div>
  );
}

export default App;
