import {
  Fragment,
  useRef,
  useEffect,
  useState,
  Suspense
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AllPostCategories } from "@/shared/entities/PostCategory";
import {
  FaTiktok,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaWhatsapp
} from "react-icons/fa";
import CategoryList from "@/components/categorylist";

interface NavbarProps {
  topAndOtherCategories: AllPostCategories;
  Categoriesmobile3: AllPostCategories;
  CategoriesmobileList: AllPostCategories;
}

function NavbarContent({
  topAndOtherCategories,
  Categoriesmobile3,
  CategoriesmobileList
}: NavbarProps) {
  const { topCategories, otherCategories } = topAndOtherCategories;
  const { topCategories: mobile3Categories } = Categoriesmobile3;
  const { topCategories: CategoriesmobileList7 } =
    CategoriesmobileList;

  const [searchQuery, setSearchQuery] = useState("");
  const [hideSearchBar, setHideSearchBar] = useState(false);

  // Use App Router hooks
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // UseEffect to check the current route and hide/show the search bar
  useEffect(() => {
    // Check if we are on the `/search` page and if any query parameter exists
    const hasQuery = searchParams?.get("q"); // Get the query parameter `q`

    // Hide the search bar if on `/search` and `q` exists (even if it's empty)
    if (pathname === "/search" && hasQuery !== null) {
      setHideSearchBar(true); // Hide search bar
    } else {
      setHideSearchBar(false); // Show search bar
    }
  }, [pathname, searchParams]);

  const leftmenu = topCategories.map(category => ({
    label: category.title,
    href: `/category/${category.slug ? String(category.slug) : "#"}`
  }));

  const rightmenu = otherCategories.map(category => ({
    label: category.title,
    href: `/category/${category.slug ? String(category.slug) : "#"}`
  }));
  const MAX_CATEGORIES = 14; // Define the maximum number of categories to display in te dropdown of more categories

  const mobilemenu = mobile3Categories.map(category => ({
    label: category.title,
    href: `/category/${category.slug ? String(category.slug) : "#"}`
  }));

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const [isOverlayMenuOpen, setIsOverlayMenuOpen] = useState(false);

  const toggleOverlayMenu = () => {
    setIsOverlayMenuOpen(!isOverlayMenuOpen);
  };

  const handleSearchClick = () => {
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <>
      {/* First Row: Social Icons and Contact */}
      <div
        className="hidden w-full md:block"
        style={{
          backgroundColor: "#FAFAFA",
          paddingLeft: "170px",
          paddingRight: "170px"
        }}>
        <div className="flex items-center justify-between py-5">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our TikTok page">
              {" "}
              {/* Added aria-label */}
              <FaTiktok className="text-xl hover:text-black" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram profile">
              {" "}
              {/* Added aria-label */}
              <FaInstagram className="text-xl hover:text-black" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our YouTube channel">
              {" "}
              {/* Added aria-label */}
              <FaYoutube className="text-xl hover:text-black" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page">
              {" "}
              {/* Added aria-label */}
              <FaFacebook className="text-xl hover:text-black" />
            </a>
          </div>

          {/* Contact Section */}
          <div className="flex items-center space-x-2">
            <FaWhatsapp
              style={{ color: "#1F1F1F" }}
              className="text-xl"
            />
            <Link href="https://www.whatsapp.com">
              <span

              
                style={{ color: "#1F1F1F" }}
                className="cursor-pointer font-medium hover:underline">
                Contact
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Second Row: Logo ,  Categories and Search  */}
      <div
        className="hidden w-full md:block"
        style={{
          backgroundColor: "#FFFFFF",
          paddingLeft: "165px",
          paddingRight: "170px"
          
        }}>
        <div className="flex items-center justify-between py-5">
          {/* NM Logo as Button */}
          <Link href="/" passHref>
            <div className="flex cursor-pointer items-center">
              <Image
                src="/img/SBL_H.svg"
                alt="Logo"
                width={132}
                height={43}
                priority={true}
              />
            </div>
          </Link>

          {/* Categories */}
          <div className="flex items-center space-x-6">
            {/* Adjusted space-x-5 to space-x-6 for a 24px gap */}
            {leftmenu.map((item, index) => (
              <Fragment key={`${item.label}${index}`}>
                <Link
                  href={item.href}
                  className="text-sm text-black hover:text-[#40749C] active:text-[#40749C]"
                  style={{
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 400
                  }}>
                  {item.label}
                </Link>
              </Fragment>
            ))}

           {/* Dropdown for More Categories */}
            <div
              className="relative inline-block text-center"
              ref={dropdownRef}>
              <button
                className="inline-flex w-full justify-center bg-white px-0 py-2 text-sm text-black hover:text-[#40749C] active:text-[#40749C] focus:outline-none"
                style={{
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400
                }}
                onClick={toggleDropdown}>
                More categories
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>



              {isDropdownOpen && (
              <div
                className="absolute left-1 transform -translate-x-1 mt-2 w-[260px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                style={{ zIndex: "1000" }} // Ensures dropdown is always superposed to other content
              >
                <div
                  className="text-left"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {rightmenu.slice(0, MAX_CATEGORIES).map((item, index) => (
                    <Link
                      key={`${item.label}${index}`}
                      href={item.href}
                      className="block px-2 py-2 text-sm text-[#000000] hover:bg-gray-100 hover:text-[#40749C] active:text-[#40749C]"
                      role="menuitem"
                      onClick={() => setIsDropdownOpen(false)}
                      style={{
                        fontSize: "13px",
                        fontStyle: "normal",
                        fontWeight: "400"
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                </div>
              )}
            </div>
            {/* Search Bar */}
            {/* Conditionally render the search bar */}
            {!hideSearchBar && (
              <div className="relative">
                <form
                  onSubmit={e => {
                    e.preventDefault(); // Evita el comportamiento predeterminado
                    // Redirige a la URL correcta con el query string
                    window.location.href = `/search?q=${searchQuery}`;
                  }}>
                  <input
                    type="text"
                    className="w-56 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#7D7D7D]"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      borderRadius: "12px",
                      border: "1px solid var(--Black-300, #7D7D7D)",
                      background: "var(--Whyte, #FFF)"
                    }}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-3 flex items-center"
                    aria-label="Search our Recipes" // Added aria-label for accessibility
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none">
                      <path
                        d="M21 21L16.7 16.7M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile-Specific Section */}
      <div className="relative block w-full bg-white px-4 py-4 md:hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" passHref>
            <Image
              src="/img/SBL_H.svg"
              alt="Logo"
              width={110}
              height={36}
              priority={true}
            />
          </Link>

          {/* Icons (WhatsApp, Search, and Hamburger Menu) */}
          <div className="flex items-center space-x-4">
            {/* WhatsApp Icon */}
            <a
              href="https://wa.me/yourwhatsapplink"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-6 w-6 items-center justify-center bg-white text-[#000000] hover:bg-gray-100"
              aria-label="Contact us on WhatsApp">
              <FaWhatsapp className="h-5 w-5" />
            </a>
            
{/* Search Icon */}
            <button
              aria-label="Search"
              onClick={handleSearchClick}
              className="flex h-6 w-6 items-center justify-center bg-white text-[#000000] hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6 text-[#000000]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0a8 8 0 0116 0z"
                />
              </svg>
            </button>

            {/* Hamburger Menu / X Icon */}
            <button
              onClick={toggleMobileMenu}
              aria-label={
                isMobileMenuOpen ? "Close menu" : "Open menu"
              }
              className="flex h-6 w-6 items-center justify-center bg-white">
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none">
                  <path
                    d="M18 6L6 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none">
                  <path
                    d="M3 12H21"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18H21"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Full-Screen Overlay Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            className={`fixed inset-0 z-50 flex flex-col bg-white`}>
            {/* Top Row: Logo, WhatsApp Icon, Search Icon, and Close Button */}
            <div
              className={`flex items-center justify-between px-4 py-4`}>
              {/* Logo */}
              <Link href="/" passHref>
                <Image
                  src="/img/SBL_H.svg"
                  alt="Logo"
                  width={110}
                  height={36}
                  priority={true}
                />
              </Link>

              {/* Icons: WhatsApp, Search, and Close Button */}
              <div className="flex items-center space-x-4">
                {/* WhatsApp Icon */}
                <a
                  href="https://wa.me/yourwhatsapplink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-6 w-6 items-center justify-center text-[#000000] hover:text-gray-600"
                  aria-label="Contact us on WhatsApp">
                  <FaWhatsapp className="h-5 w-5" />
                </a>

                {/* Search Icon */}
                <button
                  aria-label="Search"
                  onClick={handleSearchClick}
                  className={`flex h-6 w-6 items-center justify-center text-[#000000] hover:text-gray-600`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6 text-[#000000] hover:text-gray-600">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0a8 8 0 0116 0z"
                    />
                  </svg>
                </button>

                {/* Close (X) Button */}
            <button
              onClick={toggleMobileMenu}
              aria-label="Close menu"
              className="text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            </div>
            </div>

            {/* Navigation Links */}
            <div
              className={`flex flex-grow flex-col items-start space-y-6 px-4 pt-8`}>
              {mobilemenu.map((item, index) => (
                <Link
                  key={`${item.label}${index}`}
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className={`text-xl font-semibold text-black hover:text-gray-600`}>
                  {item.label}
                </Link>
              ))}

              {/* More Categories Button */}
              <button
                onClick={toggleOverlayMenu}
                className="flex items-center text-xl font-semibold text-black hover:text-gray-600">
                More categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19" // Increased size by 20%
                  height="20" // Increased size by 20%
                  viewBox="0 0 16 17"
                  fill="none"
                  className="ml-1" // Adds spacing between the text and the icon
                >
                  <path
                    d="M4 6.5L8 10.5L12 6.5"
                    stroke="#1F1F1F"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isOverlayMenuOpen && (
                <>
                  {/* Grey Background Overlay */}
                  <div
                    className="fixed inset-x-0 bottom-0 top-[-40px]"
                    style={{
                      background: "rgba(100, 100, 100, 0.40)",
                      mixBlendMode: "multiply"
                    }}
                    onClick={toggleOverlayMenu} // Close overlay if the background is clicked
                  ></div>

                  {/* White "More Categories" Overlay */}
                  <div
                    className="fixed inset-x-0 z-50 flex flex-col"
                    style={{
                      top: "50px", // Add a top margin to leave space for the logo and icons
                      height: "calc(100% - 50px)", // Adjust height to account for the top margin
                      borderRadius: "12px 12px 0px 0px", // Apply border radius
                      background: "var(--Whyte, #FFF)" // Set background color
                    }}>
                    <div className="relative flex items-center justify-between px-5 py-8">
                      <h2
                        className="mx-auto text-center text-black"
                        style={{
                          fontSize: "20px",
                          fontStyle: "normal",
                          fontWeight: 750,
                          lineHeight: "normal"
                        }}>
                        More categories
                      </h2>

                      <button
                        onClick={toggleOverlayMenu}
                        className="absolute right-5 top-1/2 -translate-y-1/2 transform text-black" // Center vertically
                      >
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 6L6 18"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 6L18 18"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      </button>
                    </div>

                    {/* Categories List Overlay */}
                    <div className="max-h-screen overflow-y-auto">
                    {/* Categories List Overlay */}
                    <ul className="mt-6 space-y-6 px-4">
                      {rightmenu.map((category, index) => (
                        <li key={`${category.label}-${index}`}>
                          <Link
                            href={category.href}
                            onClick={() => {
                              toggleOverlayMenu(); // Close "More Categories" overlay
                              toggleMobileMenu(); // Close mobile menu (if open)
                            }}
                            className="text-black hover:text-gray-600"
                            style={{
                              fontSize: "19px",
                              fontStyle: "normal",
                              fontWeight: 720,
                              lineHeight: "normal",
                            }}
                          >
                            {category.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <style jsx>{`
                  .scrollbar-custom {
                    max-height: 100vh;
                    overflow-y: auto;
                  }
                  .scrollbar-custom::-webkit-scrollbar {
                    width: 8px;
                  }
                  .scrollbar-custom::-webkit-scrollbar-track {
                    background: #f1f1f1;
                  }
                  .scrollbar-custom::-webkit-scrollbar-thumb {
                    background-color: #888;
                    border-radius: 4px;
                    outline: 1px solid slategrey;
                  }
                  .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                    background: #555;
                  }
                  /* Firefox scrollbar styling */
                  .scrollbar-custom {
                    scrollbar-width: thin;
                    scrollbar-color: #888 #f1f1f1;
                  }
                `}</style>
   
                  </div>
                </>
              )}

              {/* CategoryList Component */}
              <div className="mt-4 px-2">
                <CategoryList
                  topAndOtherCategories={CategoriesmobileList}
                  onLinkClick={toggleMobileMenu}
                />
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center py-7">
              {/* Social Icons */}
              <div className="flex items-center space-x-4">
                {/* TikTok Icon */}
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaTiktok
                    className="hover:text-black"
                    style={{ width: "15.821px", height: "17.88px" }}
                  />
                </a>
                {/* Instagram Icon */}
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaInstagram
                    className="hover:text-black"
                    style={{ width: "19.524px", height: "19.513px" }}
                  />
                </a>
                {/* YouTube Icon */}
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaYoutube
                    className="hover:text-black"
                    style={{ width: "20.368px", height: "18.293px" }}
                  />
                </a>
                {/* Facebook Icon */}
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaFacebook
                    className="hover:text-black"
                    style={{ width: "19.673px", height: "18.867px" }}
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Wrap NavbarContent in Suspense here and export it as the default Navbar component
export default function Navbar(props: NavbarProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavbarContent {...props} />
    </Suspense>
  );
}