export function StreetScene() {
  return (
    <svg className="scene" viewBox="0 0 640 480" role="img" aria-label="A scooter plugged into a socket outside a ground-floor home">
      <rect width="640" height="480" rx="28" fill="#0f6e62" />
      <circle cx="560" cy="70" r="110" fill="#148376" />
      <rect x="36" y="286" width="360" height="150" rx="16" fill="#0b564d" />
      <path d="M52 304h328" stroke="#167a6d" strokeWidth="8" />
      <rect x="56" y="132" width="150" height="164" rx="8" fill="#f4efe4" />
      <rect x="56" y="132" width="150" height="26" fill="#e7d7b8" />
      <rect x="74" y="176" width="46" height="58" rx="4" fill="#d7efe8" />
      <rect x="136" y="176" width="50" height="120" rx="4" fill="#123f3a" />
      <rect x="178" y="228" width="8" height="22" rx="2" fill="#efb423" />
      <path d="M168 268c36 28 70 6 104-8" fill="none" stroke="#efb423" strokeWidth="6" strokeLinecap="round" />
      <circle cx="168" cy="268" r="7" fill="#f7f3ea" stroke="#efb423" strokeWidth="3" />
      <g transform="translate(168 300)">
        <circle cx="26" cy="62" r="24" fill="none" stroke="#f7f3ea" strokeWidth="8" />
        <circle cx="104" cy="62" r="24" fill="none" stroke="#f7f3ea" strokeWidth="8" />
        <path d="M38 62h42l16-32h26" fill="none" stroke="#f7f3ea" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M74 30h30" stroke="#efb423" strokeWidth="6" strokeLinecap="round" />
        <rect x="84" y="18" width="14" height="9" rx="2" fill="#f7f3ea" />
      </g>
      <text x="48" y="64" fill="#f7f3ea" fontFamily="Georgia, serif" fontSize="26">
        A short walk home.
      </text>
    </svg>
  );
}
