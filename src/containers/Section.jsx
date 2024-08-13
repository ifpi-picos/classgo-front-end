export default function Section({children}) {
    return (
        <section className="flex flex-col justify-center items-center w-full h-screen bg-white text-gray-800">
            {children}
        </section>
    )
}
