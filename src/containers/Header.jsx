export default function Header({children}) {
    return (
        <header className="flex justify-center items-center fixed top-0 z-40 w-4/5 h-32 bg-white text-neutral-800 text-xl shadow-md xs:w-full xs:h-24 xs:text-base">
            {children}
        </header>
    )
}
