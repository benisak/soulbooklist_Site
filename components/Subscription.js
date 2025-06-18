import Image from 'next/image';

const Subscription = () => {
  return (
    <div className="w-full flex justify-center p-4" style={{ backgroundColor: "#F1F6F9" }}>
      {/* Outer container to control the width */}
      <div className="w-full max-w-7xl p-8 rounded-lg relative flex flex-col items-start md:flex-row justify-between md:ml-[180px]">
        
        {/* Image Section (hidden on mobile) */}
        <div className="hidden md:flex w-1/3 items-end ml-[-5px]">
          <Image
            src="/img/book.png"
            alt="Delicious food"
            width={341}
            height={341}
            className="object-contain mb-[-48px] md:mb-0 lg:mb-[-48px]" // Adjust margin for different screen sizes
          />
        </div>

        {/* Subscription Form */}
        <div className="w-full md:w-2/3 text-left mt-[8px] ml-[-15px]">
        <h2 className="font-roboto-serif text-[20px] sm:text-[30px] font-bold break-words mb-4 text-black">
          Suscribe now and get the best reviews
        </h2>


        <p className="text-[16px] font-inter font-[400] leading-[24px] break-words mb-6 text-black">
          Receive weekly news and the latest reviews
        </p>


          <div className="flex flex-row gap-4 w-full">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 rounded-md focus:outline-none focus:ring w-[85%] md:w-[400px]"
              style={{ border: '1px #7D7D7D solid', backgroundColor: '#FFFFFF', color: '#7D7D7D' }} // Added background color and text color
/>
            <button
              type="submit"
              className="bg-[#40749C] text-white px-4 py-2 rounded-md w-[15%] min-w-[108px] md:w-[120px] text-[16px] font-semibold break-words"
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