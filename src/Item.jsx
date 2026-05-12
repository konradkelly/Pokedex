import { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';

function Item() {

    const [pokemon, setPokemon] = useState(null);

    // const currentStatus = {
    //     loading: 'loading',
    //     success: 'success',
    //     error: 'error',
    // };

    // const [status, setStatus] = useState(currentStatus.loading);
    // const [error, setError] = useState('');
    

    // useEffect(() => {
    //     async function fetchPokemon() {
    //         try {
    //             setStatus(status.loading);
    //             const response = await fetch('https://pokeapi.co/api/v2/pokemon-species/aegislash');
    //             if (!response.ok) {
    //                 throw new Error(`Failed to fetch pokemon data: ${response.status}`);
    //             }
    //             const data = await response.json();
    //             setPokemon(data);
    //             console.log(data.aegislash.abilities);
    //             setStatus(status.success);
    //         } catch (err) {
    //             setError(`${err.message} An error occured while fetching pokemon data}`)
    //             setStatus(status.error);
    //         }
    //     }

    //     fetchPokemon();
    // }, []);

    //NEW CODE
    useEffect(() => {
        // fetch(`https://pokeapi.co/api/v2/pokemon-species/aegislash`)
        // .then(res => res.json())
        // // .then(data => console.log(data.base_happiness))
        // .then(data => setPokemon(data))
        async function fetchPokemon() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
                const data = await response.json();
                setPokemon(data);
                console.log(data.abilities)

            } catch (err) {
                console.log(`${err.message} An error occured while fetching pokemon data`)
            }
        }
        fetchPokemon();

    }, []);

    return (
        <main>
            <div className="Item-container">
                <div className="Item-image">
                    {/* <img src="" alt="pokemon-image" /> */}
                </div>
                <p>{pokemon ? pokemon.name : 'Loading...'}</p>
            </div>
        </main>
    );
}

export default Item;
