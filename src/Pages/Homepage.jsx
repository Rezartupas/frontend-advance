import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../services/api/api';
import { setApiData, setLoading, setError } from '../store/redux/datareducer';

const Homepage = () => {
  const dispatch = useDispatch();
  const { data: movies, loading, error } = useSelector(state => state.data);

// Fetch data from API
useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Current movies state:', JSON.stringify(movies, null, 2));
        console.log('Fetching movies...');
        dispatch(setLoading(true));
        const response = await api.getMovies();
        console.log('Movies fetched:', JSON.stringify(response, null, 2));
        if (!response || response.length === 0) {
          throw new Error('No movies data received');
        }
        dispatch(setApiData(response));
      } catch (err) {
        console.error('Error fetching movies:', err);
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!movies || movies.length === 0) {
      console.log('No movies in store, fetching...');
      fetchData();
    } else {
      console.log('Movies already in store:', JSON.stringify(movies, null, 2));
    }
  }, [dispatch, movies]); // Add movies dependency to track changes

  if (loading) {
    return <div className="text-center text-white p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-white p-4">Error: {error}</div>;
  }

// Carousel settings
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



  return (
    <div className="bg-zinc-950 text-white">
      {/* Navigation Bar */}
      <Header></Header>

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-[88vh]" style={{ backgroundImage: `url('../src/assets/das.png')` }}>
        <div className="absolute bottom-12 left-24 w-1/2 text-left">
          <h1 className="text-white text-4xl font-bold mb-4">Duty After School</h1>
          <p className="text-white text-lg mb-6">
          Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
            >
              Mulai
            </a>
            <a href="#" className="border border-gray-300 py-2 px-4 rounded-lg hover:underline bg-slate-800">
              ⨀ Lihat selengkapnya
            </a>
            <a href="#" className='flex items-center'>18+</a>
          </div>      
          </div>
          <div className="absolute right-24 bottom-12"><img src="../src/assets/Frame 65.png" alt="Hero Image" /></div>  
      </section>

      {/* Section Melanjutkan Tonton Film */}
      <main className="my-20 px-10" id="Film">
  <h1 className="text-3xl mb-8">Melanjutkan Tonton Film</h1>
  <div className="relative">
    <span className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer">
      <img src="../src/assets/arrowleft.png" width="44" alt="Left Arrow" />
    </span>
    <span className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer">
      <img src="../src/assets/arrowright.png" width="44" alt="Right Arrow" />
    </span>
    <div className="flex gap-8 justify-center overflow-x-auto">
      {[
        { title: "Don't Look Up", rating: 4.2, image: "../src/assets/component.png" },
        { title: "All of Us Are Dead", rating: 3.2, image: "../src/assets/component2.png" },
        { title: "Bluelock", rating: 4.5, image: "../src/assets/component1.png" },
        { title: "A Man Called Otto", rating: 4.7, image: "../src/assets/component3.png" },
      ].map((movie, index) => (
        <div
          key={index}
          className="relative w-80 h-40 bg-cover bg-no-repeat rounded-lg p-4 flex justify-between items-end group overflow-hidden"
          style={{ backgroundImage: `url(${movie.image})` }}
        >
          {/* Movie Info */}
          <div className="flex justify-between w-full">
            <p className="text-white font-semibold">{movie.title}</p>
            <p className="flex items-center gap-1 text-white">
              <img src="../src/assets/star.png" width="12" alt="Star" />
              {movie.rating}/5
            </p>
          </div>
          {/* Hover Button */}
          <button
            className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-60 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            ▶ Lanjutkan Menonton
          </button>
        </div>
      ))}
    </div>
  </div>
</main>


{/* Top Rating Hari Ini */}
      <main className="my-20 px-10" id="Series">
        <h1 className="text-3xl mb-8">Top Rating Film dan Series Hari Ini</h1>
        <Slider {...carouselSettings}>
          {movies.map((movie) => (
            <div key={movie.id} className="p-2 relative group">
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
                <button className="mb-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600">
                  Tambahkan ke Daftar Saya
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                  ▶ Mulai
                </button>
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
              <div className="hidden w-full h-full bg-zinc-700 rounded flex items-center justify-center text-center p-4">
                No image available
              </div>
              <div className="mt-2 text-center">
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-300">{movie.category}</p>
              </div>
            </div>
          ))}
        </Slider>
      </main>

      {/* Film Trending */}
      <main className="my-20 px-10" id="Trending">
        <h1 className="text-3xl mb-8">Film Trending</h1>
        <Slider {...carouselSettings}>
          {movies.map((movie) => (
            <div key={movie.id} className="p-2 relative group">
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
                <button className="mb-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600">
                  Tambahkan ke Daftar Saya
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                  ▶ Mulai
                </button>
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
              <div className="hidden w-full h-full bg-zinc-700 rounded flex items-center justify-center text-center p-4">
                No image available
              </div>
              <div className="mt-2 text-center">
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-300">{movie.category}</p>
              </div>
            </div>
          ))}
        </Slider>
      </main>

      {/* Rilis Baru */}
      <main className="my-20 px-10" id="Baru">
        <h1 className="text-3xl mb-8">Rilis Baru</h1>
        <Slider {...carouselSettings}>
          {movies.map((movie) => (
            <div key={movie.id} className="p-2 relative group">
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
                <button className="mb-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600">
                  Tambahkan ke Daftar Saya
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                  ▶ Mulai
                </button>
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
              <div className="hidden w-full h-full bg-zinc-700 rounded flex items-center justify-center text-center p-4">
                No image available
              </div>
              <div className="mt-2 text-center">
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-300">{movie.category}</p>
              </div>
            </div>
          ))}
        </Slider>
      </main>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
