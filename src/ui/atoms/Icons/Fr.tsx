import * as React from "react";

function SvgFr(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      {...props}
    >
      <circle cx={256} cy={256} r={256} fill="#f0f0f0" />
      <path
        d="M512 256c0-110.071-69.472-203.906-166.957-240.077v480.155C442.528 459.906 512 366.071 512 256z"
        fill="#d80027"
      />
      <path
        d="M0 256c0 110.071 69.473 203.906 166.957 240.077V15.923C69.473 52.094 0 145.929 0 256z"
        fill="#0052b4"
      />
    </svg>
  );
}

export default SvgFr;