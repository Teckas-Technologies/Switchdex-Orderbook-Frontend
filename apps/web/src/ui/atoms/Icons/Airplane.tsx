import * as React from "react";

function SvgAirplane(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 15 16"
      {...props}>
      <path
        stroke="none"
        opacity="0.5"
        d="M9.63819 15.95H3.13819C2.56371 15.9492 2.01316 15.7207 1.60694 15.3145C1.20072 14.9082 0.971988 14.3574 0.971194 13.783V5.83606C0.970261 5.27175 1.19073 4.72958 1.58521 4.32605C1.9765 3.92145 2.51061 3.68599 3.07325 3.67004V5.11694C2.89392 5.13381 2.72732 5.21686 2.60572 5.34973C2.48411 5.48261 2.41623 5.65594 2.41529 5.83606V13.783C2.41555 13.9746 2.49167 14.1584 2.6272 14.2939C2.76273 14.4295 2.94652 14.5057 3.13819 14.506H9.63819C9.80875 14.5067 9.97407 14.4467 10.1045 14.3368C10.2349 14.2269 10.3221 14.0742 10.3503 13.906H11.8022C11.7708 14.4586 11.5291 14.9783 11.1267 15.3584C10.7243 15.7385 10.1917 15.9501 9.63819 15.95Z"
      />
      <path
        stroke="none"
        d="M12.8052 12.783H6.30518C5.73052 12.7824 5.17963 12.554 4.77319 12.1477C4.36676 11.7415 4.138 11.1906 4.13721 10.616V4.11597V2.67102C4.138 2.09637 4.36676 1.54541 4.77319 1.13916C5.17963 0.732912 5.73052 0.504557 6.30518 0.504028H10.5684C10.8593 0.504555 11.147 0.563418 11.4148 0.677124C11.6826 0.79083 11.9248 0.957059 12.1272 1.16602L14.3652 3.48303C14.7563 3.88707 14.9746 4.42767 14.9734 4.98999V10.62C14.9715 11.194 14.7423 11.7438 14.3359 12.1492C13.9296 12.5546 13.3791 12.7824 12.8052 12.783ZM5.58032 6.18298V10.65C5.58032 10.8357 5.65412 11.0136 5.7854 11.1449C5.91668 11.2762 6.09462 11.35 6.28027 11.35H11.8804C11.9264 11.3501 11.9722 11.3458 12.0173 11.337H12.8052C12.9968 11.337 13.1806 11.261 13.3162 11.1256C13.4517 10.9902 13.5281 10.8066 13.5283 10.615V4.98499C13.5289 4.7987 13.4573 4.61945 13.3284 4.48499L11.0894 2.16699C11.0218 2.09771 10.9409 2.04253 10.8518 2.00476C10.7627 1.96699 10.6671 1.9474 10.5703 1.94702H6.30737C6.11579 1.94702 5.93195 2.02295 5.79639 2.15833C5.66083 2.2937 5.58449 2.47737 5.58423 2.66895V5.01697C5.58423 5.02897 5.58423 5.04098 5.58423 5.05298L5.58032 6.18298Z"
      />
    </svg>
  );
}

export default SvgAirplane;