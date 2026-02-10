export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="48" height="48" rx="24" fill="white" />
      <path
        d="M23.4246 39.7703C15.031 39.7703 8.22998 32.9658 8.22998 24.5756C8.22998 16.1853 15.0344 9.38086 23.4246 9.38086"
        stroke="#111622"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
      <path
        d="M38.6194 24.5756C38.6194 16.1819 31.815 9.38086 23.4248 9.38086"
        stroke="#111622"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
      <path
        d="M23.4248 15.46C28.4589 15.46 32.5429 19.5406 32.5429 24.5782C32.5429 29.6157 28.4623 33.6964 23.4248 33.6964"
        stroke="#DD1717"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <path
        d="M14.3066 24.5762C14.3066 29.6103 18.3872 33.6944 23.4248 33.6944"
        stroke="#DD1717"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
      <rect
        x="10"
        y="24.0996"
        width="1"
        height="4"
        transform="rotate(90 10 24.0996)"
        fill="white"
      />
      <path
        d="M2 24.5762H18.8658"
        stroke="#111622"
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
      <rect x="22.8999" y="32" width="1" height="3" fill="white" />
      <rect
        x="34"
        y="24.0996"
        width="1"
        height="3"
        transform="rotate(90 34 24.0996)"
        fill="white"
      />
      <rect x="22.8999" y="5" width="1" height="6" fill="white" />
      <path
        d="M28.1343 24.5762H45.0001"
        stroke="#111622"
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
      <path
        d="M23.4248 19.8659V3"
        stroke="#111622"
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
      <path
        d="M23.4248 45.9997V29.1338"
        stroke="#111622"
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
