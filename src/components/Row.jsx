import React, {useEffect, useState} from 'react';
import axios from '../axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";


const baseURL = 'https://image.tmdb.org/t/p/original';

function Row(props) {
    const [movies, setMovies] = useState([]);
    const [trailer, setTrailer] = useState("");
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(props.fetchUrl);
            console.log(request)
            setMovies(request.data.results);
        }

        fetchData();
    }, [props.fetchUrl])

    const opts = {
        height: "390px",
        width: "100%",
        playerVars: {
            autoplay: 1
        }

    }

    function handleClick(movie) {
        if (trailer) {
            setTrailer("");
        } else {
            movieTrailer(movie?.title || "").then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailer(urlParams.get("v"));
            })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <div className="row">
            <h2>{props.title}</h2>
            <div className="row_posters">
                {movies.map(movie => (
                    <img key={movie.id} onClick={() => {
                        handleClick(movie)
                    }} className={`row_poster ${props.isLargeRow && `large_row_poster`}`}
                         src={`${baseURL}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                         alt={movie.name}/>
                ))}
            </div>
            {trailer && <YouTube videoId={trailer} opts={opts}/>}

        </div>
    );
}

export default Row;
