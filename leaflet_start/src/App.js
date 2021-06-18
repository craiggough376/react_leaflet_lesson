import './App.css';
import {useState, useEffect} from 'react';

function App() {

  const [munros, setMunros] = useState([])

  const getAllMunros = function(){
    fetch('https://munroapi.herokuapp.com/munros')
    .then(res => res.json())
    .then(munros => setMunros(munros))
}

  useEffect(() => {
    getAllMunros()
  }, [])


  return (
    <div className="App">

    </div>
  );
}

export default App;
