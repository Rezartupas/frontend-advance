const Footer = () => {
  return (
      <div
          className="w-full p-[20px] mt-[28px] lg:mt-[80px] lg:px-[80px] lg:py-[60px] lg:flex lg:justify-between bg-primary text-white border-t-[1px] border-[#fff] border-opacity-[0.3]">
          <div className="block mb-[40px] lg:mb-0 lg:content-center">
              <img className="mb-[16px] lg:mb-[26px] lg:w-[163px]" src="./img/Logo.png" alt="" />
              <p className="text-[12px] lg:text-[16px]">@2024 Chill | Mohammad Reza Saputra</p>
          </div>
          <div className="block lg:flex">
              <div className="w-full flex justify-between mb-[8px] lg:mr-[180px] lg:block">
                  <h2 className="font-medium text-[16px] lg:mb-[16px]">Genre</h2>
                  <a href="#">
                      <img className="lg:hidden" src="./img/arrowRight.svg" alt="" />
                  </a>
                  <div className="hidden lg:flex lg:!gap-x-[28px]">
                      <div className="w-full h-full  lg:grid lg:!gap-y-[12px]">
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Aksi</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Anak-anak</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Anime</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Britania</a>
                      </div>
                      <div className="w-full h-full lg:grid lg:!gap-y-[12px]">
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Drama</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Fantasi Ilmiah & Fantasi</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Kejahatan</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">KDrama</a>
                      </div>
                      <div className="w-full h-full lg:grid lg:!gap-y-[12px]">
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Komedi</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Petualangan</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Perang</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Romantis</a>
                      </div>
                      <div className="w-full h-full lg:grid lg:!gap-y-[12px]">
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Sains
                              & Alam</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Thriller</a>
                      </div>
                  </div>
              </div>
              <div className="flex justify-between lg:block">
                  <h2 className="font-medium text-[16px] lg:mb-[16px]">Bantuan</h2>
                  <a href="#">
                      <img className="lg:hidden" src="./img/arrowRight.svg" alt="" />
                  </a>
                  <div className="hidden lg:flex lg:!gap-x-[28px]">
                      <div className="w-full h-full  lg:grid lg:!gap-y-[12px]">
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">FAQ</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Kontak Kami</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Privasi</a>
                          <a className="text-[16px] text-[#C1C2C4] lg:text-nowrap hover:text-white hover:underline hover:underline-offset-[1px]"
                              href="">Syarat & Ketentuan</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Footer