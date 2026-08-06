// A small hand-rolled icon set (inline SVG) so the project has zero icon
// library dependency. Add a new icon by adding a key to ICONS.

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const ICONS = {
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" {...stroke} />
      <path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" {...stroke} />
    </>
  ),
  folder: (
    <path
      d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4l1.6 2H19A1.5 1.5 0 0 1 20.5 8.5v9A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-11Z"
      {...stroke}
    />
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" {...stroke} />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" {...stroke} />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2" {...stroke} />
      <path d="M7 9.5 10.5 12 7 14.5M12.5 15h4.5" {...stroke} />
    </>
  ),
  file: (
    <>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" {...stroke} />
      <path d="M14 3.5V8h4M9 13h6M9 16.5h6" {...stroke} />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" {...stroke} />
      <path d="M4.5 7 12 12.5 19.5 7" {...stroke} />
    </>
  ),
  github: (
    <path
      d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.65-.2.65-.47v-1.8c-2.65.58-3.2-1.13-3.2-1.13-.44-1.1-1.06-1.4-1.06-1.4-.87-.6.07-.58.07-.58.96.07 1.46 1 1.46 1 .85 1.46 2.24 1.04 2.78.8.09-.62.34-1.04.6-1.28-2.12-.24-4.34-1.06-4.34-4.7 0-1.04.37-1.88.98-2.55-.1-.24-.43-1.22.1-2.55 0 0 .8-.26 2.6.97a9.06 9.06 0 0 1 4.74 0c1.8-1.23 2.6-.97 2.6-.97.53 1.33.2 2.31.1 2.55.61.67.98 1.51.98 2.55 0 3.65-2.23 4.46-4.36 4.7.35.3.65.88.65 1.78v2.63c0 .27.15.58.66.47A9.5 9.5 0 0 0 12 2.5Z"
      {...stroke}
    />
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" {...stroke} />
      <path d="M7.5 10.5v6M7.5 7.6v.1M11.5 16.5v-3.6c0-1.3.9-2.2 2-2.2s2 .9 2 2.2v3.6" {...stroke} />
    </>
  ),
  code: <path d="M8.5 8 4 12l4.5 4M15.5 8 20 12l-4.5 4M13.5 5.5l-3 13" {...stroke} />,
  sparkle: (
    <path d="M12 3.5 13.4 9l5.6 1.4-5.6 1.4L12 17.5 10.6 11.8 5 10.4 10.6 9 12 3.5Z" {...stroke} />
  ),
  close: <path d="M6 6l12 12M18 6L6 18" {...stroke} />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" {...stroke} />,
  chevronDown: <path d="m6 9 6 6 6-6" {...stroke} />,
  arrowRight: <path d="M4 12h15M13 6l6 6-6 6" {...stroke} />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" {...stroke} />,
  download: (
    <>
      <path d="M12 4v11M7.5 11 12 15.5 16.5 11" {...stroke} />
      <path d="M4.5 17.5v1.5A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-1.5" {...stroke} />
    </>
  ),
  send: <path d="m4 12 16-8-6 16-3-6-7-2Z" {...stroke} />,
  external: (
    <>
      <path d="M9 6H5.5A1.5 1.5 0 0 0 4 7.5v11A1.5 1.5 0 0 0 5.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15" {...stroke} />
      <path d="M14 4h6v6M20 4l-9 9" {...stroke} />
    </>
  ),
leetcode: (
  <>
    <path
      d="M15.7 4.3L8.3 11.7a1.8 1.8 0 0 0 0 2.6l7.4 7.4"
      fill="none"
      {...stroke}
    />
    <path
      d="M10.2 8.8L5.8 13.2a2.3 2.3 0 0 0 0 3.2l4.4 4.4"
      fill="none"
      {...stroke}
    />
    <path
      d="M13 12h8"
      fill="none"
      {...stroke}
    />
  </>
),
}
export default function Icon({ name, size = 18, className = '', ...rest }) {
  const glyph = ICONS[name] || ICONS.file
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  )
}
