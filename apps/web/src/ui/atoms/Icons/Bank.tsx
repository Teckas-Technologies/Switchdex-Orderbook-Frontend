import * as React from "react";

function SvgBank(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.6em"
      height="0.6em"
      viewBox="0 0 18 18"
      {...props}>
      <path
        d="M3.00001 7.9499H5.10036V8.55025V13.0503V13.6503H3.00001V13.0499V8.5499V7.9499ZM15 13.0499V13.6503H12.8997V13.0503V8.55025V7.95025H15V8.5499V13.0499ZM7.95 7.95025H10.05V8.5499V13.0499V13.6499H7.95V13.0503V8.55025V7.95025ZM15.7492 16.0499C15.7495 16.0499 15.7497 16.0499 15.75 16.0499C16.1476 16.0506 16.5288 16.2088 16.8099 16.49C17.0193 16.6993 17.1605 16.9641 17.2192 17.2499H0.780757C0.83949 16.9641 0.980695 16.6993 1.19006 16.49C1.47124 16.2088 1.85239 16.0506 2.25001 16.0499C2.25028 16.0499 2.25055 16.0499 2.25082 16.0499H15.7492ZM7.75409 1.07058L7.75561 1.06974C8.13683 0.859986 8.56489 0.75 9 0.75C9.43512 0.75 9.86317 0.859986 10.2444 1.06974L10.2459 1.07056L17.0423 4.78973C17.0423 4.78973 17.0423 4.78974 17.0423 4.78975C17.2025 4.87746 17.2855 5.05186 17.2337 5.25443L17.2337 5.25446C17.1846 5.44625 17.0389 5.5499 16.8704 5.5499H1.12711H1.12661C0.960576 5.55001 0.814501 5.44722 0.765279 5.25481C0.713427 5.0512 0.796402 4.87782 0.956628 4.79011C0.956645 4.7901 0.956663 4.79009 0.95668 4.79008L7.75409 1.07058ZM6.9 3.15025C6.9 3.56559 7.02317 3.97161 7.25392 4.31695C7.48467 4.66229 7.81264 4.93146 8.19637 5.0904C8.58009 5.24934 9.00233 5.29093 9.40969 5.2099C9.81705 5.12887 10.1912 4.92887 10.4849 4.63518C10.7786 4.34148 10.9786 3.9673 11.0597 3.55994C11.1407 3.15258 11.0991 2.73034 10.9401 2.34662C10.7812 1.96289 10.512 1.63492 10.1667 1.40417C9.82136 1.17341 9.41535 1.05025 9 1.05025C8.44305 1.05025 7.90891 1.2715 7.51508 1.66533C7.12125 2.05915 6.9 2.5933 6.9 3.15025Z"
        fill="none"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default SvgBank;