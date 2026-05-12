import { useState, useEffect } from 'react';

function Item() {
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon-species/aegislash')
            .then((res) => res.json())
            .then((data) => setPokemon(data));
    }, []);

    return (
        <main>
            <div className="Item-container">
                <div className="Item-image">
                    <img src="" alt="pokemon-image" />
                </div>
                <p>{pokemon ? pokemon.name : 'Loading...'}</p>
            </div>
        </main>
    );
}

export default Item;
