import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, deleteMovie, toggleWatchStatus } from "../../actions";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Space, Switch } from "antd";
import StarRating from "../starRating/starRating";
import "react-toastify/dist/ReactToastify.css";
import "./homePage.css";

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleDelete = (movieId, movieTitle) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the movie "${movieTitle}"?`
    );
    if (confirmDelete) {
      dispatch(deleteMovie(movieId))
        .then(() => {
          toast.success("Movie deleted successfully!");
        })
        .catch((error) => {
          toast.error("Failed to delete movie.");
        });
    }
  };

  const handleToggleWatchStatus = (movieId, watched) => {
    dispatch(toggleWatchStatus(movieId, !watched));
  };

  return (
    <div>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h3>
              <Link
                to={`/movieDetails/${movie.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {movie.title}
              </Link>
            </h3>
            <ul className="movie-details">
              <li>Release Year : {movie.releaseYear}</li>
              <li>Genre : {movie.genre}</li>
              <li>
                <StarRating
                  className="homepage-starRating"
                  rating={movie.rating}
                />
              </li>

              <div
                className="edit-icon"
                onClick={() => navigate(`/editmovie/${movie.id}`)}
              >
                <FontAwesomeIcon icon={faPen} />
              </div>

              <div
                className="delete-icon"
                onClick={() => handleDelete(movie.id, movie.title)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
              <Space direction="horizontal">
                <label>Watched: </label>
                <Switch
                  className="togglebutton"
                  checked={movie.watched}
                  onChange={() =>
                    handleToggleWatchStatus(movie.id, movie.watched)
                  }
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                  style={{
                    backgroundColor: movie.watched ? " #6f113794" : "grey",
                  }}
                />
              </Space>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
