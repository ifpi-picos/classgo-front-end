export default function Header({children}) {
    return (
        <header className="flex justify-center items-center w-full h-32 text-xl shadow-md">
            {children}
        </header>
    )
}
