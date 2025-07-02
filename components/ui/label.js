// components/ui/label.js
import { cx } from "@/utils/all";

export default function Label(props) {
  const margin = props.nomargin;

  return (
    <span
      className={cx(
        // New design implementation from your snippet
        "inline-flex items-center justify-center p-2 rounded-lg text-xs font-semibold leading-normal",
        
        // Colors from the old component, which match the new design's intent
        "bg-[#E5EFF6] text-[#40749C]",
        
        // Preserving the existing margin logic
        "mr-2 mb-2",
        !margin && "mt-2"
      )}
    >
      {props.children}
    </span>
  );
}
