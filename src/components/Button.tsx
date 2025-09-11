import { ReactNode } from "react"

type ButtonProps = {
    children: ReactNode
    onClick?: () => void
    variant?: "primary" | "secondary"
}

export default function Button({ children, onClick, variant = "primary" }: ButtonProps) {
    const base = "px-4 py-2 rounded-lg font-semibold"
    const styles =
        variant === "primary"
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-200 text-gray-900 hover:bg-gray-300"

    return (
        <button onClick={onClick} className={`${base} ${styles}`}>
            {children}
        </button>
    )
}
