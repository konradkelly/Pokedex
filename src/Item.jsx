import { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

function Item() {
    const [pokemonId, setPokemonId] = useState(1);
    const [pokemon, setPokemon] = useState(null);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState('');

    useEffect(() => {
        let isCancelled = false;

        async function fetchPokemon() {
            try {
                setStatus('loading');
                setError('');

                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();
                
                if (!isCancelled) {
                setPokemon(data);
                setStatus('success');
                console.log('Fetched data:', data);
                }    
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error occurred');
                setStatus('error');
            }
        }

    fetchPokemon();

        return () => {
            isCancelled = true;
        };
    }, [pokemonId]);

    return (
        <main>
            <div className='Item-container'>
                <div className='Item-image'>

                {status === 'success' && pokemon && (
                    <img
                     src={pokemon.sprites.front_default} 
                     alt={pokemon.name} 
                    />
                )}
                </div> 
                
                <div className='Item-details'>
                    <button onClick={() => setPokemonId((id) => id + 1)}>Next Pokemon</button>

                    {status == 'loading' && <p>Loading...</p>}
                    {status == 'error' && <p>Error: {error}</p>}
                    {status == 'success' && pokemon && (
                    <>
                        <p>#{pokemon.id} {pokemon.name}</p>        
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