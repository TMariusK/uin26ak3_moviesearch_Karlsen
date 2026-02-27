import { useState } from 'react'
export default function Home(){

    const [search, setSearch] = useState()
    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
    const apiKey = '555387ca'

const getMovies = async()=>{
    try
    {
        const response = await fetch(`${baseUrl}${apiKey}`)
        const data = await response.json()

        console.log(data)
    }
    catch(error){
        console.error(error)
    }
}

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <main>
            <h1>Forside</h1>
            <form>
                <label>
                    Søk etter film
                    <input type="search" placeholder='Batman' onChange={handleChange} />
                </label>
            </form>
            <button onClick={getMovies}>Søk</button>
        </main>
    )
}