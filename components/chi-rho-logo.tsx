import Image from "next/image"

interface ChiRhoLogoProps {
  className?: string
  size?: number
}

export function ChiRhoLogo({ className = "", size = 32 }: ChiRhoLogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image src="/chi-ro.png" alt="Chi-Rho" width={size} height={size} className="object-contain" priority />
    </div>
  )
}
