import { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

function Item() {

    const [pokemon, setPokemon] = useState(null);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState('');

        async function fetchPokemon() {
            try {
                setStatus('loading');
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
                const data = await response.json();
                setPokemon(data);
                setStatus('success');
                console.log('Fetched data:', data);
            } catch (err) {
                console.log(`${err.message} An error occured while fetching pokemon data`)
            }
        }

    return (
        <main>
            <div className="Item-container">
                <div className="Item-image">
                    <button onClick={fetchPokemon}>Fetch Pokemon</button>
                    {/* <img src="" alt="pokemon-image" /> */}
                {status == 'loading' && <p>Loading...</p>}
                {status == 'error' && <p>Error: {error}</p>}
                {status == 'success' && (
                    <>
                <p>{pokemon.name}</p>
                <ul>
                    {pokemon.abilities.map((a, key) => (
                        <li key={key}>{a.ability.name}</li>
                    ))}
                </ul> 
                </>                   
                )}
                </div>
            </div>
        </main>
    );
}

export default Item;
