"use client";

import Image from 'next/image';
import { useState } from 'react';

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateEmail(email)) {
      setIsSubscribed(true);
    } else {
      alert('Por favor, ingresa un email válido.');
    }
  };

  return (

    <div className="w-full bg-[#F1F6F9] flex justify-center p-4 min-h-[246px]">
      <div className="w-full max-w-7xl p-8 rounded-lg relative flex flex-col items-start md:flex-row justify-between md:ml-[180px]">
        
        {/* Image Section */}
        <div className="hidden md:flex w-1/3 items-end ml-[45px] relative">
          <Image
            src="/img/book.png"
            alt="De Todo Suscripcion"
            width={341}
            height={341}
            className="object-contain absolute bottom-[-198px]"
          />
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-2/3 text-left mt-[8px] ml-[-15px]">
          {isSubscribed ? (
            /* SUCCESS VIEW */
            <div className="flex flex-col justify-center min-h-[136px]">
                <div 
                  className="font-roboto-serif" 
                  style={{color: 'var(--Black-500, #1F1F1F)', fontSize: 30, fontWeight: '700', lineHeight: '36px'}}
                >
                  Thank you!
                </div>
                <div style={{marginTop: '16px', color: 'black', fontSize: 16, fontWeight: '400', lineHeight: '24px'}}>You have successfully joined our subscriber list.</div>
            </div>
          ) : (
            /*  FORM VIEW */
            <form onSubmit={handleSubmit}>
              <h2 className="font-roboto-serif text-black text-xl md:text-3xl font-nunito font-bold mb-4">
                Suscribe now and get the best reviews
              </h2>
              <p className="mb-6">Receive weekly news and the latest reviews</p>
              <div className="flex flex-row gap-2 md:gap-3 w-full">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 border border-[#7d7d7d] rounded-lg focus:outline-none focus:ring-1 w-[85%] md:w-[400px]"
                />
                <button
                  type="submit"
                  className="bg-[#40749C] border border-[#40749C] text-white font-semibold px-0 py-2 rounded-lg w-[15%] min-w-[108px] md:w-[135px]
                            hover:bg-white hover:text-[#40749C] hover:border-[#40749C] transition-colors duration-300 ease-in-out"
                >
                  Suscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
