export default function Header({children}) {
    return (
        <header className="flex justify-center items-center fixed top-0 w-full h-[120px] mb-120px bg-white text-neutral-800 text-xl shadow-md lg:h-[100px] lg:mb-[100px] lg:text-lg sm:text-base">
            {children}
        </header>
    )
}
