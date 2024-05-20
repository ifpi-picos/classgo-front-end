export default function Header({children}) {
    return (
        <header className="flex justify-center items-center fixed top-0 w-4/5 h-32 bg-white text-neutral-800 text-xl shadow-md sm:w-full sm:h-24 sm:text-base">
            {children}
        </header>
    )
}
