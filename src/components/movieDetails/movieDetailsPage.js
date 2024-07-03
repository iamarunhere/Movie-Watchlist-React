import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchMovieById,
  deleteMovie,
  toggleWatchStatus,
  rateMovie,
  reviewMovie,
} from "../../actions";
import StarRating from "../starRating/starRating";
import "./movieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [localReview, setLocalReview] = useState("");
  const [isEditingReview, setIsEditingReview] = useState(false);

  const movie = useSelector((state) =>
    state.movies.movies.find((movie) => movie.id === parseInt(id))
  );
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMovieById(id));
    } else {
      setLocalReview(movie.review);
    }
  }, [dispatch, id, movie]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) {
    console.log(`Movie not found for id: ${id}`);
    return <div>Movie not found</div>;
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );
    if (confirmDelete) {
      dispatch(deleteMovie(movie.id));
      navigate("/");
    }
  };

  const handleToggleWatchStatus = () => {
    dispatch(toggleWatchStatus(movie.id, !movie.watched));
  };

  const handleRatingChange = (newRating) => {
    dispatch(rateMovie(movie.id, newRating));
  };

  const handleReviewChange = (e) => {
    setLocalReview(e.target.value);
  };

  const handleSaveReview = () => {
    dispatch(reviewMovie(movie.id, localReview));
    setIsEditingReview(false);
  };

  const handleCancelReview = () => {
    setLocalReview(movie.review);
    setIsEditingReview(false);
  };

  return (
    <div className="moviedetails">
      <h1>{movie.title}</h1>
      <p>
        <strong>Description:</strong> {movie.description}
      </p>
      <p>
        <strong>Release Year:</strong> {movie.releaseYear}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Watch Status:</strong> {movie.watched ? "Watched" : "Unwatched"}
      </p>
      <button onClick={handleToggleWatchStatus}>
        {movie.watched ? "Unwatch" : "Watch"}
      </button>
      <button onClick={() => navigate(`/editmovie/${movie.id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      <div>
        <h3>Rating</h3>
        <StarRating rating={movie.rating} onRatingChange={handleRatingChange} />
      </div>
      <div>
        <h3>Review</h3>
        {isEditingReview ? (
          <>
            <textarea
              value={localReview}
              onChange={handleReviewChange}
            ></textarea>
            <button onClick={handleSaveReview}>Save</button>
            <button onClick={handleCancelReview}>Cancel</button>
          </>
        ) : (
          <>
            {movie.review ? (
              <>
                <p>{movie.review}</p>
                <button onClick={() => setIsEditingReview(true)}>
                  Edit Review
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditingReview(true)}>
                Add Review
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
