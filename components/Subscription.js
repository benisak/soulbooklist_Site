// Movies Prject
import Image from 'next/image';

const Subscription = () => {
  return (
    <div className="w-full flex justify-center p-4" style={{ backgroundColor: "#1F1F1F" }}>
      {/* Outer container to control the width */}
      <div className="w-full max-w-7xl p-8 rounded-lg relative flex flex-col items-start md:flex-row justify-between md:ml-[180px]">
        
        {/* Image Section (hidden on mobile) */}
        <div className="hidden md:flex w-1/3 items-end ml-[-5px]">
          <Image
            src="/img/PopCorn_plate.png"
            alt="Delicious food"
            width={341}
            height={341}
            className="object-contain mb-[-48px] md:mb-0 lg:mb-[-48px]" // Adjust margin for different screen sizes
          />
        </div>

        {/* Subscription Form */}
        <div className="w-full md:w-2/3 text-left mt-[8px] ml-[-15px]">
        <h2 className="text-[20px] sm:text-[30px] font-bold break-words mb-4 text-white">
          Be part of the club
        </h2>


        <p className="text-[16px] font-inter font-[400] leading-[24px] break-words mb-6 text-white">
          Subscribe to receive weekly news and look at reviews of the latest releases
        </p>


          <div className="flex flex-row gap-4 w-full">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-md focus:outline-none focus:ring w-[85%] md:w-[400px]"
              style={{ border: '1px #F6F6F6 solid', backgroundColor: '#1F1F1F', color: '#FFFFFF' }} // Added background color and text color
/>
            <button
              type="submit"
              className="bg-[#F5C518] text-[#1F1F1F] px-4 py-2 rounded-md w-[15%] min-w-[108px] md:w-[120px] text-[16px] font-semibold break-words"
            >
              Suscribe
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;