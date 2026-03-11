import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../style/stylesheet.css'

export default function Movie() {
    const { movie } = useParams()

    // Lager en ny state for å enkelte filmer
    const [film, setFilm] = useState(null)

    //Henter baseUrl og ApiKey slik at vi kan bruke de for å hente filmene
    const apiKey = import.meta.env.VITE_APP_API_KEY
    const baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}`

    //Så lager vi en ny useEffect som henter filmen
    useEffect(() => {
        const hentFilm = async () => {
            try {
                const response = await fetch(`${baseUrl}&i=${movie}`)
                const data = await response.json()
                setFilm(data)
            } catch (error) {
                console.error(error)
            }
        }

        hentFilm()
    }, [movie])


    return (
    <main>
        {/*Vi setter det som rendres innenfor {film ?} siden vi får en error hvis vi ikke har data*/ }
        {film ? (
            <>
                <h1>{film.Title}</h1>
                <img src={film.Poster} alt={film.Title} />
                <p>{film.Year}</p>
                <p>{film.Plot}</p>
            </>
        ) : (
            <p>Laster film...</p>
        )}
        <footer>
        <p>Marius Karlsen sin film søker</p>
        </footer>
    </main>
    )

}