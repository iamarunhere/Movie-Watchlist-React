import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieById, editMovie } from "../../actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditMovie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const movie = useSelector((state) =>
    state.movies.movies.find((movie) => movie.id === parseInt(id))
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setReleaseYear(movie.releaseYear);
      setGenre(movie.genre);
    }
  }, [movie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const updatedMovie = {
      id: parseInt(id),
      title,
      description,
      releaseYear,
      genre,
    };

    try {
      await dispatch(editMovie(updatedMovie));
      toast.success("Movie updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update movie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter Movie Title"
            size={60}
          />
        </div>
        <div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Movie Description"
            size={60}
          ></input>
        </div>
        <div>
          <input
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            placeholder="Released Year"
            size={60}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter Movie Genre"
            size={60}
          />
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
