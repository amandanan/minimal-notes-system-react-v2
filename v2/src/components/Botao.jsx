import { useState } from "react"

export default function Botao({
  onClick,
  children,
  style,
  disabled = false,
  ...props
}) {
  const [hover, setHover] = useState(false)

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "#3b3b3b" : "#2a2a2a",
        color: "white",
        border: "none",
        borderRadius: "4px",
        padding: "5px 10px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "background 0.2s, opacity 0.2s",
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  )
}
