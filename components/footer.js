// Movies Prject
import React from "react";
import Container from "@/components/container";
import Image from "next/image";
import { FaTiktok, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { getCategorizedPostCategoriesLabels } from "@/lib/sanity/client";

// Map social platform names to icons
const SOCIAL_ICONS = {
  tiktok: <FaTiktok />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  facebook: <FaFacebook />,
};

// Hardcoded social links
const socialLinks = [
  { url: "https://www.tiktok.com/@yourprofile", platform: "tiktok", label: "Visit our TikTok profile" },
  { url: "https://www.instagram.com/yourprofile", platform: "instagram", label: "Follow us on Instagram" },
  { url: "https://www.youtube.com/yourchannel", platform: "youtube", label: "Watch our YouTube channel" },
  { url: "https://www.facebook.com/yourpage", platform: "facebook", label: "Like us on Facebook" },
];



export default async function Footer() {
  let topCategories = [];
  try {
    const categories = await getCategorizedPostCategoriesLabels(4);
    topCategories = categories?.topCategories.slice(0, 4) || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <div
      className="w-full dark:border-gray-800"
      style={{
        backgroundColor: "#1F1F1F",
        minHeight: "263px", // Ensures the minimum height
      }}
    >
      <Container
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center h-full px-2 sm:px-12"
      >
        {/* Wrapper for Mobile and Desktop Layout */}
        <div className="flex flex-col lg:flex-row w-full">
          
          {/* Left Side: Logo SVG, Text and rights */}
          <div className="flex flex-col items-start text-white space-y-6 sm:w-full lg:w-auto lg:-ml-[160px] lg:mt-[16px]">
            
            {/* Grouping SVG and Text Horizontally */}
            {/* Desktop version */}
            <div className="hidden lg:flex items-center space-x-1 mt-0">
              {/* SVG Logo  for desktop */}
              <Image
                src="/img/soul_BL.svg"
                alt="Logo"
                width={132}
                height={43}
                priority={true}
              />
            </div>

            {/* Mobile version */}
            <div className="flex lg:hidden items-center space-x-1 mt-0">
              {/* SVG Logo for mobile */}
              <Image
                src="/img/soul_BL.svg"
                alt="Logo"
                width={132}
                height={43}
                priority={true}
              />
            </div>


            {/* Copyright for Desktop */}
            <div
              className="hidden sm:block"
              style={{
                color: '#F6F6F6',
                fontSize: '14px',
                fontWeight: '400',
                wordWrap: 'break-word',
              }}
            >
              Soul booklist 2025. All rights reserved
            </div>

          </div>
          
          {/* Links Categories Column */}
          <div className="flex flex-col items-start text-white space-y-3 sm:w-full lg:w-auto lg:flex-grow lg:ml-[550px] lg:mt-[25px] mt-6">
            {topCategories.length > 0 ? (
              topCategories.map((category, index) => (
                <a
                key={index}
                href={`/category/${category.slug}`}
                style={{
                  color: '#F6F6F6',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '20px',
                  wordWrap: 'break-word',
                }}
              >
                {category.title}
              </a>
              ))
            ) : (
              <p className="text-[#FFF] text-sm font-normal leading-5">
                No categories available
              </p>
            )}
          </div>
          
          {/* Social Media and Contact Info */}
          <div className="flex flex-col items-start text-white sm:w-full lg:w-auto lg:flex-shrink lg:mt-[25px] lg:-mr-[120px] mt-7">
            {/* Social Links */}
            <div className="flex space-x-5 mb-6 sm:self-end lg:self-end"> {/* Margin Bottom for 24px gap */}
              {socialLinks.map((link, index) => {
                const icon = SOCIAL_ICONS[link.platform] || ":eslabón:";
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 text-2xl"
                    aria-label={link.label} // Added aria-label for accessibility
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
            
            {/* Number */}
            <div className="text-[#799EB9] text-md font-semibold underline lg:self-end mb-4"> {/* Margin Bottom for 16px gap */}
              1 345 657 876
            </div>
            
            {/* Email */}
            <div className="text-[#799EB9] text-md font-semibold underline lg:self-end">
              <a href="mailto:hola@popcorncritics.com">hola@Soulbooklist.com</a>
            </div>
          </div>
        </div>


        {/* Copyright for Mobile Inside Container */}
        <div className="block sm:hidden mt-6 mb-[16px]">
          <div className="text-[#FFF] text-sm font-normal leading-normal">
          Soul booklist 2025. All rights reserved
          </div>
        </div>

      </Container>

      {/* Ensure full height coverage */}
      <div className="sm:h-19 lg:h-0 bg-[#4A4A4A]"></div>
    </div>
  );
}
