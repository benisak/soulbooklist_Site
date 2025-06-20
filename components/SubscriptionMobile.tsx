"use client";

export default function SubscriptionMobile() {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-6 bg-[#F1F6F9] px-4 py-6 lg:hidden">
      <div className="flex w-full flex-col items-start justify-center gap-4">
        <h3 className="font-roboto-serif break-words text-[20px] font-bold text-black">
          Suscribe now and get the best reviews
        </h3>
        <p className="break-words text-[16px] font-normal leading-[24px] text-black">
          Receive weekly news and the latest reviews
        </p>
      </div>
      <div className="flex w-full flex-row items-center gap-2">
        <input
          type="email"
          placeholder="Email"
          className="h-[51px] flex-[219] rounded-lg border border-[#7D7D7D] bg-[#FFFFFF] px-4 text-base text-[#7D7D7D] focus:outline-none"
        />
        <button
          style={{ backgroundColor: "#40749C" }}
          className="h-[51px] flex-[101] rounded-md text-[16px] font-semibold text-white hover:opacity-90"
        >
          Suscribe
        </button>
      </div>
    </div>
  );
}
