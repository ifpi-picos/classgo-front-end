export default function Header({children}) {
    return (
        <header className="flex justify-center items-center fixed top-0 w-4/5 h-32 bg-gray-50 text-gray-950 text-xl border-gray-300 shadow-md">
            {children}
        </header>
    )
}
