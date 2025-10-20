import '@/css/Button.css'

type ButtonProps = {
    text: string
    onClick?: () => void
    className?: string
    type?: "button" | "submit" | "reset"
};

export default function Button({ text, onClick, className, type }: ButtonProps) {
    return (
        <button className={`btn ${className}`} onClick={onClick} type={type}>
            {text} &gt;
        </button>
    )
}