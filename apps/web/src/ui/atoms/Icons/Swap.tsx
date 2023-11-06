import * as React from "react";

function SvgSwap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 26 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M4.952 22.615L.166 17.26h3.208l-.04-9.9c0-3.13 2.926-4.818 5.678-4.818 2.58 0 5.183 1.49 5.183 4.818v8.556l-1.506-.276-1.4-3.636V7.36a2.147 2.147 0 00-.777-1.731 2.72 2.72 0 00-1.721-.566 2.399 2.399 0 00-2.616 2.3l.04 9.9 3.348.1-4.612 5.25.001.002z"
        fill="#02C076"
      />
      <path
        d="M20.514.537L25.3 5.892h-3.208l.04 9.9c0 3.13-2.926 4.818-5.678 4.818-2.58 0-5.183-1.49-5.183-4.818V8.957l2.9 6.835a2.145 2.145 0 00.777 1.731c.492.38 1.1.58 1.721.566a2.397 2.397 0 002.385-1.36c.14-.295.219-.614.23-.94l-.04-9.9-3.347-.1L20.51.54l.005-.002z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgSwap;