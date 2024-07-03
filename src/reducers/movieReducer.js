const initialState = {
  movies: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOVIES_FULFILLED":
      return { ...state, movies: action.payload };

    case "FETCH_MOVIE_BY_ID_FULFILLED":
      const movieExists = state.movies.some(
        (movie) => movie.id === action.payload.id
      );
      return {
        ...state,
        movies: movieExists
          ? state.movies.map((movie) =>
              movie.id === action.payload.id ? action.payload : movie
            )
          : [...state.movies, action.payload],
      };

    case "FETCH_MOVIES_REJECTED":
    case "FETCH_MOVIE_BY_ID_REJECTED":
    case "ADD_MOVIE_REJECTED":
    case "EDIT_MOVIE_REJECTED":
    case "DELETE_MOVIE_REJECTED":
    case "TOGGLE_WATCH_STATUS_REJECTED":
    case "RATE_MOVIE_REJECTED":
    case "REVIEW_MOVIE_REJECTED":
      return { ...state, error: action.payload };

    case "ADD_MOVIE_FULFILLED":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };

    case "EDIT_MOVIE_FULFILLED":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
      };

    case "DELETE_MOVIE_FULFILLED":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
      };

    case "TOGGLE_WATCH_STATUS_FULFILLED":
    case "RATE_MOVIE_FULFILLED":
    case "REVIEW_MOVIE_FULFILLED":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
      };

    default:
      return state;
  }
};

export default moviesReducer;
