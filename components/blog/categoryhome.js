"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";
import Label from "@/components/ui/labelhome";

function getAllCombos(arr) {
  const results = [];
  const n = arr.length;
  for (let i = 1; i < 1 << n; i++) {
    const combo = [];
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) combo.push(j);
    }
    results.push(combo);
  }
  return results;
}

export default function CategoryLabel({
  categories,
  nomargin = false
}) {
  const containerRef = useRef(null);
  const measureRef = useRef([]);
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const popupRef = useRef(null);
  const btnRef = useRef(null);

  // ✅ Mantenemos los hooks arriba, siempre
  useLayoutEffect(() => {
    if (!containerRef.current || !categories?.length) return;

    let tries = 0;
    function measureAndSet() {
      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth < 50 && tries < 10) {
        tries++;
        setTimeout(measureAndSet, 50);
        return;
      }

      const moreButtonWidth = 100;
      const widths = categories.map((_, i) =>
        measureRef.current[i]
          ? measureRef.current[i].offsetWidth + 8
          : 0
      );
      const combos = getAllCombos(categories);
      let best = [];
      let bestWidth = 0;
      combos.forEach(combo => {
        const totalWidth = combo.reduce(
          (sum, idx) => sum + widths[idx],
          0
        );
        const needsMore = combo.length < categories.length;
        const totalWithMore =
          totalWidth + (needsMore ? moreButtonWidth : 0);
        if (
          totalWithMore <= containerWidth &&
          (combo.length > best.length ||
            (combo.length === best.length && totalWidth > bestWidth))
        ) {
          best = combo;
          bestWidth = totalWidth;
        }
      });
      setVisibleIndexes(best);
    }

    measureAndSet();
  }, [categories]);

  React.useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !categories?.length) return;
      setVisibleIndexes([]);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [categories]);

  // ✅ Validación después de los Hooks
  if (!Array.isArray(categories) || categories.length === 0)
    return null;

  const handleMoreClick = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowMore(!showMore);
    if (!showMore) {
      setTimeout(() => {
        const closePopup = event => {
          if (
            popupRef.current &&
            !popupRef.current.contains(event.target) &&
            btnRef.current &&
            !btnRef.current.contains(event.target)
          ) {
            setShowMore(false);
            document.removeEventListener("mousedown", closePopup);
          }
        };
        document.addEventListener("mousedown", closePopup);
      }, 0);
    }
  };

  const visible = visibleIndexes.map(i => categories[i]);
  const hidden = categories.filter(
    (_, i) => !visibleIndexes.includes(i)
  );

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center gap-2 ${nomargin ? "" : "mt-4"} w-full`}
      style={{ flexWrap: "nowrap" }}>
      {/* Medición offscreen */}
      <div
        className="pointer-events-none fixed left-0 top-0 flex h-0 w-auto gap-2 opacity-0"
        style={{ zIndex: -1 }}>
        {categories.map((category, i) => (
          <span
            key={category._id || category.slug?.current || i}
            ref={el => (measureRef.current[i] = el)}
            className="inline-block">
            <Label nomargin={nomargin}>{category.title}</Label>
          </span>
        ))}
      </div>

      {/* Categorías visibles */}
      {visible.map((category, i) => {
        if (!category?.slug?.current) return null;
        return (
          <Link
            key={category._id || category.slug.current || i}
            href={`/category/${category.slug.current}`}>
            <Label nomargin={nomargin}>{category.title}</Label>
          </Link>
        );
      })}

      {/* Botón "más" */}
      {hidden.length > 0 && (
        <button
          ref={btnRef}
          onClick={handleMoreClick}
          className="bg-transparent p-0 focus:outline-none"
          type="button">
          <Label nomargin={nomargin} pressed={showMore}>
            {hidden.length} more
          </Label>
        </button>
      )}

      {/* Popup con categorías ocultas */}
      {showMore && hidden.length > 0 && (
        <div
          ref={popupRef}
          className="absolute bottom-full right-0 z-50 mb-2 flex min-w-[140px] flex-col gap-2 rounded-lg bg-[#232323] py-2 shadow-lg">
          {hidden.map((category, i) => (
            <Link
              key={category._id || category.slug?.current || i}
              href={`/category/${category.slug.current}`}
              className="self-stretch">
              <div
                className="
                  inline-flex
                  w-full
                  cursor-pointer
                  items-center
                  justify-start
                  gap-2.5
                  rounded-lg
                  bg-[#232323]
                  p-2
                  transition-colors
                  duration-100
                  hover:bg-[#353535]
                ">
                <span className="text-xs font-medium text-[#F5C518]">
                  {category.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
