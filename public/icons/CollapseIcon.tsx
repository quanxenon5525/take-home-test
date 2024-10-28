import { SVGProps } from "react";

export function CollapseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m12 8l-6 6l1.41 1.41L12 10.83l4.59 4.58L18 14z"
      ></path>
    </svg>
  );
}
