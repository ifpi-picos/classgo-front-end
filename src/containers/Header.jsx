export default function Header({children}) {
    return (
        <header className="flex justify-center items-center fixed top-0 z-10 w-full h-[75px] bg-white text-neutral-800 text-xl border-2 border-neutral-300 lg:text-lg sm:text-base">
            {children}
        </header>
    )
}
