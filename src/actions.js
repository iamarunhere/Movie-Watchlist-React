import axios from "axios";

const BASE_URL = "https://movie-watchlist-react.onrender.com/movies";

export const fetchMovies = () => ({
  type: "FETCH_MOVIES",
  payload: axios.get(BASE_URL).then((response) => response.data),
});

export const fetchMovieById = (movieId) => ({
  type: "FETCH_MOVIE_BY_ID",
  payload: axios
    .get(`${BASE_URL}/${movieId}`)
    .then((response) => response.data),
});

export const addMovie = (movie) => ({
  type: "ADD_MOVIE",
  payload: axios.post(BASE_URL, movie).then((response) => response.data),
});

export const editMovie = (movie) => ({
  type: "EDIT_MOVIE",
  payload: axios
    .put(`${BASE_URL}/${movie.id}`, movie)
    .then((response) => response.data),
});

export const deleteMovie = (movieId) => ({
  type: "DELETE_MOVIE",
  payload: axios.delete(`${BASE_URL}/${movieId}`).then(() => movieId),
});

export const toggleWatchStatus = (movieId, watched) => ({
  type: "TOGGLE_WATCH_STATUS",
  payload: axios
    .patch(`${BASE_URL}/${movieId}`, { watched })
    .then((response) => response.data),
});

export const rateMovie = (movieId, rating) => ({
  type: "RATE_MOVIE",
  payload: axios
    .patch(`${BASE_URL}/${movieId}`, { rating })
    .then((response) => response.data),
});

export const reviewMovie = (movieId, review) => ({
  type: "REVIEW_MOVIE",
  payload: axios
    .patch(`${BASE_URL}/${movieId}`, { review })
    .then((response) => response.data),
});
