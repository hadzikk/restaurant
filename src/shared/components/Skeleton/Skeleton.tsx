import styles from "./Skeleton.module.css"

interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular"
  width?: string | number
  height?: string | number
  className?: string
}

export default function Skeleton({ 
  variant = "text", 
  width, 
  height, 
  className = "" 
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width || (variant === "text" ? "100%" : "40px"),
    height: height || (variant === "text" ? "1rem" : "40px"),
  }

  return (
    <div 
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={style}
    />
  )
}
