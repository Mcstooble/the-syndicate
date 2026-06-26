import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
};

/** Consistent section rhythm: vertical padding, gutter, centered max width. */
export default function Section({ id, children, className = "", divider = true }: Props) {
  return (
    <section
      id={id}
      className={`px-6 py-24 md:px-12 md:py-32 lg:px-16 ${
        divider ? "border-t border-line" : ""
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
