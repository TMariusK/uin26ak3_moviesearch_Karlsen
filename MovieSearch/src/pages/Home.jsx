import { useEffect, useState } from 'react'
import History from '../components/History'
import { Link } from 'react-router-dom'
import '../style/stylesheet.css'

export default function Home(){

    const [search, setSearch] = useState("")
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false)

    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

    // State for filmer
    const [movies, setMovies] = useState([])

    // baseUrl inneholder kun apikey
    const apiKey = import.meta.env.VITE_APP_API_KEY
    const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}`

    useEffect(() => {
        localStorage.setItem("search", JSON.stringify(history))
    },[history])


    // Henter James Bond filmer når komponenten laster
    useEffect(() => {

        const hentBondFilmer = async () => {
            try{

                //Siden APIet kun returnerer 10 resultater per fetch, så jeg fetcher neste page og så filtrerer jeg resultatene slik at den kun viser filmer
                //Her sammarbeidet jeg med Tim Emil Malmo for å finne ut hvordan vi fikk hentet fler enn 10 filmer og fjernet andre resultater enn filmer
                const responsepage1 = await fetch(`${baseUrl}&s=James Bond&page=1`)
                const data = await responsepage1.json()

                const responsepage2 = await fetch(`${baseUrl}&s=James Bond&page=2`)
                const data2 = await responsepage2.json()

                //Funksjon for å filtrere ut kun filmer fra søket, filtrerer i både response page1 og page2
                const filterEtterFilm = [...data.Search, ...data2.Search].filter(movie => movie.Type === "movie")

                setMovies(filterEtterFilm)
            }
            catch(error){
                console.error(error)
            }
        }

        hentBondFilmer()

    }, [])

    //Her legger jeg til en query, altså søkeordet brukeren skriver. 
    const getMovies = async(query)=>{
        try
        {
            //Siden APIet kun returnerer 10 resultater per fetch, så jeg fetcher neste page og så filtrerer jeg resultatene slik at den kun viser filmer
            //Her sammarbeidet jeg med Tim Emil Malmo for å finne ut hvordan vi fikk hentet fler enn 10 filmer og fjernet andre resultater enn filmer
            const responsepage1 = await fetch(`${baseUrl}&s=${query}&page=1`)
            const data = await responsepage1.json()

            const responsepage2 = await fetch(`${baseUrl}&s=${query}&page=2`)
            const data2 = await responsepage2.json()

            //Samme funksjonen for å filtrere ut kun filmer fra søket
            const filterEtterFilm = [...data.Search, ...data2.Search].filter(movie => movie.Type === "movie")

            setMovies(filterEtterFilm)
        }
        catch(error){
            console.error(error)
        }
    }


    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    //Kommentert ut siden jeg har endret løsning
    //Her endrer jeg på hvordan vi la opp submit, slik at den utnytter submit på formen
    /*const handleSubmit = (e) =>{
        e.preventDefault()

        if(!search) return
        setHistory((prev) => [...prev, search])
        getMovies(search)

        e.target.reset()
    }*/

    //Kommentert ut handleSubmit siden jeg bruker en useEffect for å hente filmer fortløpende istedenfor
    useEffect(() => {
        if(search.length > 2) {
            getMovies(search)
        }
    },[search])


    return (
        <main>

            <h1>Forside</h1>

            {/*<form onSubmit={handleSubmit}>*/}
            <form >

                <label>
                    Søk etter film
                    <input
                        type="search"
                        placeholder='Batman'
                        onChange={handleChange}
                        onFocus={()=> setFocused(true)}
                    />
                </label>

                {focused ? <History history={history} setSearch={setSearch}/> : null}

                {/*Kommentert ut siden jeg har endret løsning, og ikke lenger trenger en submit knapp*/}
                {/*Endret button til en submit type for å bruke onSubmit funksjonen*/}
                {/*<button type="submit">Søk</button>*/}

            </form>



            {/*Her rendrer jeg filmene i en link, slik at man kan gå inn på de*/}
            <section>

                {movies.map((movie) => (

                    <Link key={movie.imdbID} to={`/${movie.imdbID}`}>

                        <h2>{movie?.Title}</h2>
                        <p>{movie?.Year}</p>
                        <img src={movie?.Poster} alt={movie?.Title} />

                    </Link>

                ))}

            </section>
            <footer>
                <p>Marius Karlsen sin film søker</p>
            </footer>

        </main>
    )
}