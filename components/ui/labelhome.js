import { cx } from "@/utils/all";

export default function Label(props) {
  const { nomargin, pressed, className, children } = props;

  return (
    <span
      className={cx(
        "inline-block px-2 py-2 text-[12px] font-bold leading-normal rounded-lg",
        "mr-2 mb-2",
        !nomargin && "mt-2",
        "text-[#F5C518] bg-[#1F1F1F]",
        "whitespace-nowrap",
        "border-2", // Always show border
        pressed ? "border-[#F5C518]" : "border-[#1F1F1F]", // Conditional color
        className
      )}
    >
      {children}
    </span>
  );
}
