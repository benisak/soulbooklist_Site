// Movies Prject
import { cx } from "@/utils/all";

export default function Container({ children, large, alt, className }) {
  return (
    <div
      className={cx(
        "container px-4 mx-auto xl:px-5",
        large ? " max-w-screen-xl" : " max-w-screen-lg",
        !alt && "py-5 lg:py-8",
        className // Allow passing additional classes
      )}
    >
      {children}
    </div>
  );
}
