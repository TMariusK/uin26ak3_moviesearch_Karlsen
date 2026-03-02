import { useEffect, useState } from 'react'
import History from '../components/History'
export default function Home(){

    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false)

    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(() => {
        localStorage.setItem("search", JSON.stringify(history))
    },[history])

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

    const handleSubmit = (e) =>{
        e.preventDefault()
        e.target.reset()

        setHistory((prev) => [...prev, search])
    }

    console.log(history)

    return (
        <main>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film
                    <input type="search" placeholder='Batman' onChange={handleChange} onFocus={()=> setFocused(true)} /*onBlur={()=> setFocused(false)}*/ />
                </label>
                {focused ? <History history={history} setSearch={setSearch}/> : null}
                <button onClick={getMovies}>Søk</button>
            </form>
        </main>
    )
}