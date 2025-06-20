"use client";

export default function SubscriptionDesktop() {
  return (
    <div className="hidden w-full flex-col gap-6 rounded-lg bg-[#F1F6F9] p-6 lg:flex">
      {/* Heading Section */}
      <div className="flex flex-col gap-4">
        <h3 className="font-roboto-serif text-xl font-bold text-black">
          Suscribe now and get the best reviews
        </h3>
        <p className="text-base font-normal leading-6 text-black">
          Receive weekly news and the latest reviews
        </p>
      </div>

      {/* Input and Button Section */}
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Email"
          className="bg-[#FFFFFF] h-[51px] w-[226px] rounded-xl border border-[#7D7D7D] px-4 text-base text-[#7D7D7D] focus:outline-none"
        />
        <button
          style={{ backgroundColor: "#FFFFFF" }}
          className="border border-[#40749C] h-[51px] w-[101px] break-words rounded-lg text-[16px] font-semibold text-[#40749C] hover:opacity-90"
        >
          Suscribe
        </button>
      </div>
    </div>
  );
}
