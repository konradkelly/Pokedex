import { useState, useEffect } from 'react';

function getBaseStat(pokemon, statName) {
    return pokemon?.stats?.find((s) => s.stat.name === statName)?.base_stat ?? 'N/A';
}

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
        <section className="Item-container">
            <div className="Item-controls">
                <label className="Item-input-label">Pokemon ID
                    <input
                        className="Item-input"
                        type="number"
                        min="1"
                        onChange={(event) => setPokemonId(Math.max(1, Number(event.target.value)))}
                        value={pokemonId}
                    />
                </label>
            </div>

            <article className="Item-card">
                <div className='Item-image'>

                {status === 'success' && pokemon && (
                    <img
                     src={pokemon.sprites.front_default} 
                     alt={pokemon.name} 
                    />
                )}
                </div> 
                
                <div className='Item-details'>
                    {status === 'loading' && <p className="Item-state">Loading...</p>}
                    {status === 'error' && <p className="Item-state Item-state-error">Error: {error}</p>}
                    {status === 'success' && pokemon && (
                    <>
                        <p className="Item-title">#{pokemon.id} {pokemon.name}</p>
                        <div className="Item-row"><span className="Item-row-label">HP:</span> <span className="Item-row-value">{getBaseStat(pokemon, 'hp')}</span></div>
                        <div className="Item-row"><span className="Item-row-label">Attack:</span> <span className="Item-row-value">{getBaseStat(pokemon, 'attack')}</span></div>
                        <div className="Item-row"><span className="Item-row-label">Defense:</span> <span className="Item-row-value">{getBaseStat(pokemon, 'defense')}</span></div>
                        <div className="Item-row">
                            <span className="Item-row-label">Abilities:</span>
                            <span className="Item-row-value Item-abilities-list">
                                {pokemon.abilities.map((a, key) => (
                                    <span key={key} className="Item-ability">{a.ability.name}{key < pokemon.abilities.length - 1 ? ', ' : ''}</span>
                                ))}
                            </span>
                        </div>
                    </>
                )}
            </div>
            </article>
            <button className="Item-button" onClick={() => setPokemonId((id) => id + 1)}>Next Pokemon</button>
        </section>
    );
}

export default Item;