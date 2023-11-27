export default function Aside({children}) {
    return (
        <aside className="w-1/5 h-screen bg-blue-500 text-gray-50 border-r-2 shadow-md flex flex-col items-center">
            {children}
        </aside>
    )
}
