export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="MedTour Uzbekistan">
      <defs>
        <linearGradient id="mtz-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0a6ebd" />
          <stop offset="1" stopColor="#0f2c57" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#mtz-grad)" />
      <path
        d="M10 25h7l3-7 5 14 4-9 2 2h7"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="38" cy="13" r="5" fill="#1eb53a" />
    </svg>
  );
}
