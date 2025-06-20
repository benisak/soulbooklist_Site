"use client";
import Link from "next/link";

export default function BookCard() {
  return (
    
    <div className="md:mt-6 w-full flex flex-col items-center gap-6">
      <div className="w-full text-left text-[#1F1F1F] text-2xl font-bold font-roboto-serif">
        Recommended book
      </div>

      {/* Book Image */}
      <img
        src="/img/bookpost.png"
        alt="Everyday Awakening Book Cover"
        className="w-60 h-96 rounded-lg hidden lg:block"
      />
      <img
        src="/img/bookpost.png"
        alt="Everyday Awakening Book Cover"
        className="w-44 h-72 rounded-lg lg:hidden"
      />

      {/* Book Details */}
      <div className="w-full flex flex-col items-start gap-2">
        <h3 className="text-xl font-bold text-black">Everyday awakening</h3>
        <p className="text-sm font-medium text-black">
          Author: James Grippando
        </p>
        <p className="text-sm font-medium text-black">September 05, 2024</p>

        <div className="flex items-center gap-2">
        <span className="text-base font-bold text-black">4.5</span>
        <div className="flex items-center gap-[2.53px]">
          {/* 4 full stars */}
          {[...Array(4)].map((_, i) => (
            <svg
              key={`star-${i}`}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0818 0.894531L12.3506 7.8771H19.6925L13.7528 12.1926L16.0215 19.1751L10.0818 14.8597L4.1421 19.1751L6.41087 12.1926L0.471149 7.8771H7.81305L10.0818 0.894531Z"
                fill="#FAAE21"
              />
            </svg>
          ))}

          {/* Half star (you can use full star for simplicity or design a half-star separately) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="#FAAE21" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              d="M10.0818 0.894531L12.3506 7.8771H19.6925L13.7528 12.1926L16.0215 19.1751L10.0818 14.8597L4.1421 19.1751L6.41087 12.1926L0.471149 7.8771H7.81305L10.0818 0.894531Z"
              fill="url(#half-star)"
            />
          </svg>
        </div>
      </div>

      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col items-start gap-4">
        {/* Buy Button */}
        <Link
          href="https://www.amazon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <div className="w-full p-4 bg-[#2C6E91] text-white text-base font-semibold rounded-lg text-center hover:opacity-90 transition">
            Buy on Amazon
          </div>
        </Link>

        {/* Sample Buttons */}
        <div className="w-full flex flex-row flex-wrap gap-4">
          <Link
            href="https://example.com/read-sample"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[47%]"
          >
            <div className="w-full p-4 text-[#2C6E91] text-base font-semibold rounded-lg border border-[#2C6E91] text-center hover:bg-[#2C6E91]/10 transition">
              Read sample
            </div>
          </Link>

          <Link
            href="https://example.com/audible-sample"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[47%]"
          >
            <div className="w-full p-4 text-[#2C6E91] text-base font-semibold rounded-lg border border-[#2C6E91] text-center hover:bg-[#2C6E91]/10 transition">
              Audible sample
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
