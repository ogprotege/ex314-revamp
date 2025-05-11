import Image from "next/image"

interface JerusalemCrossProps {
  className?: string
  size?: number
}

export function JerusalemCross({ className = "", size = 32 }: JerusalemCrossProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src="/jerusalem-cross.png"
        alt="Jerusalem Cross"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  )
}
