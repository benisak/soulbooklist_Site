import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="w-full flex flex-col md:flex-row items-center md:bg-[#40749C]">
      
      {/* Image half */}      
      <div className="w-full md:w-1/2 
                      h-[210px]        /* mobile only */
                      md:h-[450px]     /* desktop */
                      lg:h-[550px] 
                      2xl:h-[480px] 
                      3xl:h-[600px] 
                      relative">
        <Image
          src="/img/HS_SB1.png"
          alt="De todo Market"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Text half */}
      <div className="w-full md:w-1/2
                      h-[176px]        /* mobile only */
                      md:h-[450px]     /* desktop - same as image */
                      lg:h-[550px] 
                      2xl:h-[480px] 
                      3xl:h-[600px] 
                      md:bg-[#40749C] 
                      bg-[#FFFFFF]
                      py-6 px-4 md:px-10 
                      flex flex-col justify-center">
        
        {/* === HEADING === */}
        <div className="md:mt-0 mt-6 self-stretch mb-4
                        text-[#40749C] font-roboto-serif text-[24px] font-extrabold leading-normal
                        md:text-white md:text-[40px] md:font-semibold">
          Spiritual reads. <br/>Thoughtfully chosen
        </div>

        <div className="self-stretch">
          <span className="text-[#40749C] text-lg font-normal leading-normal
                           md:text-white md:text-xl">
            Discover meaningful reads that inspire reflection,
            <br className="hidden md:block" />
            connection, and a deeper sense of self.
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
