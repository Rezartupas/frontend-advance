import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { api } from '../services/api/api';
import { 
  setApiData, 
  setLoading, 
  setError, 
  deleteMovie,
  addToMyList as addToMyListAction,
  removeFromMyList as removeFromMyListAction
} from '../store/redux/datareducer';

const MAX_LIST_SIZE = 10;

const List = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: movies, myList, loading, error } = useSelector(state => state.data);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await api.getMovies(); // Changed from getUsers to getMovies
        dispatch(setApiData(response));
      } catch (err) {
        dispatch(setError(err.message));
      }
    };
    fetchData();
  }, [dispatch]);

// Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const addToMyList = (movie) => {
    if (myList.length >= MAX_LIST_SIZE) {
      showNotification(`Maksimal ${MAX_LIST_SIZE} film dalam daftar`, 'error');
      return;
    }
    
    if (!myList.find((item) => item.id === movie.id)) {
      dispatch(addToMyListAction(movie));
      showNotification('Film berhasil ditambahkan ke Daftar Saya', 'success');
    } else {
      showNotification('Film sudah ada di daftar!', 'error');
    }
  };

  const removeFromMyList = (movieId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus film ini dari Daftar Saya?')) {
      dispatch(removeFromMyListAction(movieId));
      showNotification('Film berhasil dihapus dari Daftar Saya', 'success');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await api.deleteMovie(id);
        dispatch(deleteMovie(id));
      } catch (err) {
        dispatch(setError(err.message));
      }
    }
  };

  // Pengaturan carousel
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div className="text-center text-white p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-white p-4">Error: {error}</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="text-center text-white p-4">No movies available</div>;
  }

return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", backgroundColor: "#0d0f1b", color: "white" }}>
      {/* Notification */}
      {notification.show && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-opacity duration-300 ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {notification.message}
        </div>
      )}
      
<div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Daftar Film</h1>
        {!isAdmin && (
          <div className="flex items-center gap-4">
            <button className="text-white text-lg hidden lg:block hover:text-gray-300">
              Lihat Semua
            </button>
          </div>
        )}
      </div>

      <Slider {...carouselSettings}>
        {movies.map((movie) => (
          <div key={movie.id} className="p-2 relative group">
            <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
              {isAdmin ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/admin?edit=${movie.id}`)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
) : (
                <button
                  onClick={() => addToMyList(movie)}
                  disabled={myList.length >= MAX_LIST_SIZE}
                  className={`mb-2 px-4 py-2 text-white rounded-lg transition-all duration-300 flex items-center gap-2
                    ${myList.length >= MAX_LIST_SIZE 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'bg-red-800 hover:bg-red-600 hover:scale-105'
                    }`}
                >
<span className="text-xl font-bold">+</span>
                  <span>
                    {myList.length >= MAX_LIST_SIZE 
                      ? 'Daftar Penuh' 
                      : 'Tambahkan ke Daftar Saya'
                    }
                  </span>
                </button>
              )}
            </div>
<img 
              src={movie.image} 
              alt={movie.title} 
              className="w-full h-[400px] object-cover rounded aspect-[2/3]"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div 
              className="hidden w-full h-full bg-zinc-700 rounded flex items-center justify-center text-center p-4"
            >
              No image available
            </div>
            <div className="mt-2 text-center">
              <h3 className="font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-300">{movie.category}</p>
            </div>
          </div>
        ))}
      </Slider>

      {!isAdmin && (
        <>
          <div className="flex justify-between">
          <h2 className="text-4xl font-bold mt-8 mb-4">Daftar Saya</h2>
          <span className="mt-8 mb-4">
              {myList.length}/{MAX_LIST_SIZE} Film
            </span>
          </div>
          {myList.length === 0 ? (
            <p className="text-center">Tidak ada film dalam daftar.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {myList.map((movie) => (
                <div key={movie.id} className="flex flex-col items-center justify-center">
                  <div className="relative w-full h-full">
<img 
                      src={movie.image} 
                      alt={movie.title} 
                      className="w-full h-[400px] object-cover rounded aspect-[2/3]"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div 
                      className="hidden w-full h-full bg-zinc-700 rounded flex items-center justify-center text-center p-4"
                    >
                      No image available
                    </div>
                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => removeFromMyList(movie.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                      >
                        Hapus
                      </button>
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className="font-semibold">{movie.title}</h3>
                      <p className="text-sm text-gray-300">{movie.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

List.propTypes = {
  isAdmin: PropTypes.bool
};

export default List;
