import React, {useState, useEffect} from 'react';
import axios from 'axios'


const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [links, setLinks] = useState({
    next: '',
    previous: '',
  })
  const [selectedUrl, setSelectedUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInitialPokemonData()
  }, [selectedUrl])


  console.log(pokemonList)

  const fetchInitialPokemonData = async () => {
    try{
      const responseData = await axios.get(selectedUrl)
      const pokeData = responseData.data
      setIsLoading(false);
      setLinks({
        ...links, 
        next: pokeData.next,
        previous: pokeData.previous
      })

      const fetchingData = async (callback , poke) => {
        const data = await fetchEachPokemonData(poke.url);
        return callback(data)
      }
      let arr = []
      pokeData.results.forEach((poke) => {
        const callback = result => {
          arr.push(result)
          setPokemonList([...arr])
        }
        fetchingData(callback, poke)
      })

      setPokemonList([...arr])


    } catch (err) {
      alert(err.message);
    }
  }
 

  const fetchEachPokemonData = async (api) => {
    const resData = await axios.get(api);
    return resData.data
  }

  return (
    <div>
      {pokemonList.length !== 0 && pokemonList.map(item => 
        <li>{item.name}</li>  
      )}

    </div>
  )
}

export default Pokemon;