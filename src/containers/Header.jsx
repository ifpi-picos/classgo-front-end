export default function Header({children}) {
    return (
        <header className="flex justify-center items-center fixed top-0 w-full h-[100px] mb-[100px] bg-white text-neutral-800 text-xl shadow-md lg:text-lg sm:text-base">
            {children}
        </header>
    )
}
