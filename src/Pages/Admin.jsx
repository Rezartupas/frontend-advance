import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../services/api/api';
import { addMovie, updateMovie, deleteMovie, setApiData, setLoading, setError } from '../store/redux/datareducer';

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.data);
  const movies = useSelector(state => state.data.data);
const [editingMovie, setEditingMovie] = useState(null);
  const [message, setMessage] = useState('');
const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    image: '',
    rating: '',
    category: 'trending'
  });
useEffect(() => {
    const fetchMovies = async () => {
      try {
        dispatch(setLoading(true));
        const response = await api.getMovies();
        dispatch(setApiData(response));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };
    fetchMovies();
  }, [dispatch]);

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMovie) {
        const updatedMovie = await api.updateMovie(editingMovie.id, newMovie);
        dispatch(updateMovie(updatedMovie));
        setEditingMovie(null);
        setMessage('Movie updated successfully!');
      } else {
        const addedMovie = await api.addMovie(newMovie);
        dispatch(addMovie(addedMovie));
        setMessage('Movie added successfully!');
      }
      // Reset form
      setNewMovie({
        title: '',
        description: '',
        image: '',
        rating: '',
        category: 'trending'
      });
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

const handleEdit = (movie) => {
    setEditingMovie(movie);
    setNewMovie({
      title: movie.title,
      description: movie.description,
      image: movie.image, // Keep the existing image URL/base64
      rating: movie.rating,
      category: movie.category
    });
    setMessage('Editing movie: ' + movie.title + '. Upload a new image only if you want to change it.');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie? This action cannot be undone.')) {
      try {
        await api.deleteMovie(id);
        dispatch(deleteMovie(id));
        setMessage('Movie deleted successfully!');
        // Clear message after 3 seconds
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        dispatch(setError(err.message));
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-zinc-900 text-white p-8 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-zinc-900 text-white p-8 flex items-center justify-center">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8 justify-between" >
          <div className="flex items-center gap-4">
            <img src="./img/Logo.png" alt="Logo" className="w-36 h-20" />
            <button 
              onClick={() => navigate('/home')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Homepage
            </button>
          </div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        
{/* Message Display */}
        {message && (
          <div className="bg-green-600 text-white p-4 rounded-lg mb-4 transition-opacity duration-300">
            {message}
          </div>
        )}

        {/* Add New Movie Form */}
        <div className="bg-zinc-800 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Movie</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Movie Title</label>
              <input
                type="text"
                value={newMovie.title}
                onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
                className="w-full p-2 rounded bg-zinc-700"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                value={newMovie.description}
                onChange={(e) => setNewMovie({...newMovie, description: e.target.value})}
                className="w-full p-2 rounded bg-zinc-700"
                rows="4"
                required
              />
            </div>
            
<div>
              <label className="block mb-1">Movie Poster</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewMovie({...newMovie, image: reader.result});
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full p-2 rounded bg-zinc-700 text-white file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0 file:bg-blue-600 file:text-white
                hover:file:bg-blue-700"
                required={!editingMovie}
              />
              {newMovie.image && (
                <div className="mt-2">
                  <img
                    src={newMovie.image}
                    alt="Movie poster preview"
                    className="w-48 h-72 object-cover rounded"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div 
                    className="hidden w-48 h-72 bg-zinc-700 rounded flex items-center justify-center text-center p-4"
                  >
                    Invalid image file. Please select another image.
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <label className="block mb-1">Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={newMovie.rating}
                onChange={(e) => setNewMovie({...newMovie, rating: e.target.value})}
                className="w-full p-2 rounded bg-zinc-700"
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Category</label>
              <select
                value={newMovie.category}
                onChange={(e) => setNewMovie({...newMovie, category: e.target.value})}
                className="w-full p-2 rounded bg-zinc-700"
                required
              >
                <option value="trending">Trending</option>
                <option value="new">New Release</option>
                <option value="topRated">Top Rated</option>
              </select>
            </div>
            
<button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editingMovie ? 'Update Movie' : 'Add Movie'}
            </button>
          </form>
        </div>

{/* Movie List Management */}
        <div className="bg-zinc-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Manage Movies</h2>
<div className="space-y-4">
            {loading ? (
              <div className="text-center py-4">
                <p className="text-gray-400">Loading movies...</p>
              </div>
            ) : movies.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-400">No movies added yet. Use the form above to add your first movie.</p>
              </div>
            ) : movies.map((movie) => (
              <div key={movie.id} className="bg-zinc-700 p-4 rounded-lg flex items-center justify-between">
<div className="flex items-center space-x-4">
                  <div className="relative w-24 h-36">
                    <img 
                      src={movie.image} 
                      alt={movie.title} 
                      className="w-24 h-36 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="hidden w-24 h-36 bg-zinc-700 rounded absolute top-0 left-0 items-center justify-center text-center p-2 text-xs"
                    >
                      No image available
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-2">{movie.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-yellow-400">Rating: {movie.rating}</span>
                      <span className="text-blue-400">Category: {movie.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;