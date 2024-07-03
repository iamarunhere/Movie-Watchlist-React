// addMovie.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../../actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./addMovie.css";

const AddMovie = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const newMovie = { title, description, releaseYear, genre };

    try {
      await dispatch(addMovie(newMovie));
      toast.success("Movie added successfully!");
      navigate("/");
      setTitle("");
      setDescription("");
      setReleaseYear("");
      setGenre("");
    } catch (error) {
      toast.error("Failed to add movie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add Movie</h2>
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

export default AddMovie;
