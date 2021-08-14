import React, { useState } from 'react';
import './App.css';
import Load from '../../images/load.gif';

export default () => {

  const [urlImage,setUrlImage] = useState('');
  const [showImage,setShowImage] = useState(false);
  const [showLoad,setShowLoad] = useState(false);
  const [pokemonName,setPokemonName] = useState('');

  const getPokemon = async () => {

    let url = 'https://pokeapi.co/api/v2/pokemon/';

    let searchInput = document.getElementById('searchInput').value;

    if(searchInput){

      setShowLoad(true);
      setShowImage(false);

      try {
        
        let request = await fetch(url+searchInput);

        let json = await request.json();

        setUrlImage(json.sprites.other.dream_world.front_default);
        setShowLoad(false);
        setShowImage(true);
        setPokemonName(firstWordUpper(json.name));

      } catch (error) {

        setShowLoad(false);
        setUrlImage('');
        setShowImage(false);
        setPokemonName('Nenhum pokemon encontrado');

      }
    
    }else{
      return;
    }

    function firstWordUpper(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  }

  return(
    <div className="App">
    
      <body>
        <div className="pokedexContainer">
          <header>
            <div className="blueBall"><div className="whiteBallIntoBue"></div></div>
            <div className="RedBall ball"><div className="whiteBall"></div></div>
            <div className="yellowBall ball"><div className="whiteBall"></div></div>
            <div className="greenBall ball"><div className="whiteBall"></div></div>
          </header>
          <section>
            <div id="display" className="display">
              {
                showImage && (
                  <img src={urlImage} width="150" height="150" alt="pokemon" />
                )
              }

              {
                showLoad && (
                  <img src={Load} alt="load" width="200"/>
                )
              }
            </div>
          </section>
          <footer>
            <div className="footerButtonsArea">
              <input id="searchInput" className="searchInput" type="search" name="pokemon" placeholder="Ex: charmander ou 4..."/>
              <div onClick={getPokemon} id="searchBtn" className="searchBtn"><div className="whiteBallSearchBtn"></div></div>
            </div>
            <h3>{pokemonName}</h3>
          </footer>
        </div>
        <div className="myName"><h4>Leonardo Pellegrino</h4></div>
      </body>

    </div>
    
  );
}
