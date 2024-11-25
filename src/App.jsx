function App() {


  return (
    <div className="bg-[#0d0f1b] min-h-screen flex items-center justify-center px-6">
      {/* Container */}
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        {/* Text Section */}
        <div className="text-white">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
            Movie Streaming Platform
          </p>
          <h1 className="text-5xl font-bold mb-6">Chill</h1>
          <p className="text-lg leading-relaxed">
            Chill adalah aplikasi berbasis web yang dirancang untuk memberi pengguna akses ke
            <em> library</em> film dan acara TV yang luas dari perangkat mereka. Chill menawarkan antarmuka yang ramah pengguna yang memungkinkan pengguna mencari film dan acara TV, dan mulai menonton secara instan.
            Chill menawarkan rekomendasi hasil personalisasi berdasarkan kebiasaan menonton pengguna, membantu pengguna menemukan film dan acara TV baru yang mungkin tidak mereka temukan sebelumnya. Selain itu, Chill juga menawarkan konten orisinal, termasuk film dan acara TV, yang hanya dapat ditemukan di aplikasi Chill, menjadikannya sumber yang unik dan berharga bagi pengguna.
          </p>
          <a href="/login" className="gap inline-block bg-indigo-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6">
            Mulai Sekarang
          </a>
        </div>

        {/* Image Section */}
        <div className="relative">
          <img
            src="../img/iphone.png" 
            alt="Phone Mockup"
            className="w-full h-auto transform shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

  

export default App
