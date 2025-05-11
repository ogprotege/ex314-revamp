export function ChiRhoLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 18l-4.2-10.5" />
      <path d="M8 18l4.2-10.5" />
      <circle cx="12" cy="17" r="5" />
    </svg>
  )
}
