import React, { useState, useEffect, useRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function BannerMovie({ post }) {
  const [showModal, setShowModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [modalHeight, setModalHeight] = useState('auto')
  const modalRef = useRef(null)
  const rentBtnRef = useRef(null)

  const taggedUrl = useMemo(() => {
    try {
      const url = new URL(post.amazon_product_movie.url)
      const tag = new URLSearchParams(window.location.search).get('tag')
      if (tag) url.searchParams.set('tag', tag)
      return url.toString()
    } catch {
      return post.amazon_product_movie.url
    }
  }, [post])

  const linkProps = useMemo(() => ({
    href: taggedUrl,
    target: '_blank',
    rel: 'noopener noreferrer'
  }), [taggedUrl])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    let timer
    const onScroll = () => {
      if (window.scrollY > 10) {
        setShowModal(true)
        window.removeEventListener('scroll', onScroll)
        clearTimeout(timer)
      }
    }
    window.addEventListener('scroll', onScroll)
    timer = setTimeout(() => {
      setShowModal(true)
      window.removeEventListener('scroll', onScroll)
    }, 1000)
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  useEffect(() => {
    if (!showModal) return
    const adjustHeight = () => {
      if (rentBtnRef.current && modalRef.current) {
        const btnRect = rentBtnRef.current.getBoundingClientRect()
        const modalRect = modalRef.current.getBoundingClientRect()
        setModalHeight(`${btnRect.bottom - modalRect.top + 10}px`)
      }
    }
    const timer = setTimeout(adjustHeight, 50)
    window.addEventListener('resize', adjustHeight)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', adjustHeight)
    }
  }, [showModal])

  if (!isMobile) return null

  const formatDuration = mins => {
    if (!mins || isNaN(mins)) return 'N/A'
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return `${h}h ${m}m`
  }

  const rating = post.rating / 2
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

  return (
    <>
      {/* Mobile Trigger Button */}
      <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
        <button
          className="w-full bg-[#2F88FF] text-white text-lg font-semibold py-3 rounded-lg shadow-lg"
          onClick={() => setShowModal(true)}
        >
          Get it on Amazon Prime
        </button>
      </div>

      {/* Full-screen Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="w-full bg-[#1F1F1F] rounded-t-lg shadow-lg flex flex-col overflow-hidden"
              style={{ height: modalHeight }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
            >
              {/* Header */}
              <div className="bg-[#2F88FF] px-4 py-3 flex justify-between items-center">
                <span
              style={{ color: "var(--Whyte, #FFF)" }}
              className="text-[16px] font-bold leading-normal"
            >
              Get it on Amazon Prime
            </span>
                <div className="flex items-center space-x-4">
                  <a
                    {...linkProps}
                    onClick={() => setShowModal(false)}
                    className="text-white text-[14px] font-semibold cursor-pointer"
                  >
                    Rent Now
                    </a>
                  {/* “X” Close + Navigate */}
                    <a
                    {...linkProps}
                    onClick={() => setShowModal(false)}
                    className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    aria-label="Close and go to Amazon"
                    >
                    <svg width="24" height="24" fill="none">
                        <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        />
                    </svg>
                    </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 overflow-y-auto flex-1">
                {/* Movie Title */}
                <h2
                    style={{ color: "var(--Whyte, #FFF)" }}
                    className="mb-4 text-[18px] font-bold leading-normal"
                >
                    {post?.title}
                </h2>
                <div className="flex gap-4 mb-4">
                  {/* Left Column: Image */}
                    <div>
                    <img 
                        src={post?.mainImage?.asset?.url} 
                        alt={post?.title} 
                        className="w-[156px] h-[169px] object-cover rounded-[12px]"
                    />
                    </div>
                  <div className="flex flex-col justify-between flex-1">
                    {/* Movie Summary */}
                    <p className="text-[#FFFFFF] text-xs font-normal line-clamp-5 mb-2">
                        {post?.plot_summary}
                        {/* Duration Row */}
                    </p>
                    <p className="text-[var(--Whyte,#FFF)] font-inter text-[14px] font-semibold leading-normal">
                      {formatDuration(post.duration)}
                    </p>

                    <div className="mt-2 flex items-center">
                      {[...Array(fullStars)].map((_, i) => (
                        <StarIcon key={i} filled />
                      ))}
                      {halfStar && <StarIcon half />}
                      {[...Array(emptyStars)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <div className="mt-2">
                <span className="text-[var(--Whyte,#FFF)] font-inter text-[14px] font-semibold leading-normal">
                  IMDb {post?.rating || "N/A"}
                </span>
              </div>
                  </div>
                </div>

                {/* Buttons */}
                {/* ✅ First Button – Visible without scrolling */}
                <div className="mt-6 space-y-3 pb-2">
                <a
                    {...linkProps}
                    id="rent-hd-button"           // required for dynamic height calc
                    ref={rentBtnRef}              // keep the ref here
                    className="w-full h-11 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center"
                >
                    <span className="text-[var(--Whyte,#FFF)] text-[14px] font-semibold leading-normal">
                    Rent HD ${post?.amazon_product_movie?.rent_price || "N/A"}
                    </span>
                </a>

                {/* ✅ Remaining Buttons – Require scrolling */}
                <div className="mt-3">
                    <a
                    {...linkProps}
                    className="w-full h-11 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center mb-3"
                    >
                    <span className="text-[var(--Whyte,#FFF)] text-[14px] font-semibold leading-normal">
                        Buy HD ${post?.amazon_product_movie?.buy_price || "N/A"}
                    </span>
                    </a>

                    <a
                    {...linkProps}
                    className="w-full h-11 px-4 py-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-white flex justify-center items-center"
                    >
                    <span className="text-[var(--Whyte,#FFF)] text-[14px] font-semibold leading-normal">
                        More purchase options
                    </span>
                    </a>
                </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function StarIcon({ filled, half }) {
  const fill = filled ? '#FAAE21' : half ? 'url(#halfGradient)' : '#D1D1D1'
  return (
    <svg width="20" height="19" viewBox="0 0 20 19" className="mr-1">
      {half && (
        <defs>
          <linearGradient id="halfGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="50%" stopColor="#FAAE21" />
            <stop offset="50%" stopColor="#D1D1D1" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M10.1053 .408L12.374 7.391H19.716L13.776 11.706L16.045 18.689L10.105 14.373L4.166 18.689L6.434 11.706L.495 7.391H7.836L10.105 .408Z"
        fill={fill}
      />
    </svg>
  )
}
