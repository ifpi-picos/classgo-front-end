export default function Main({children}) {
    return (
        <main className="flex flex-col w-4/5 h-screen bg-white text-neutral-800 xs:w-full">
            {children}
        </main>
    )
}
