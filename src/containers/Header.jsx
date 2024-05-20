export default function Header({children}) {
    return (
        <header className="flex justify-center items-center fixed top-0 w-4/5 h-32 text-neutral-800 text-xl shadow-md xs:static xs:w-full">
            {children}
        </header>
    )
}
