export default function Section({children}) {
    return (
        <section className="flex flex-grow flex-col justify-center items-center w-full mt-32 bg-gray-50 text-gray-950 border-gray-300">
            {children}
        </section>
    )
}
