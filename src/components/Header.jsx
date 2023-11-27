export default function Header({children}) {
    return (
        <header className="w-full h-32 text-xl border shadow-md flex justify-center items-center">
            {children}
        </header>
    )
}
