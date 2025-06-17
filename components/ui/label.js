// components/ui/label.js
import { cx } from "@/utils/all";

export default function Label(props) {
  const margin = props.nomargin;

  return (
    <span
      className={cx(
        "inline-block px-2 py-2 text-[12px] font-bold leading-normal rounded-lg", // Base styles
        // Add margin-right and margin-bottom for spacing
        "mr-2 mb-2", // <--- ADD THIS LINE (mr-2 = margin-right: 0.5rem; mb-2 = margin-bottom: 0.5rem;)
        !margin && "mt-2", // Your existing conditional margin-top
        "text-[#F5C518] bg-[#1F1F1F]" // Styling
      )}
    >
      {props.children}
    </span>
  );
}
